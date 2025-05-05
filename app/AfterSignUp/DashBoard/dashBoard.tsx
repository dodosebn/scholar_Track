'use client';
import { DashDownElem, DashElm } from './dashBoardEasyAdd';
import Logo from '@/utils/logo';
import TransitionLink from '@/utils/transitionLink';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { supabase } from '@/app/store/supabaseClient';

const DashBoard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
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
      {/* Hamburger for mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-green-600 text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 transform
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        w-64 bg-green-500 shadow-lg
        transition-transform duration-300 ease-in-out
        z-40
      `}>
        <div className="flex flex-col h-full p-4 px-6">
          <div className="mb-8 p-4">
            <Logo />
          </div>

          {/* Top Links */}
          <section className="flex-1 space-y-2">
            {DashElm.map((itm) => {
              const Icon = itm.icon;
              return (
                <div key={itm.id}>
                  <TransitionLink href={itm.path} onClick={() => setMobileOpen(false)}>
                    <ul className="flex gap-2">
                      <li className="text-xl"><Icon /></li>
                      <li className="relative bottom-1">{itm.name}</li>
                    </ul>
                  </TransitionLink>
                </div>
              );
            })}
          </section>

          {/* Bottom Links + Logout */}
          <section className="space-y-2">
            {DashDownElem.map((itm) => {
              const Icon = itm.icon;
              return (
                <div key={itm.id}>
                  <TransitionLink href={itm.path} onClick={() => setMobileOpen(false)}>
                    <ul className="flex gap-2">
                      <li className="text-xl"><Icon /></li>
                      <li className="relative bottom-1">{itm.name}</li>
                    </ul>
                  </TransitionLink>
                </div>
              );
            })}
            <button onClick={handleLogout} disabled={loading}>
              <ul className="flex gap-2">
                <li><FiLogOut /></li>
                <li>{loading ? 'Logging out...' : 'Log Out'}</li>
              </ul>
            </button>
          </section>
        </div>
      </div>

      {/* Backdrop */}
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
