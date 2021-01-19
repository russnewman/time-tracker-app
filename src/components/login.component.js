import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import { Button, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
      marginBottom: theme.spacing(3),
      minWidth: '30ch',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    avatar: {
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
    },
    inputField:{
        width: '30ch',
    },
    buuttonSignIn: {
        width: '100%',
        margin: theme.spacing(2),
    }
  }));


export default function SignIn(props) {
        const classes = useStyles();

        return (
        <>
            <div className="auth-inner-singin">
                <Grid container justify="center">
                    <Grid item>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                    </Grid>
                </Grid>

                <form>
                    <Grid  container justify="center">
                        
                        <Grid item >
                            <TextField required  label="Email" style={{width: '100%'}} margin="normal"/>
                            <TextField required  label="Password" style={{width: '100%'}} type="password"
                                margin="normal"/>
                        </Grid>
                    </Grid>

                    <Grid container  justify="center" md={12}>
                        <Link to={"/about"} variant="body2">
                            <Button className={classes.buuttonSignIn} variant="contained" color="primary">Sign In</Button>    
                        </Link>
                            
                    </Grid>

                    <Grid container justify="flex-end">
                        {/* <Grid item>
                                <Link to={"/sign-in"} variant="body2">
                                    <Typography variant="caption">
                                        Forgot password?
                                    </Typography>
                                </Link>
                        </Grid> */}
                        <Grid item>
                            <Link to={"/sign-up"} variant="body2">

                                    <Typography variant="caption">
                                        Don't have an account? Sign up.
                                    </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </>
        );
    }