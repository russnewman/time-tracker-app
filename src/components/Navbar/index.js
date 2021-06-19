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
    marginBottom: '-1px'
  },
  navMenu:{
    marginLeft: '56px'
  },
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
             {/* <Typography style={{fontWeight: '300'}}>Dashboard</Typography> */}
             <Typography style={{fontWeight: '300'}}>Отчеты</Typography>

            </NavLink>}


            {user.userRole === "LEADER" ?
                (<NavLink to='/employees' activeStyle>
                  <Typography style={{fontWeight: '300'}}>Сотрудники</Typography>
                </NavLink>)
                :
                (<NavLink to='/leaders' activeStyle>
                  <Typography style={{fontWeight: '300'}}>Руководитель</Typography>
                </NavLink>)
            }
            <NavLink to='/profile' activeStyle>
            <Typography style={{fontWeight: '300'}}>Профиль</Typography>
            </NavLink>
          {/* </div> */}
        </NavMenu>
            {/* <Button>
              <Link  to={'/sign-in'} variant="body2" className={classes.signOut}>>

              </Link>
            </Button> */}
          <div>
            <Typography variant='h6' style={{color: 'white', display: 'inline-block', marginRight: '24px', fontWeight:'500', marginTop: '15px'}}>{user.email}</Typography>
            <IconButton component={ Link } to="/sign-in" variant="contained" onClick={handleLogOut} style={{display: 'inline-block', color: 'white', marginRight: '48px'}}>
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
