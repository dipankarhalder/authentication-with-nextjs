"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {useToast} from "@/hooks/use-toast";

import {IUserRequest} from "@/interface";
import {SignupSchema} from "@/validate";
import {auth_router} from "@/router";
import {auth_signup} from "@/services/auth";
import {SpinnerLoading} from "@/components/shared/spinner";

export const SignupComponent = () => {
  const userType = [
    {title: "Super User", value: "SUPER_USER"},
    {title: "Admin", value: "ADMIN_USER"},
    {title: "Staff", value: "STAFF_USER"},
  ];
  const router = useRouter();
  const {toast} = useToast();
  const [waiting, setWaiting] = useState(false);

  /* handle form data */
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      user_role: "ADMIN_USER",
      email: "",
      phone: "",
      password: "",
    },
  });

  /* handle submit */
  const onSubmit = (data: z.infer<typeof SignupSchema>) => {
    setWaiting(true);
    const payload: IUserRequest = {...data}
    console.log(payload);

    auth_signup(payload)
      .then(res => {
        if (res) {
          form.reset();
          if (!res.success) {
            toast({variant: "destructive", title: res.message});
          } else {
            toast({title: res.message});
            router.push(auth_router.login_page);
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
            name="user_role"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center"
                  >
                    {userType.map(user => (
                      <div className="flex items-center mr-4" key={user.value}>
                        <RadioGroupItem value={user.value} id={user.value}/>
                        <label htmlFor={user.value} className="font-medium text-xs ml-1">
                          {user.title}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First name"
                      {...field}
                      className="h-12 px-5"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Last name"
                      {...field}
                      className="h-12 px-5"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="example@example.com"
                    {...field}
                    className="h-12 px-5"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="phone"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Phone no."
                    {...field}
                    className="h-12 px-5"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="mb-4">
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
        {waiting ? (
          <div className="w-full bg-gray-400 h-11 flex items-center justify-center rounded-md">
            <SpinnerLoading/>
            <p className="font-medium text-white text-sm ml-2">Please wait...</p>
          </div>
        ) : (
          <Button className="w-full h-11 text-sm bg-indigo-600 hover:bg-indigo-700" type="submit">
            Register
          </Button>
        )}
      </form>
    </Form>
  );
};
