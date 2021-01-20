import React from 'react';
import Navbar from '../components/Navbar';
import EmployeesComponent from './Employees/EmployeesComponent';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles((theme) => ({
//   employeeComponent:{
//     position: 'relative',
//     top: '40px',
//     marginTop: theme.spacing(3),
//     // width: '100%',
//   }
// }));

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
  // const classes = useStyles();
  return (
    <>
    <Navbar position="fixed"/>
    <ThemeProvider theme={theme}>        
      <EmployeesComponent/>
    </ThemeProvider>
    </>
  );
};

export default Employees;
