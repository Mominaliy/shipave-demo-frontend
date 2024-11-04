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
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const OtpSchema = z.object({
  pin: z.string().length(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type OtpFormInputs = z.infer<typeof OtpSchema>;

const OtpScreen: React.FC = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const methods = useForm<OtpFormInputs>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<OtpFormInputs> = (data) => {
    console.log("OTP Data:", data);
    setLoading(true);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="flex flex-row w-screen min-h-screen text-white">
      <div className="hidden lg:flex flex-col p-10 w-1/2 justify-between bg-[#008080] bg-opacity-90 relative overflow-hidden">
        <div className="flex items-center gap-3 z-10">
          <Plane className="text-white" size={32} />
          <p className="font-bold text-3xl">ShipAve</p>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center lg:w-1/2 w-full bg-white p-8">
        <h2 className="text-3xl font-bold mb-4 text-black">Enter OTP</h2>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center w-full max-w-sm space-y-6"
          >
            <FormField
              control={methods.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">
                    One-Time Password
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      {...field}
                      className="flex space-x-2"
                    >
                      <InputOTPGroup className="flex gap-2">
                        {[...Array(6)].map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="w-14 h-14 text-black rounded-md ring-teal-600 border-gray-300"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to you.
                  </FormDescription>
                  <FormMessage>
                    {errors.pin && (
                      <p className="text-red-500 text-sm font-semibold">
                        {errors.pin.message}
                      </p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-[#008080] text-white hover:bg-teal-800 transition-all duration-200 py-5 text-lg font-semibold rounded-lg relative overflow-hidden group"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-1" size={16} />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </form>
        </FormProvider>

        <p className="mt-4 text-gray-400">
          Didn’t receive the OTP?{" "}
          <a href="#" className="text-[#008080] hover:underline">
            Resend
          </a>
        </p>
      </div>
    </div>
  );
};

export default OtpScreen;
