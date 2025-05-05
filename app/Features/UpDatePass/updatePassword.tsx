'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/app/store/supabaseClient';

const UpdatePasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.includes('type=recovery')) {
      setMessage('Invalid or expired recovery link.');
    }
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Password updated successfully. Redirecting...');
      setTimeout(() => router.push('/Features/SignIn'), 3000);
    }

    setLoading(false);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <div className='bg-white p-8 rounded shadow-md max-w-md w-full'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Set New Password</h2>

        <form onSubmit={handleUpdatePassword} className='space-y-4'>
          <input
            type='password'
            placeholder='New password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />
          <input
            type='password'
            placeholder='Confirm new password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
          />

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700'
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        {message && <p className='text-center mt-4 text-sm text-gray-700'>{message}</p>}
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
