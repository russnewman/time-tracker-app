import React from 'react';
import Navbar from '../components/Navbar';
import AuthService from '../services/auth.service'
import { Redirect } from "react-router-dom";


const Dashboard = () => {

  const user = AuthService.getCurrentUser();
  if(user)
  {
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
        <h1>Dashboard</h1>
      </div>
      </>
    );
  }
  return(
    <Redirect to="sign-in"/>
  )
};

export default Dashboard;
