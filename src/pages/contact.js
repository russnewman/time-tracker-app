import React from 'react';
import Navbar from '../components/Navbar';


const Contact = () => {

  return (
    <>
    <Navbar/>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}
    >
      <h1>Contact Us</h1>
    </div>
    </>
  );
};

export default Contact;
