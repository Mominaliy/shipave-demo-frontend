'use client'

import React, { useState } from 'react'
import { Plane, Loader2, ArrowLeft } from 'lucide-react'
import { z } from 'zod'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

type ForgotPasswordFormInputs = z.infer<typeof ForgotPasswordSchema>

const ForgotPasswordScreen: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  const methods = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '', 
    },
  })

  const { handleSubmit, formState: { errors } } = methods

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
    setLoading(true)
    console.log("Form Data:", data)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    setResetSent(true)
  }

  return (
    <div className='flex flex-row w-screen min-h-screen text-white'>
      <div className='hidden lg:flex flex-col p-10 w-1/2 justify-between bg-[#008080] bg-opacity-90 relative overflow-hidden'>
        <div className='flex items-center gap-3 z-10'>
          <Plane className='text-white' size={32} />
          <p className='font-bold text-3xl'>ShipAve</p>
        </div>
        <div className='z-10 mb-10'>
          <h1 className='text-4xl font-bold mb-4'>Forgot Your Password?</h1>
          <p className='text-xl'>Don't worry! It happens. Enter your email and we'll send you a reset link.</p>
        </div>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute inset-0 bg-repeat' style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}}></div>
        </div>
      </div>
      
      <div className='flex flex-col items-center justify-center lg:w-1/2 w-full bg-white p-8 lg:p-16'>
        <h2 className='text-4xl font-bold mb-8 text-gray-800'>Reset Your Password</h2>
        {!resetSent ? (
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-6'>
              <FormField
                control={methods.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700' htmlFor='email'>Email</FormLabel>
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

              <Button
                type='submit'
                className='w-full bg-[#008080] text-white hover:bg-teal-800 transition-all duration-200 py-5 text-lg font-semibold rounded-lg relative overflow-hidden group'
                disabled={loading}
              >
                <span className='relative z-10'>
                  {loading ? (
                    <>
                      <Loader2 className='animate-spin mr-2 inline-block' size={20} />
                      Sending Reset Link...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </span>
                <span className='absolute inset-0 bg-teal-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></span>
              </Button>
            </form>
          </FormProvider>
        ) : (
          <div className='text-center'>
            <p className='text-green-600 text-xl mb-4'>Password reset link sent! Check your email.</p>
            <p className='text-gray-600'>Didn't receive the email? Check your spam folder or try again.</p>
          </div>
        )}
        
        <Link href="/login" className='mt-8 text-[#008080] hover:underline font-semibold flex items-center'>
          <ArrowLeft className='mr-2' size={20} />
          Back to Login
        </Link>
      </div>
    </div>
  )
}

export default ForgotPasswordScreen