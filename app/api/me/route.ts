import {NextResponse} from "next/server";
import {cookies} from "next/headers";

import {dbConnect} from "@/config/dbConfig";
import Users from "@/models/Users";
import {verifyToken} from "@/lib/tokenValidate";

export async function GET(req: Request) {
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

    /* validate the user id, the ID exist or not */
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        {success: false, message: "Please enter a valid user id",},
        {status: 400}
      );
    }

    /* find the user by id */
    const user = await Users.findById(userId);
    if (!user) {
      return NextResponse.json(
        {success: false, message: "The user does not exist",},
        {status: 404}
      );
    }

    return NextResponse.json(
      {success: true, user,},
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