import React from 'react';
import Navbar from '../components/Navbar';
import AuthService from '../services/auth.service'
import { Redirect } from "react-router-dom";
import DashboardEfficiency from '../components/Dashboard/dashboardEfficiency'


const Dashboard = () => {

  // const user = AuthService.getCurrentUser();
  // if(user)
  // {
      return (
      <>
      <Navbar/>
      <DashboardEfficiency/>
      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh'
        }}
      >
        <h1>Dashboard</h1>
      </div> */}
      </>
    );
  // }
  // return(
  //   <Redirect to="sign-in"/>
  // )
};

export default Dashboard;
