'use client';
import React from 'react';
import Yohh from '@/public/images/yohhhh.gif';
import Image from 'next/image';
import GetBtn from '@/utils/getBtn';
const HeroVideoBackground = () => {
  return (
    <div className="relative h-screen overflow-hidden">
   <Image
  src={Yohh}
  className="absolute z-0 w-full h-[33rem] object-cover"
  style={{ animationDuration: '19s' }} // Adjust this value
  alt='yoh'
/>
      <div className="relative z-10 flex flex-col justify-center items-center h-full bg-black bg-opacity-40 text-white px-4 text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-10">
        ScholarHub helps students study smarter, not harder, reducing stress while boosting academic performance with the right tools and resources.
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-12">
          Join thousands of students excelling with ScholarHub
        </p>
       <GetBtn />
      </div>
      {/* our stats */}
    </div>
  );
};

export default HeroVideoBackground;