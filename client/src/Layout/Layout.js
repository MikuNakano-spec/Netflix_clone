import React from 'react'
import NavBar from './NavBar/NavBar'
import Footer from './Footer/Footer'

function Layout({children}) {
  return (
    <>
    <div className='bg-slate-400 text-subMain'>
        <NavBar/>
        {children}
        <Footer/>  
    </div>
    </>
  )
}

export default Layout