import React from 'react'
import Header from './ab_Comp/header'
import NavBar from '@/components/navBar'
import Imp_Notes from './ab_Comp/imp_Notes'
import Footer from '@/components/footer'

const page = () => {
  return (
    <div>
      <NavBar />
      <div className='pt-[2rem] p-4 sm:px-6 lg:px-9'>
      <Header />
      </div>
      <Imp_Notes />
     <Footer />
    </div>
  )
}

export default page
