"use client";
import React, { useRef } from "react";
import Image from "next/image";
import FunaiIntro from "@/public/images/scholarhub_intro.jpg";
import GetBtn from "@/utils/getBtn";
import { useScroll, useTransform, motion } from "framer-motion";

const Intro = () => {
  const ref = useRef(null);

  // Hero scroll-fold effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -25]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center py-8 md:py-12 gap-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 order-2 md:order-none px-3 sm:px-0"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Your All-in-One Academic Success Platform
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            ScholarHub empowers students to work smarter, not harder. <br />
            Our comprehensive suite of tools helps you:
          </p>

          <ul className="space-y-3 text-gray-700">
            <motion.li
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="mr-2 text-[#134c7f]">✓</span>
              Calculate and track your CGPA with precision
            </motion.li>

            <motion.li
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="mr-2 text-[#134c7f]">✓</span>
              Organize tasks with intelligent to-do lists
            </motion.li>

            <motion.li
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <span className="mr-2 text-[#134c7f]">✓</span>
              Practice with curated past questions
            </motion.li>

            <motion.li
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span className="mr-2 text-[#134c7f]">✓</span>
              Stay updated with relevant campus news
            </motion.li>
          </ul>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <GetBtn />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-[45%] order-1 md:order-none"
      >
        <div
          ref={ref}
          className="
            relative 
            w-screen md:w-full 
            -mx-4 sm:mx-0
            md:h-[35rem] h-[25rem] 
            overflow-hidden
          "
        >
          <motion.div
            style={{
              y,
              scale,
              opacity,
              rotateX,
              transform: "perspective(1000px)",
              transformOrigin: "bottom center",
            }}
            className="absolute inset-0 z-0 will-change-transform"
          >
            <Image
              src={FunaiIntro}
              alt="Students using ScholarHub"
              className="object-cover"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Intro;
