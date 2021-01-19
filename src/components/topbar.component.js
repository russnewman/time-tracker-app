import React from 'react';

import Person from "@material-ui/icons/Person";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Divider from "@material-ui/core/Divider";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";



import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Container, 
  IconButton, 
  Button,
  Box, MenuItem, Select
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'


const useStyles = makeStyles((theme)=>({
    route:{
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(1)
    }, 
    title: { 
      flexGrow: 1
    },
  }))

export default function TopBar(props) {
        const classes = useStyles();
        const [openProfile, setOpenProfile] = React.useState(null);
        const handleClickProfile = event => {
          if (openProfile && openProfile.contains(event.target)) {
            setOpenProfile(null);
          } else {
            setOpenProfile(event.currentTarget);
          }
        };
        const handleCloseProfile = () => {
          setOpenProfile(null);
        };
    
        return(
            <>
                <AppBar position="fixed">
                        <Container fixed>
                        <Toolbar>
                            <IconButton edge="start"  color="inherit" aria-label="menu" className={classes.menuButton}>
                            </IconButton>
                            {/* Компонент куда записываем текст */}
                            <Typography variant="h6" className={classes.title}>
                            Time Tracker
                            </Typography>
                            {/* <Box mr={3}>
                            <Button color="inherit" variant="outlined">Log In</Button>
                            </Box> */}
                            {/* <Button color="secondary" variant="contained">Sign Up</Button> */}
                            <div className={classes.manager}>
                                <Button
                                    style={{color:"black"}}
                                    onClick={handleClickProfile}
                                    className={classes.buttonLink}
                                >
                                    <Person style={{color:"black"}}className={classes.icons} />
                                </Button>
                                <Poppers
                                    open={Boolean(openProfile)}
                                    anchorEl={openProfile}
                                    transition
                                    disablePortal
                                >
                                {({ TransitionProps, placement }) => (
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleCloseProfile}>
                                        <MenuList role="menu">
                                            <MenuItem
                                                onClick={handleCloseProfile}
                                                className={classes.dropdownItem}
                                            >
                                                <Link to={"/sign-in"} style={{color:"black"}}>
                                                    Log in
                                                </Link>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={handleCloseProfile}
                                                className={classes.dropdownItem}
                                            >
                                                <Link to={"/sign-up"} style={{color:"black"}}>
                                                        Sign up
                                                </Link>
                                            </MenuItem>
                                            <Divider light />
                                            <MenuItem
                                                onClick={handleCloseProfile}
                                                className={classes.dropdownItem}
                                            >
                                                
                                            Forgot password
                                            </MenuItem>
                                        </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                    // </Grow>
                                )}
                                </Poppers>
                            </div>

                            
                        </Toolbar>
                        </Container>
                </AppBar>
            </>
        )
}
