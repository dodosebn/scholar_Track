import React from 'react';
// import Image from 'next/image';
// import ForSemiFooter from '@/public/images/miniFooterImgs.avif';

const SemiFooter = () => {
  return (
    <div className='bg-green-600 w-full'>
      <div className='container mx-auto flex flex-col lg:flex-row items-center justify-around gap-4 p-8 md:p-14'>
        <div className='flex-1 max-w-2xl text-center lg:text-left'>
          <h1 className='text-2xl md:text-3xl font-bold text-white leading-tight md:leading-snug'>
          All-in-one academic solution for planning, exams, and progress
          </h1>
          
        </div>
        
        <div className='flex-1 flex justify-center lg:justify-end'>
        <button className='mt-6 bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300'>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SemiFooter;