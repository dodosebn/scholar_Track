'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/app/store/authState';
import Link from 'next/link';
import { supabase } from '@/app/store/supabaseClient';

const SigningUp = () => {
  const { email, password, handleEmailChange, handlePasswordChange } = useAuthStore();

  const [cPassword, setCPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const verifySignUp = async (formData: FormData) => {
    const email = formData.get('email')?.toString().trim() || '';
    const password = formData.get('password')?.toString().trim() || '';
    const cPassword = formData.get('cPassword')?.toString().trim() || '';

    if (password !== cPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'http://localhost:3000/DashBoard',
        },
      });

      if (error) {
        console.error('Supabase signUp error:', error.message);
        setMessage('Could not authenticate user');
        return;
      }

      setMessage(`Check your email (${email}) to complete sign-up.`);
    } catch (err) {
      console.error('Unexpected signup error:', err);
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await verifySignUp(new FormData(e.currentTarget));
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h1>

        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes('Check your email') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Create a Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            name="cPassword"
            type="password"
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
            } text-white py-2 px-4 rounded-md transition duration-200 mt-4`}
          >
            {loading ? 'Signing you up…' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link href="/Features/SignIn" className="text-green-600 hover:underline font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigningUp;
