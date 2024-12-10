"use client";

import {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";

import {IUserSignin} from "@/interface";
import {auth_router, admin_router} from "@/router";
import {SigninSchema} from "@/validate";
import {auth_signin} from "@/services/auth";
import {SpinnerLoading} from "@/components/shared/spinner";

export const SigninComponent = () => {
  const router = useRouter();
  const {toast} = useToast();
  const [waiting, setWaiting] = useState(false);

  /* handle form data */
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /* handle submit */
  const onSubmit = async (data: z.infer<typeof SigninSchema>) => {
    setWaiting(true);
    const payload: IUserSignin = {
      ...data,
    }

    auth_signin(payload)
      .then(res => {
        if (res) {
          if (!res.success) {
            toast({variant: "destructive", title: res.message});
          } else {
            router.push(admin_router.dashboard);
          }
        }
        setWaiting(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="mb-4">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    {...field}
                    className="h-12 px-5"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="mb-2">
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className="h-12 px-5"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end text-sm mb-6">
          <p>
            <Link
              href={auth_router.forgot_page}
              className="font-medium text-xs underline hover:text-indigo-700"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
        {waiting ? (
          <div className="w-full bg-gray-400 h-11 flex items-center justify-center rounded-md">
            <SpinnerLoading/>
            <p className="font-medium text-white text-sm ml-2">Please wait...</p>
          </div>
        ) : (
          <Button className="w-full bg-indigo-600 text-sm h-11 hover:bg-indigo-700" type="submit">
            Login
          </Button>
        )}
      </form>
    </Form>
  );
};
