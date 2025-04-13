'use client'; 
import React from 'react';
import { motion } from 'framer-motion';
import ReviewEasyAdd from '@/utils/reviewEasyAdd';
import Image from 'next/image';

const Reviews = () => {
  return (
    <div className="overflow-hidden py-12">
      <h1 className="text-3xl font-bold text-center mb-12">What They've Said</h1>
      
      <div className="relative overflow-x-hidden">
        <motion.div 
          className="flex gap-6 w-max"
          animate={{
            x: ['0%', '-50%'],
            transition: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
        >
          {[...ReviewEasyAdd, ...ReviewEasyAdd].map((itm, index) => (
            <motion.div 
              key={`${itm.id}-${index}`}
              className="flex-shrink-0 w-80 bg-[#fafafa] rounded-lg p-6 shadow-sm"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center text-center">
                {itm.img && (
                  <div className="mb-4">
                    <Image 
                      src={itm.img} 
                      alt={itm.name} 
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-md"
                    />
                  </div>
                )}
                <blockquote className="text-gray-600 italic mb-4">
                  "{itm.comment}"
                </blockquote>
                <cite className="font-semibold text-gray-800 not-italic">
                  — {itm.name}
                </cite>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  
  );
};

export default Reviews;