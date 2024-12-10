import {NextResponse} from "next/server";
import {cookies} from "next/headers";

import {dbConnect} from "@/config/dbConfig";
import Users from "@/models/Users";
import {verifyToken} from "@/lib/tokenValidate";

export async function GET() {
  try {
    /* call or caching database connection */
    await dbConnect();

    const tokenCookies = await cookies();
    const getToken = tokenCookies.get("token");
    if (getToken) {
      /* verifying the token */
      const validatedToken = await verifyToken(getToken.value);

      if ('success' in validatedToken && !validatedToken.success) {
        /* if token is expired or invalid */
        return NextResponse.json(
          {success: false, message: validatedToken.message,},
          {status: 401}
        );
      }
    } else {
      /* if the token is not found */
      return NextResponse.json(
        {success: false, message: 'The user token is not found. Please login again.',},
        {status: 401}
      );
    }

    /* find the user by id */
    const user_list = await Users.find();
    return NextResponse.json(
      {success: true, user_list,},
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