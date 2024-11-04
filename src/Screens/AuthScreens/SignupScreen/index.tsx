'use client'

import React, { useState } from 'react';
import { Plane, Loader2 } from 'lucide-react'; 
import { z } from 'zod';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"), 
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number.",
    }),
    confirmPassword: z.string()
    .min(6, "Confirm Password is required")
}).superRefine(({password, confirmPassword}, ctx)=>{
    if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ['confirmPassword']
        });
      }
});

type SignUpFormInputs = z.infer<typeof SignUpSchema>;

const SignUpScreen: React.FC = () => {

  const router = useRouter()

  const methods = useForm<SignUpFormInputs>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: '',
      email: '', 
      password: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit, formState: { errors } } = methods;
  const [loading, setLoading] = useState(false); 

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    setLoading(true); 
    console.log("Form Data:", data);
    
    await new Promise((resolve) => setTimeout(resolve, 2000)); 
    router.push('/verify')
    setLoading(false); 
  };

  return (
    <div className='flex flex-row w-screen min-h-screen text-white'>
      <div className='hidden lg:flex flex-col p-10 w-1/2 justify-between bg-[#008080] bg-opacity-90 relative overflow-hidden'>
        <div className='flex items-center gap-3 z-10'>
          <Plane className='text-white' size={32} />
          <p className='font-bold text-3xl'>ShipAve</p>
        </div>
        <div className='z-10 mb-10'>
          <h1 className='text-4xl font-bold mb-4'>Create Your Account!</h1>
          <p className='text-xl'>Sign up to access your shipping dashboard and start managing your shipments.</p>
        </div>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute inset-0 bg-repeat' style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        </div>
      </div>
      
      <div className='flex flex-col items-center justify-center lg:w-1/2 w-full bg-white p-8 lg:p-16'>
        <h2 className='text-4xl font-bold mb-8 text-gray-800'>Create an account</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md flex flex-col gap-3 '>
            <FormField
              control={methods.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-700 ' htmlFor='username'>Username</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      id='username'
                      {...field}
                      placeholder='Enter your username'
                      className='bg-white border-2 border-gray-300 text-black py-5 px-4 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all duration-200'
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.username && <p className='text-red-500 text-sm font-semibold mt-1'>{errors.username.message}</p>}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-700 ' htmlFor='email'>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      id='email'
                      {...field}
                      placeholder='Enter your email'
                      className='bg-white border-2 border-gray-300 text-black py-5 px-4 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all duration-200'
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.email && <p className='text-red-500 text-sm font-semibold mt-1'>{errors.email.message}</p>}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-700 ' htmlFor='password'>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      id='password'
                      {...field}
                      placeholder='Enter your password'
                      className='bg-white border-2 border-gray-300 text-black py-5 px-4 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all duration-200'
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.password && <p className='text-red-500 text-sm font-semibold mt-1'>{errors.password.message}</p>}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={methods.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-gray-700 ' htmlFor='confirmPassword'>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      id='confirmPassword'
                      {...field}
                      placeholder='Confirm your password'
                      className='bg-white border-2 border-gray-300 text-black py-5 px-4 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent transition-all duration-200'
                    />
                  </FormControl>
                  <FormMessage>
                    {errors.confirmPassword && <p className='text-red-500 text-sm font-semibold mt-1'>{errors.confirmPassword.message}</p>}
                  </FormMessage>
                </FormItem>
              )}
            />
             <p className="px-8 text-center text-sm text-muted-foreground mt-1">
              By clicking Signup, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-[#008080]"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-[#008080]"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <Button
              type='submit'
              className='w-full mt-4 bg-[#008080] text-white text-lg hover:bg-teal-800 transition-all duration-200 py-5  font-semibold rounded-lg relative overflow-hidden group'
              disabled={loading}
            >
              <span className='relative z-10'>
                {loading ? (
                  <>
                    <Loader2 className='animate-spin mr-2 inline-block' size={20} />
                    Signing Up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </span>
              <span className='absolute inset-0 bg-teal-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></span>
            </Button>
           
          </form>
        </FormProvider>
        
        <p className='mt-8 text-gray-600'>
          Already have an account? <a href='/login' className='text-[#008080] hover:underline font-semibold'>Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpScreen;