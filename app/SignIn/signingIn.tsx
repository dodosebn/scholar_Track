'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import useAuthStore from '@/app/store/authState';
import { supabase } from '@/app/store/supabaseClient';

const SigningIn = () => {
  const { email, password, handleEmailChange, handlePasswordChange } = useAuthStore();
  const [loading, setLoading] = useState(false); 

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); 
    setLoading(true); 

    if (password.length < 6) {
      alert('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
      console.error('Sign-in error:', error);
    } else {
      console.log('Signed in successfully:', data);

      if (data) {
        window.location.href = "http://localhost:3000/GPACalc";  
      }
    }

    setLoading(false);
  }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center p-4'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold text-center mb-6 text-gray-800'>Welcome Back</h1>
        
        <form className='flex flex-col gap-4' onSubmit={signIn}>
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
            disabled={loading} 
            className={`w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-200 mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <span>Forgotten Password</span>
        </form>

        <p className='text-center mt-6 text-gray-600'>
          Don't have an Account?{' '}
          <Link href='/SignUp' className='text-green-600 hover:underline font-medium'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SigningIn;
