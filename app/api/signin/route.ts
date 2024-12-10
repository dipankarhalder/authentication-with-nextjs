import bcrypt from "bcryptjs";
import {NextResponse} from "next/server";
import jwt from "jsonwebtoken";

import {dbConnect} from "@/config/dbConfig";
import Users from "@/models/Users";

import {IUserRequest} from "@/interface";
import {expireTimer} from "@/utils";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable");
}

/* Super User login */
export async function POST(req: Request) {
  try {
    /* call or caching database connection */
    await dbConnect();

    /* get the info from request body */
    const body: IUserRequest = await req.json();
    const {email, password} = body;

    /* validate the email exists or not */
    const user = await Users.findOne({email});
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: `Email ${email} is not associated with any account, Please enter correct email.`
        },
        {status: 400}
      );
    }

    /* validating the password */
    const valid_password = await bcrypt.compare(password, user?.password);
    if (!valid_password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Sorry! You have entered wrong password. Please try again.'
        }, {status: 400}
      );
    }

    /* generate jwt token */
    const payload = {
      id: user._id,
      name: `${user.first_name} ${user.last_name}`,
      user_id: user.user_id,
    };
    const token = jwt.sign(payload, JWT_SECRET, expireTimer);

    /* store the success response in a variable */
    const response = NextResponse.json(
      {
        success: true,
        message: `${user.first_name} ${user.last_name} successfully logged in`,
      },
      {status: 200}
    );

    /* generate expire time for cookie */
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);

    response.cookies.set("token", token, {
      httpOnly: true,
      expires
    })

    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch the resource."
      },
      {status: 500}
    );
  }
}