'use client';
import React from 'react';
import Link from 'next/link';
import useAuthStore from '@/app/store/authState';

const SigningIn = () => {
  const { email, password, handleEmailChange, handlePasswordChange } = useAuthStore();

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold text-center mb-6 text-gray-800'>Welcome Back</h1>
        
        <form className='flex flex-col gap-4'>
          <input 
            type="email" 
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            value={email}  
            placeholder='Enter Your Email' 
            onChange={handleEmailChange}
            required
          />
          
          <input 
            type="password" 
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            value={password}  
            placeholder='Enter Password' 
            onChange={handlePasswordChange}
            required
          />

          <button 
            type="submit" 
            className='w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-200 mt-4'
          >
            Sign In
          </button>
        </form>

        <p className='text-center mt-6 text-gray-600'>
          Don't have an Account? {' '}
          <Link href='/SignUp' className='text-green-600 hover:underline font-medium'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SigningIn;