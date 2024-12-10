import {NextRequest, NextResponse} from "next/server";
import {auth_router, admin_router} from "@/router";

export function middleware(req: NextRequest) {
  const paths = req.nextUrl.pathname;
  const isPublicPath =
    paths === auth_router.login_page ||
    paths === auth_router.register_page ||
    paths === auth_router.forgot_page;
  const token = req.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL(admin_router.dashboard, req.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL(auth_router.login_page, req.url));
  }

  if (paths.startsWith('/api')) {
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
