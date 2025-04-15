'use client'
import React from 'react';
import { motion } from 'framer-motion'; // Added motion import
import Image from 'next/image';
import FunaiIntro from '@/public/images/introfunai.jpg';
import GetBtn from '@/utils/getBtn';

const Intro = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center py-8 md:py-12 gap-8'>
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className='max-w-2xl order-2 md:order-none'
      >
        <motion.h1 
          className='font-bold text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-[3.5rem]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            background: 'linear-gradient(to right, #000, #fff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Practice GST like a pro<br />
          Get school news fast<br />    
          Track your grades & <br />
          Stay locked in!
        </motion.h1>
        
        <motion.div 
          className='mt-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GetBtn />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='relative w-full md:w-[35rem] order-1 md:order-none'
      >
        <Image 
          src={FunaiIntro} 
          alt='FunaiImg' 
          className='object-cover w-full rounded-xl shadow-xl'
          style={{
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
          priority
        />
      </motion.div>
    </div>
  );
};

export default Intro;