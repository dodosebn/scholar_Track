import React from 'react';
import Image from 'next/image';
import FunaiIntro from '@/public/images/introfunai.jpg';
import GetBtn from '@/utils/getBtn';

const Intro = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center py-8 md:py-12 gap-8'>
      <div className='max-w-2xl order-2 md:order-none'> 
      <h1 
  className='font-bold text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-[3.5rem]'
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
        </h1>
        <div className='mt-8 '>
          <GetBtn />
        </div>
      </div>

      <div className='relative w-full md:w-[35rem] order-1 md:order-none'> 
        <Image 
          src={FunaiIntro} 
          alt='FunaiImg' 
          className='object-cover w-full rounded-xl shadow-xl'
          style={{
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
          priority
        />
      </div>
    </div>
  );
};

export default Intro;