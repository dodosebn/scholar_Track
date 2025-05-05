import NavBar from '@/components/navBar';
import React from 'react'
import GpCalculator from './gpCalculator';

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
