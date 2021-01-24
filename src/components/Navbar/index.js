import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  navbar:{
    // position: 'fixed',
    // top: '0px',
    // width: '100%',
    marginBottom:theme.spacing(2)
  }
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <>
      <Nav  className={classes.navbar}>
        <Bars />
        <NavMenu>
          <NavLink to='/dashboard' activeStyle>
            Dashboard
          </NavLink>
          <NavLink to='/employees' activeStyle>
            Employees
          </NavLink>
          <NavLink to='/profile' activeStyle>
            Profile
          </NavLink>
        </NavMenu>

        {/* <Link to={"/dashboard"} variant="body2">
                            <Button  variant="contained" color="primary">Sign Out</Button>    
                        </Link> */}

          <Link to={'/sign-in'} variant="body2">
              <Button  variant="contained" color="primary">Sign Out</Button>   
          </Link>

      </Nav>
    </>
  );
};

export default Navbar;
