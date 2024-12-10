import Link from "next/link";
import {Baby} from 'lucide-react';

import {auth_router} from "@/router";
import {SigninComponent} from "@/components/pages/signin";

export default function SigninPage() {
  return (
    <div
      className="mx-auto flex w-full flex-col justify-center space-y-5 sm:w-[400px] p-8 bg-white shadow-2xl rounded-[8px]">
      <div className="flex flex-col text-center mb-0">
        <div className="flex justify-center items-center mb-12">
          <span className="flex justify-center items-center w-[50px] h-[50px] bg-indigo-600 rounded-full">
            <Baby size={36} className="text-white"/>
          </span>
          <p className="ml-2 font-bold text-3xl text-indigo-600">Authentify</p>
        </div>
        <h1 className="text-xl font-semibold tracking-tight mb-0">
          Welcome Back!
        </h1>
      </div>
      <div className="grid gap-6">
        <SigninComponent/>
        <div className="text-center text-sm mt-2">
          <p>
            Don&apos;t have an account? &nbsp;
            <Link
              href={auth_router.register_page}
              className="font-medium underline hover:text-indigo-700"
            >
              Create now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
