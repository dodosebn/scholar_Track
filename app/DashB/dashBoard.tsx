'use client';
import DashElm from './dashBoardEasyAdd';
import Logo from '@/utils/logo';
import TransitionLink from '@/utils/transitionLink';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { supabase } from '../store/supabaseClient'; 
import { toast } from 'react-toastify'; 

const DashBoard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      router.push('/SignIn');
      toast.success('Logged out successfully!'); 
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.'); 
    } finally {
      setLoading(false);
      setMobileOpen(false);
    }
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-pink-600 text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div className={`
        fixed inset-y-0 left-0 transform
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        w-64 bg-pink-500 shadow-lg
        transition-transform duration-300 ease-in-out
        z-40
      `}>
        <div className="flex flex-col h-full p-4">
          <div className="mb-8 p-4">
            <Logo />
          </div>

          <nav className="flex-1 space-y-2">
            {DashElm.map(itm => (
              <TransitionLink
                key={itm.id}
                href={itm.path}
                // className={`
                //   block px-4 py-3 rounded-lg transition-all
                //   ${pathname === itm.path
                //     ? 'bg-white text-pink-600 font-medium shadow-md'
                //     : 'text-white hover:bg-pink-400 hover:shadow-sm'
                //   }
                // `}
                onClick={() => setMobileOpen(false)}
              >
                {itm.name}
              </TransitionLink>
            ))}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="
              mt-auto flex items-center justify-center gap-2
              px-4 py-3 bg-pink-600 text-white
              rounded-lg hover:bg-pink-700 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? (
              'Logging out...'
            ) : (
              <>
                <FiLogOut />
                Log Out
              </>
            )}
          </button>
        </div>
      </div>

     {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default DashBoard;