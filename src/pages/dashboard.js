import React from 'react';
import Navbar from '../components/Navbar';
import AuthService from '../services/auth.service'
import { Redirect } from "react-router-dom";
import DashboardEfficiency from '../components/Dashboard/dashboardEfficiency'
import Sites from '../components/Dashboard/Sites'


const Dashboard = () => {

  const user = AuthService.getCurrentUser();
  if(user)
  {
      return (
      <>
      <Navbar/>
      <DashboardEfficiency/>
      </>
    );
  }
  return(
    <Redirect to="sign-in"/>
  )
};

export default Dashboard;
