import React from 'react'
import Header from './ab_components/header'
import NavBar from '@/components/navBar'
import Af_Header from './ab_components/af_Header'
const page = () => {
  return (
    <div>
      <NavBar />
      <Header />
      <div className='relative bottom-[5.5rem] bg-white'>
<Af_Header />
</div>
    </div>
  )
}

export default page;
