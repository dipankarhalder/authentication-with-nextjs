import bcrypt from 'bcryptjs';
import {NextResponse} from "next/server";

import {dbConnect} from "@/config/dbConfig";
import Users from "@/models/Users";

import {IUserRequest} from "@/interface";
import {extractInitials} from "@/utils";
import {user_roles} from "@/utils";

/* Super User Registration */
export async function POST(req: Request) {
  try {
    /* call or caching database connection */
    await dbConnect();

    /* get the info from request body */
    const body: IUserRequest = await req.json();
    const {first_name, last_name, user_role, phone, email, password} = body;

    /* validate the user role */
    if (!user_roles.includes(user_role)) {
      return NextResponse.json(
        {success: false, message: `User type is not valid, You can not proceed to create the user.`},
        {status: 400}
      );
    }

    /* validate password strength */
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|;:,.<>?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {success: false, message: 'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.'},
        {status: 400}
      );
    }

    /* validate the existing user using email */
    const user_exist = await Users.findOne({email});
    if (user_exist) {
      return NextResponse.json(
        {success: false, message: `Email ${email} already associated with another user.`},
        {status: 400}
      );
    }

    /* validate the existing user using phone */
    const existing_phone = await Users.findOne({phone});
    if (existing_phone) {
      return NextResponse.json(
        {success: false, message: `Phone no. ${phone} already associated with another user.`},
        {status: 400}
      );
    }

    /* generate the user id before store information */
    const userIdCreate = `AN${extractInitials(user_role)}-${first_name.substring(0, 2).toUpperCase()}-${phone.toString().slice(-4)}`;

    /* hashing password before store information */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    /* save new user information */
    const new_user = new Users({
      first_name,
      last_name,
      user_role,
      phone,
      email,
      user_id: userIdCreate,
      password: hashedPassword
    });
    await new_user.save();

    return NextResponse.json(
      {success: true, user_id: userIdCreate, message: `User successfully created.`},
      {status: 200}
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      {success: false, error: "Failed to fetch the resource."},
      {status: 500}
    );
  }
}