"use client";

import React, { useState } from "react";
import { Loader2, Plane } from "lucide-react";
import { z } from "zod";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginFormInputs = z.infer<typeof LoginSchema>;

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const methods = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Form Data:", data);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col w-screen min-h-screen text-black relative">
      <div className="absolute inset-0 opacity-0">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23008080' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

      <main className="flex flex-col items-center justify-center flex-grow z-10">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Plane className="text-[#008080]" size={32} />
            <p className="font-bold text-3xl text-[#008080]">ShipAve</p>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-center">
            Login to your account
          </h2>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700" htmlFor="email">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        id="email"
                        {...field}
                        placeholder="Enter your email"
                        className="bg-white border-2 border-gray-300 text-black py-2 px-4 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage>{errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700" htmlFor="password">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        id="password"
                        {...field}
                        placeholder="Enter your password"
                        className="bg-white border-2 border-gray-300 text-black py-2 px-4 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage>{errors.password?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <a
                  href="/forgotpassword"
                  className="text-sm text-[#008080] hover:underline transition-colors duration-200"
                >
                  Forgot Password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full mt-4 bg-[#008080] text-white text-lg hover:bg-teal-800 transition-all duration-200 py-5  font-semibold rounded-lg relative overflow-hidden group"
                disabled={loading}
              >
                <span className="relative z-10">
                  {loading ? (
                    <>
                      <Loader2
                        className="animate-spin mr-2 inline-block"
                        size={20}
                      />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </span>
                <span className="absolute inset-0 bg-teal-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Button>
            </form>
          </FormProvider>

          <div className="mt-4">
            <Button
              type="submit"
              className="w-full mt-0 bg-white text-primaryColor border border-primaryColor text-lg hover:bg-teal-700 hover:text-white transition-all duration-200 py-5  font-semibold rounded-lg relative overflow-hidden group"
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              <span className="relative z-10">
                {loading ? (
                  <>
                    <Loader2
                      className="animate-spin mr-2 inline-block"
                      size={20}
                    />
                    Signing In...
                  </>
                ) : (
                  "Sign in with Google"
                )}
              </span>
            </Button>
          </div>
          <p className="mt-4 text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-[#008080] hover:underline font-semibold"
            >
              Sign Up
            </a>
          </p>
        </div>
      </main>

      <footer className="bg-white py-4 text-center z-10">
        <p className="text-gray-600">
          &copy; 2023 ShipAve. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
