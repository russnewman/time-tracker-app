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
import { Button, Typography, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service"
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';



const useStyles = makeStyles((theme) => ({
  navbar:{
    // position: 'relative',
    // top: '0px',
    // left: '0px',
    // position: 'fixed',
    // top: '0px',
    // width: '100%',
    marginBottom: '-1px'
  },
  navMenu:{
    // display: 'flex',
    // justifyContent: 'space-between',
    marginLeft: '56px'
  },
  // signOut:{
  //   marginRight: '62px',
  //   // marginTop: '12px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   height: '40px',
  //   background: '#00a6fb',
  //   color: 'black'
  // }

  exitIcon: {
    fontSize: '32px',
    '&:hover': {
      color: "#f50057",
      // cursor: 'default'
  }
  }
}));

const handleLogOut = e =>{
  AuthService.logout()
}

const Navbar = () => {
  const user = AuthService.getCurrentUser().userInfo;
  const classes = useStyles();
  return (
    <>
      <Nav  className={classes.navbar}>
        <Bars />
        <NavMenu className={classes.navMenu}>
          {/* <div> */}
          {user.userRole === 'LEADER' && 
            <NavLink to='/dashboard' activeStyle>
              Dashboard
            </NavLink>}


            {user.userRole === "LEADER" ?
                (<NavLink to='/employees' activeStyle>
                  Employees
                </NavLink>)
                :
                (<NavLink to='/leaders' activeStyle>
                  Managers
                </NavLink>)
            }
            <NavLink to='/profile' activeStyle>
              Profile
            </NavLink>
          {/* </div> */}
        </NavMenu>
            {/* <Button>
              <Link  to={'/sign-in'} variant="body2" className={classes.signOut}>>

              </Link>
            </Button> */}

          <div>
            <Typography variant='h6' style={{color: 'white', display: 'inline-block', marginRight: '24px', fontWeight:'500', marginTop: '15px'}}>{user.email}</Typography>
            <IconButton component={ Link } to="/sign-in" variant="contained" style={{display: 'inline-block', color: 'white', marginRight: '48px'}}>
                <ExitToAppOutlinedIcon className={classes.exitIcon}/>
            </IconButton>
          </div>
          {/* <Link to={'/sign-in'} variant="body2" className={classes.signOut}>
              <Button variant="contained" color="primary"  onClick={handleLogOut}>Sign Out</Button>   
          </Link> */}

      </Nav>
    </>
  );
};

export default Navbar;
