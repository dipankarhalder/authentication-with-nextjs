import { httpAxios } from "@/config/httpConfig";
import { auth_endpoint } from "@/router";
import { IUserRequest } from "@/interface";

/* register / sign-up api end-point */
export async function auth_signup(payload: IUserRequest) {
  try {
    const res = await httpAxios.post(auth_endpoint.api_signup, payload);
    const data = res.data;
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
}