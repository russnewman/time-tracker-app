import React from 'react';
import Navbar from '../components/Navbar';


const Profile = () => {

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
      <h1>Profile</h1>
    </div>
    </>
  );
};

export default Profile;
