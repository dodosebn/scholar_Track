"use client";
import React, { useState } from "react";
import Image from "next/image";
import FunaiLogo from "@/public/images/funai-logo.png";
import GetBtn from "@/utils/getBtn";
import Logo from "@/utils/logo";
import { IoMenu } from "react-icons/io5";

const NavBar = () => {
  const navLinks = ["Home", "AboutUs", "News", "CGPA Calculator"];
  const [isMobile, setIsMobile] = useState(false);

  const handleDropDown = () => {
    setIsMobile(!isMobile);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="flex justify-between items-center py-3 px-4 md:px-10">
        <div className="flex items-center">
          <Image
            src={FunaiLogo}
            alt="Funai Logo"
            width={40}
            height={40}
            priority
          />
          <Logo />
        </div>

        <div className="md:flex hidden">
          <ul className="flex gap-6">
            {navLinks.map((itm, ndx) => (
              <li key={ndx} className="hover:text-[#000] hover:font-bold cursor-pointer">
                {itm}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:flex hidden">
          <GetBtn />
        </div>

        <div className="md:hidden">
          <IoMenu onClick={handleDropDown} size={24} className="text-gray-700" />
        </div>

        {isMobile && (
          <div className="absolute top-16 left-0 right-0 bg-gray-50 p-6 flex flex-col gap-6 md:hidden shadow-lg z-50 border-t border-gray-200">
            <ul className="flex flex-col gap-6">
              {navLinks.map((itm, ndx) => (
                <li
                  key={ndx}
                  className="hover:text-[#000] hover:font-bold cursor-pointer text-gray-800"
                >
                  {itm}
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <GetBtn />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;