import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import { Button, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
      marginBottom: theme.spacing(3),
    //   margin: theme.spacing(3),
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
  }));


export default function SignUp(props) {
    const classes = useStyles();

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

        return (
        <>
        <div className="auth-inner-singup">

        <Grid container justify="center">
            <Grid item>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
            </Grid>
        </Grid>

            <form>
                <Grid container spacing={0}>
                    
                    <Grid item md={6}>
                        <TextField required className={classes.inputField} label="Firstname"  margin="normal"/>
                            {/* <input type="email" className="form-control" placeholder="Enter email" /> */}
                    </Grid>
                    <Grid item md={6}>
                        <TextField required className={classes.inputField} label="Lastname" margin="normal"/>
                    </Grid>

                    <Grid item md={6}>
                        <TextField required className={classes.inputField} label="Email" margin="normal"/>
                    </Grid>
                    <Grid item md={6}>
                            
                            <TextField 
                                required 
                                margin="normal"
                                className={classes.inputField}
                                label="Password"
                                type="password"
                            />
                    </Grid>
                    <Grid item md={6}>
                        <TextField className={classes.inputField} label="Department" margin="normal"/>
                    </Grid>
                    <Grid item md={6}>
                        <FormControl margin="normal" className={classes.formControl}>
                            <InputLabel required>Position</InputLabel>
                                <Select
                                value={age}
                                onChange={handleChange}
                                >
                                    <MenuItem value={10}>Leader</MenuItem>
                                    <MenuItem value={20}>Employee</MenuItem>
                                </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container md={12} >
                        <Button variant="contained" color="primary" style={{width: '100%'}}>Sign Up</Button>    
                </Grid>

                <Grid container justify="flex-end">
                    <Grid item>
                    <Link to={"/sign-in"} variant="body2">
                        <Typography variant="caption">
                            Already have an account? Sign in
                        </Typography>
                    </Link>
                    </Grid>
                </Grid>
            </form>
            </div>
            </>
        );
    }
