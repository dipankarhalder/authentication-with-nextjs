import {NextResponse} from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  try {
    /* Create a response object to clear the token cookie */
    const res = NextResponse.json(
      {
        success: true,
        message: 'You are successfully logged out.',
      },
      {status: 200}
    );

    /* clear the JWT cookie */
    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });

    return res;
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