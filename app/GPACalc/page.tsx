import NavBar from '@/components/navBar';
import React from 'react'
import GpCalculator from './calc_comp/gpIntro';

const page = () => {
  return (
    <div>
      <NavBar />
      <div>
        <GpCalculator />
      </div>
    </div>
  )
}

export default page;
