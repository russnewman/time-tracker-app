import React from 'react';
import Navbar from '../components/Navbar';


const Dashboard = () => {

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
};

export default Dashboard;
