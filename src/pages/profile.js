import React from 'react';
import Navbar from '../components/Navbar';
import ProfileInfo from '../components/profileInfo.component'
import AuthService from '../services/auth.service'
import { Redirect } from "react-router-dom";


const Profile = () => {

  const user = AuthService.getCurrentUser().userInfo;

  if (user){
    return (
    <div>
      <Navbar/>
      <ProfileInfo/>
    </div>
    )
  } 
  return(
  <Redirect to="sign-in"/>
  )
};

export default Profile;
