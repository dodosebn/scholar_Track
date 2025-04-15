"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Explan = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className='flex flex-col md:flex-row gap-8 md:gap-12 my-12'
    >
      <div className="flex-1 space-y-6 text-center md:text-start">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          What Makes ScholarHub Different?
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-700 leading-relaxed md:pr-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          ScholarHub is your comprehensive academic companion, offering everything you need to excel. 
          From daily planning tools and the latest education news to streamlined GST exam preparation 
          and accurate CGPA calculations - we consolidate all essential academic resources into one 
          powerful platform.
        </motion.p>
      </div>

      <div className='hidden md:block border-l border-gray-200 h-auto mx-2'></div>

      <div className='flex-1 md:pt-6'>
        <ul className="space-y-6">
          {[
            "Smart daily planning tools to organize your academic life",
            "Curated education news to keep you informed",
            "Comprehensive GST exam preparation resources",
            "Accurate CGPA calculation for progress tracking"
          ].map((text, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
              className='flex gap-4 items-start'
            >
              <div className='mt-1'>
                <motion.div
                  className="bg-green-600 rounded-full w-[2rem] h-[2rem] flex items-center justify-center text-white font-medium"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {index + 1}
                </motion.div>
              </div>
              <span className='text-lg text-gray-700 flex-1 md:pt-2'>{text}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Explan;