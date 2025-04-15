import React from 'react';

const Explan = () => {
  return (
    <div className='flex flex-col md:flex-row gap-8 md:gap-12'>
      <div className="flex-1 space-y-6 text-center md:text-start">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          What Makes ScholarHub Different?
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed md:pr-4">
          ScholarHub is your comprehensive academic companion, offering everything you need to excel. 
          From daily planning tools and the latest education news to streamlined GST exam preparation 
          and accurate CGPA calculations - we consolidate all essential academic resources into one 
          powerful platform.
        </p>
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
            <li key={index} className='flex gap-4 items-start'>
              <div className='mt-1'>
              <div
      className=" bg-green-600 rounded-full w-[2rem] h-[2rem] flex items-center justify-center  text-white   font-medium "
    >
      {index + 1}
    </div>
              </div>
              <span className='text-lg text-gray-700 flex-1 md:pt-2'>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Explan;