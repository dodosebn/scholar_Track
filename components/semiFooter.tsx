"use client";
import React from 'react';
import { motion } from 'framer-motion';

const SemiFooter = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className='bg-green-600 w-full'
    >
      <div className='container mx-auto flex flex-col lg:flex-row items-center justify-around gap-4 p-8 md:p-14'>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='flex-1 max-w-2xl text-center lg:text-left'
        >
          <motion.h1 
            className='text-2xl md:text-3xl font-bold text-white leading-tight md:leading-snug'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            All-in-one academic solution for planning, exams, and progress
          </motion.h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className='flex-1 flex justify-center lg:justify-end'
        >
          <motion.button 
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              hover: { type: "spring", stiffness: 400, damping: 10 },
              tap: { duration: 0.1 }
            }}
            className='mt-6 bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300'
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SemiFooter;