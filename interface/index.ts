import {ReactNode} from "react";

export type IChildren = {
  children: ReactNode;
};

export interface IUserSignin {
  email: string;
  password: string;
}

export type IUserRequest = {
  user_id?: string;
  first_name: string;
  last_name: string;
  user_role: string;
  phone: string;
  email: string;
  password: string;
}

