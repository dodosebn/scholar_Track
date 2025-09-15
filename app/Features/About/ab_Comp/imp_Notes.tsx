"use client";
import React from "react";
import { motion } from "framer-motion";
import AboutUsImg from "@/public/images/AboutPro.avif";
import Image from "next/image";
import ProperIntro from "./properIntro";

const Imp_Notes = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const waveAnim = {
    initial: { backgroundPositionX: "0%" },
    animate: {
      backgroundPositionX: "100%",
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      className="relative w-full min-h-[40rem] md:h-[25rem] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="w-full h-full"
      >
        <Image
          src={AboutUsImg}
          alt="aboutUs"
          className="object-cover"
          priority
          fill
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 z-10 bg-gradient-to-br from-[#000000a8] via-[#1a1a1acc] to-[#333333a1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="absolute inset-0 z-20 wave-bg pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 C20 20, 40 0, 60 10 C80 20, 100 0, 100 10 L100 20 L0 20 Z' fill='rgba(255,255,255,0.05)'/%3E%3C/svg%3E\")",
          backgroundSize: "100px 20px",
        }}
        variants={waveAnim}
        initial="initial"
        animate="animate"
      />

      <motion.main
        className="absolute inset-0 z-30 flex flex-col justify-center items-center px-4 sm:px-6 text-white overflow-y-auto py-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 md:gap-10 px-4">
          <motion.div variants={item} className="w-full md:w-1/2">
            <ProperIntro
              title="Vision Statement"
              note="To become the leading digital companion for students across Africa and beyond—empowering them with smart, accessible, and innovative academic tools that simplify learning, enhance productivity, and inspire excellence throughout their educational journey."
            />
          </motion.div>

          <motion.div variants={item} className="w-full md:w-1/2">
            <ProperIntro
              title="Mission Statement"
              note="At ScholarHub, our mission is to empower students by providing a seamless academic experience through intelligent tools and personalized resources. We aim to simplify learning, foster consistency, and support academic success by integrating CGPA tracking, task management, exam preparation, and real-time academic insights into one unified platform."
            />
          </motion.div>
        </div>
      </motion.main>
    </motion.div>
  );
};

export default Imp_Notes;
