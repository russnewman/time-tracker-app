import React from 'react';
import Navbar from '../components/Navbar';
import ProfileInfo from '../components/profileInfo.component'


const Profile = () => {

  return (

    <div>
      <Navbar/>
      <ProfileInfo/>
    </div>

    // <>
    // <div
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: '90vh'
    //   }}
    // >
    //   <h1>Profile</h1>
    // </div>
    // </>
  );
};

export default Profile;
