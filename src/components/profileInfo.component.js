import React, { useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import { Paper, IconButton, Icon, Button, DialogContent, Container} from "@material-ui/core";
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import Controls from "./employees/controls/Controls";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import * as employeeService from "../services/employeeService";
import AuthService from "../services/auth.service";
import RestService from "../services/rest.service";
import Notification from "./employees/Notification";
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center',
        margin: 'auto',
        padding: "auto",
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        backgroundColor: "#f8324526",
        color: theme.palette.secondary.main,
        justify:"center",
        '&:hover': {
            backgroundColor: "#f8324526",
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    },
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
          width: '40ch',
      },

      settings: {
        flexDirection: "column",
        textAlign: "left",
        justifyContent: "center",
        width: "950px",
        margin: "auto",

        paddingLeft: theme.spacing(10),
        background: "#ffffff",
        // boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
        padding: "40px 55px 45px 55px",
        borderRadius: "15px",
        transition: "all .3s",
      },
}))


ChangePassword.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };


export default function ProfileInfo(props) {

    const classes = useStyles();

    const [userInfo, setUserInfo] = useState(AuthService.getCurrentUser().userInfo);//values => user
    const [errors, setErrors] = useState({});
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(null);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const genderItems = [
        { id: 'MALE', title: 'male' },
        { id: 'FEMALE', title: 'female' },
    ]

    const validateOnChange = true

    const validate = (fieldValues = userInfo) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."

        setErrors({
            ...temp
        })

        if (fieldValues == userInfo)
            return Object.values(temp).every(x => x == "")
    }
    

    const handleInputChange = e => {
        const { name, value } = e.target
        setUserInfo({
            ...userInfo,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }


    const handleClickOpen = () => {
        console.log("Email", userInfo.email)
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            RestService.updateUserInfo(userInfo)
            .then(
                (response) =>{
                    setNotify({
                        isOpen: true,
                        message: response,
                        type: "success"
                    })
                },
                error =>{
                    console.log("ERROR", error)
                    let errMessage = ""
                    if (error.response){
                        if(error.response.status == 500) errMessage = "Server error"
                        else errMessage = error.response.data
                    }
                    else errMessage = "Server is not available"

                    setNotify({
                        isOpen: true,
                        message: errMessage,
                        type: "error"
                    })
                }
            );
        }
    }
    return (
            <Container maxWidth="md">
            <Grid container justify="center">
                    <IconButton disableRipple className={classes.titleIcon}>
                            {/* <NotListedLocationIcon /> */}
                            <PermIdentityOutlinedIcon/>
                    </IconButton>
            </Grid>
            <form onSubmit={handleSubmit}>
                <div className={classes.settings}>
                        <Grid container spacing={0}>
                            <Grid item md={6}>
                                <Controls.Input
                                    className={classes.inputField}
                                    name="fullName"
                                    label="Full Name"
                                    value={userInfo.fullName}
                                    onChange={handleInputChange}
                                    error={errors.fullName}
                                    variant="outlined"
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controls.Input
                                    className={classes.inputField}
                                    name="leaderEmail"
                                    label="Leader email"
                                    value={userInfo.leaderEmail}
                                    onChange={handleInputChange}
                                    // error={errors.mobile}
                                    variant="outlined"
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Controls.Input
                                    className={classes.inputField}
                                    label="Email"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleInputChange}
                                    error={errors.email}
                                    variant="outlined"
                                    margin="normal"
                                />
                            </Grid>

                            <Grid item md={6}>
                                <Controls.RadioGroup
                                    className={classes.inputField}
                                    name="gender"
                                    label="Gender"
                                    value={userInfo.gender}
                                    onChange={handleInputChange}
                                    items={genderItems}
                                    margin="normal"
                                    variant="outlined"
                                    style={{marginBottom: "10px"}}
                                />
                            </Grid>

                            <Grid item md={6}>
                                <Controls.Input 
                                    className={classes.inputField}
                                    name="department" 
                                    label="Department" 
                                    // defaultValue={values.department}
                                    value={userInfo.department}
                                    onChange={handleInputChange}
                                    // variant="outlined"
                                    margin="normal"
                                />
                            </Grid>

                            <Grid item md={6}>
                                <Controls.DatePicker
                                    name="hireDate"
                                    label="Hire Date"
                                    value={userInfo.hireDate}
                                    variant="outlined"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                        className={classes.inputField}
                                        label="Position"
                                        name="position"
                                        value={userInfo.position}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        margin="normal"
                                    />
                            </Grid>

                        </Grid>
                </div>  
            <Grid container spacing={3} justify="center">
                    <Grid item>
                        <Button type="submit" variant="contained" color="secondary" style={{width:"192px"}}>Update</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={handleClickOpen} style={{width:"192px"}}>Change Password</Button>
                    </Grid>
            </Grid>
            </form>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />

            <ChangePassword userEmail={userInfo.email} selectedValue={selectedValue} open={open} onClose={handleClose} />

            
            </Container>
        
    )}


    function ChangePassword(props) {
        const classes = useStyles()
    
        const onClose = props.onClose
        const selectedValue = props.selectedValue
        const open = props.open
        const userEmail = props.userEmail;
    
        const [errMessageNew, setErrMessageNew] = useState("") 
        const [errMessageConfirm, setErrMessageConfirm] = useState("") 
        const [newPassword, setNewPassword] = useState("") 
        const [password, setPassword] = useState("")
        const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' })

      
        const handleClose = () => {
          onClose(selectedValue);
        };
      
        const handleInputNewPassword = e => {
            const { name, value } = e.target
            if(value.length < 6 ) 
                setErrMessageNew("the minimum password length must be 6")
            else {
                setErrMessageNew("")
                setNewPassword(value)
            }
        }
        const handleInputConfirmPassword = e => {
            const { name, value } = e.target
            if(value !== newPassword) setErrMessageConfirm("Passwords do not match")
            else setErrMessageConfirm("")
        }
    
        const handlePasswordSubmit = e =>{
            e.preventDefault()
            console.log(errMessageNew, errMessageConfirm)
            const body = {
                email: userEmail,
                password: password,
                newPassword: newPassword
            }
            if (!errMessageNew 
                && !errMessageConfirm 
                && password.length > 0 
                && newPassword.length > 0){
                RestService.updateUserPassword(body)
                .then((response)=>{
                    setNotify({
                        isOpen: true,
                        message: response,
                        type: "success"
                    })
                    console.log("Response", response.data)
                }
                ,
                error=>{
                    console.log("RESP", error.response)
                    let errMessage = ""
                    if (error.response){
                        if(error.response.status == 500) errMessage = "Server error"
                        else errMessage = error.response.data
                    }
                    else errMessage = "Server is not available"

                    setNotify({
                        isOpen: true,
                        message: errMessage,
                        type: "error"
                    })

                }
                )
            }
        }
    
        return (
            <div>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
          <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className={classes.dialog}>
            <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}>Change password</DialogTitle>
            <DialogContent className={classes.dialogContent}>
    
                <form onSubmit={handlePasswordSubmit}>
                <Grid container justify="center">
                    <Grid item xs={12} sm={6} md={8} >
                        <Controls.Input    
                            style={{margin:'8px', width: '100%'}}
                            label="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            />
                        <Controls.Input    
                            style={{margin:'8px', width: '100%'}}    
                            label="New password"
                            type="password"
                            onChange={handleInputNewPassword}
                            error={errMessageNew}
                            variant="outlined"/>   
                        <Controls.Input   
                            style={{margin:'8px', width: '100%'}}
                            label="Confirm new password"
                            type="password"
                            onChange={handleInputConfirmPassword}
                            error={errMessageConfirm}
                            variant="outlined"/>  
                        <Button 
                            type="submit"
                            variant="contained"
                            color="secondary" 
                            style={{width:"50%", marginTop: "8px"}} 
                            onClick={handleClose}>Save</Button>
                    </Grid>
                </Grid>
                </form>
    
            </DialogContent>
          </Dialog>
          </div>
        );
      }
