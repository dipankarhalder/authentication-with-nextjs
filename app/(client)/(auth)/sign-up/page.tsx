import Link from "next/link";

import { auth_router } from "@/router";
import { SignupComponent } from "@/components/pages/signup";

export default function SignupPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-5 sm:w-[400px] p-8 bg-white shadow-2xl rounded-[8px]">
      <div className="flex flex-col space-y-2 text-center mb-4">
        <h1 className="text-xl font-semibold tracking-tight mb-0">
          Create an Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your basic details below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <SignupComponent />
      </div>
      <div className="text-center text-sm mt-2">
        <p>
          If you have already account. &nbsp;
          <Link
            href={auth_router.login_page}
            className="font-medium underline hover:text-indigo-700"
          >
            Sign in now
          </Link>
        </p>
      </div>
    </div>
  );
}
