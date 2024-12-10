/* all frontend public routes */
export const auth_router = {
  login_page: "/",
  register_page: "/sign-up",
  forgot_page: "/forgot-password",
}

/* all frontend protected routes */
export const admin_router = {
  dashboard: "/dashboard",
}

/* all backend public apis */
export const auth_endpoint = {
  api_signup: "/api/auth/signup",
  api_signin: "/api/auth/signin",
}