"use client";
import { DashDownElem, DashElm } from "./dashBoardEasyAdd";
import Logo from "@/utils/logo";
import TransitionLink from "@/utils/transitionLink";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import { supabase } from "@/app/store/supabaseClient";

const DashBoard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/Features/SignIn");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
      setMobileOpen(false);
    }
  };

  const renderNavItem = (item: (typeof DashElm)[0]) => {
    const Icon = item.icon;
    return (
      <li key={item.id} className="group">
        <TransitionLink href={item.path} onClick={() => setMobileOpen(false)}>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-600 hover:bg-opacity-30 transition-colors duration-200">
            <div className="text-xl text-white group-hover:text-green-100">
              <Icon />
            </div>
            <span className="text-white group-hover:text-green-100 font-medium">
              {item.name}
            </span>
          </div>
        </TransitionLink>
      </li>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-green-600 text-white shadow-md hover:bg-green-700 transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 transform
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        w-64 bg-green-700 shadow-xl
        transition-transform duration-300 ease-in-out
        z-40 flex flex-col
      `}
      >
        <div className="flex flex-col h-full p-5">
          {/* Logo */}
          <div className="mb-8 p-3 flex justify-center">
            <div className="text-white">
              <Logo />
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">{DashElm.map(renderNavItem)}</ul>
          </nav>

          {/* Secondary Navigation */}
          <div className="mt-auto pt-4 border-t border-green-600">
            <ul className="space-y-2">
              {DashDownElem.map(renderNavItem)}
              <li>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="flex items-center gap-3 p-3 rounded-lg w-full text-white hover:bg-green-600 hover:bg-opacity-30 transition-colors duration-200"
                >
                  <FiLogOut className="text-xl" />
                  <span className="font-medium">
                    {loading ? "Logging out..." : "Log Out"}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
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
