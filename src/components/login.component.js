import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import { Button, TextField, Typography } from "@material-ui/core";
import AuthService from "../services/auth.service"
import Notification from "./employees/Notification";



const styles = makeStyles((theme) => ({
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
        backgroundColor: '#38023b', 
        color: 'white',
        '&:hover': {
            backgroundColor: "#000361",
            cursor: 'default'
        },
    }
  }));


export default function SignIn(props){

        const  classes  = styles();

        const [email, setEmail] = React.useState("")
        const [password, setPassword] = React.useState("")
        const [emailErrMessage, setEmailErrMessage] = React.useState("")
        const [passwordErrMessage, setPasswordErrMessage] = React.useState("")
        const [redirect, setRedirect] = React.useState(null)
        const [valid, setValid] = React.useState(false)
        const [notify, setNotify] = 
        React.useState(props && props.location && props.location.state && props.location.state.notify ? 
            {isOpen: true, message: 'You are successfully registered', type: "success"}
            :{ isOpen: false, message: '', type: '' })

        const handleSubmit = (e)=>{
            e.preventDefault()
            AuthService.login(email, password)
                .then(()=>{
                    console.log("LOG", JSON.parse(sessionStorage.getItem('efficiency')))
                    console.log("LOG@", JSON.parse(sessionStorage.getItem('user')))
                    setRedirect("/dashboard")
                },
                error => {
                    let resMessage = ""
                    if(error.response){
                        if (error.response.status == 401) resMessage = "Bad credentials"
                        if (error.response.status == 500) resMessage = "Server error"
                    }
                    else{
                        resMessage = "Server is not available"
                    }
                    setNotify({
                        isOpen:true,
                        message:resMessage,
                        type: 'error'})
                  }
                );
        }

        const handleChangeEmail = (e)=>{
            setEmail(e.target.value)
        }
        
        const handleChangePassword = (e) =>{
            setPassword(e.target.value)
        }

        if (redirect){
            return(
            <div>
                {/* <Switch>
                <Route exact path='/dashboard'>
                    <Dashboard/>
                  </Route>
                  <Route path='/profile'>
                    <Profile/>
                  </Route>
                  </Switch> */}
                 <Redirect to={redirect}/>
            </div>
            )
        }
        return (
            <>
        <div className="auth-wrapper">
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

                <form onSubmit={handleSubmit}>
                    <Grid  container justify="center">
                        <Grid item>
                            <TextField required  
                            label="Email" 
                            style={{width: '100%', color: 'red'}}
                                margin="normal" 
                                onChange={handleChangeEmail}
                                helperText={emailErrMessage}/>
                            <TextField required  label="Password" style={{width: '100%'}} type="password"
                                margin="normal" onChange={handleChangePassword}/>
                        </Grid>
                    </Grid>

                    <Grid container  justify="center" md={12}>
                        {/* <Link to={"/dashboard"} variant="body2"> */}
                            <Button className={classes.buuttonSignIn} variant="contained" type="submit">Sign In</Button>    
                        {/* </Link> */}
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
                            <Link to={"/sign-up"} variant="body2" style={{color: '#38023b'}}>

                                    <Typography variant="caption" >
                                        Don't have an account? Sign up.
                                    </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
            </div>
        </div>
        </>
        )
}
