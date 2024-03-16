import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import React from 'react'


interface Props{
  children:React.ReactNode;
}

function Layout({children}:Props) {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header/>
        <Hero/>
        <div className="flex-1 mx-auto py-10 w-[90vw] md:max-w-[70vw]">
          {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout