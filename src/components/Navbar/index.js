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
        <NavBtn>
          <NavBtnLink to='/sign-in'>Sign Out</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
