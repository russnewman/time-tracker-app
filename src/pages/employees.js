import React from 'react';
import Navbar from '../components/Navbar';
import EmployeesComponent from './Employees/EmployeesComponent';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AuthService from '../services/auth.service'
import { Redirect } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})

const Employees = () => {

  const user = AuthService.getCurrentUser();


  if(user && user.userInfo.userRole === "LEADER"){
    return (
      <>
      <Navbar position="fixed"/>
      <ThemeProvider theme={theme}>        
        <EmployeesComponent/>
      </ThemeProvider>
      </>
    );
  }
  else if (user && user.userInfo.userRole === "EMPLOYEE") return(<div/>)
  return (<Redirect to ="sign-in"/>)
};

export default Employees;
