"use client";
import React, { useState } from "react";
import Image from "next/image";
import FunaiLogo from "@/public/images/funai-logo.png";
import GetBtn from "@/utils/getBtn";
import Logo from "@/utils/logo";
import { IoMenu } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import TransitionLink from "@/utils/transitionLink";

const NavBar = () => {
  const navLinks = [
    {name:"Home", id: 1, linkPath: '/'}, 
    {name: "AboutUs", id:2, linkPath: 'About'}, 
    {name:"News", id:3, linkPath:'News'}, 
    {name:"CGPA Calculator", id:4, linkPath:'GPACalc'}];
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
            {navLinks.map((itm) => (
              <li key={itm.id} className="relative group">
                <span className="hover:text-[#000] hover:font-bold cursor-pointer">
                  <TransitionLink href={itm.linkPath}>{itm.name}</TransitionLink >
                </span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="md:flex hidden ">
          <GetBtn />
        </div>

        <div className="md:hidden">
          <IoMenu onClick={handleDropDown} size={24} className="text-gray-700" />
        </div>

        <AnimatePresence>
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-7 rounded-md right-7 bg-gray-50 p-6 flex flex-col gap-6 md:hidden shadow-lg z-50 border-t border-gray-200"
            >
              <ul className="flex flex-col gap-6 justify-center text-center">
                {navLinks.map((itm) => (
                  <li key={itm.id} className="relative group">
                    <span className="hover:text-[#000] hover:font-bold cursor-pointer text-gray-800">
                    <TransitionLink  href={itm.linkPath}> {itm.name}</TransitionLink >
                    </span>
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex justify-center text-center">
                <GetBtn />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default NavBar;