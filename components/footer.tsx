"use client";
import { motion } from "framer-motion";
import Logo from "@/utils/logo";
import React, { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-[#1e1e26] text-white py-8 px-4 lg:px-8"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="flex justify-center lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Logo />
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <ul className="grid grid-cols-2 gap-4">
            {["Home", "About", "News", "CGPA Calculator"].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <span className="hover:text-green-400 cursor-pointer">
                  {item}
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="flex flex-col items-center lg:items-end gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="flex w-full max-w-xs">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Get updates"
              className="px-4 py-2 rounded-l-full w-full text-gray-800 focus:outline-none"
              required
            />
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-full transition-colors"
            >
              Go
            </motion.button>
          </form>
          <motion.div
            className="text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            © ScholarHub 2025. All rights reserved
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
