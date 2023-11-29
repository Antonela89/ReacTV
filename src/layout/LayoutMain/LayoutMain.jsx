import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './LayoutMain.css';

const LayoutMain = ({children}) => {
  return (
    <div className='LayoutMain'>
      <Navbar/>
        {children}
      <Footer/>
    </div>
  )
}

export default LayoutMain