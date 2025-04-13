import { section } from 'framer-motion/client'
import React from 'react'

const Explan = () => {
  return (
    <div className='flex flex-col md:flex-row md:gap-3'>
     <div className="space-y-4 flex-1">
  <h1 className="text-3xl font-bold text-gray-900">What Makes ScholarHub Different?</h1>
  <p className="text-lg text-gray-700 leading-relaxed w-[80%]">
    ScholarHub is your comprehensive academic companion, offering everything you need to excel. 
    From daily planning tools and the latest education news to streamlined GST exam preparation 
    and accurate CGPA calculations - we consolidate all essential academic resources into one 
    powerful platform.
  </p>
</div>
      <div className='my-auto border-l-1 border-green-600'></div>
      <div className='pt-[3rem]'>
      <ul className="text-lg text-gray-700 space-y-2 list-disc">
    <li>Smart daily planning tools to organize your academic life</li>
    <li>Curated education news to keep you informed</li>
    <li>Comprehensive GST exam preparation resources</li>
    <li>Accurate CGPA calculation for progress tracking</li>
  </ul>
      </div>
    </div>
  )
}

export default Explan;
