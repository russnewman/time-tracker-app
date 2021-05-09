import React, { useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import { Paper, IconButton, Icon, Button, DialogContent, Container, Typography} from "@material-ui/core";
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import Controls from "./employees/controls/Controls";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import Notification from "./employees/Notification";
import Grid from '@material-ui/core/Grid';
import { useForm, Form } from './employees/useForm';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';


const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: 'center',
        backgroundColor: '#38023b',
        color: 'white'
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
        // backgroundColor: "#f8324526",#060b26
        // backgroundColor: "#4aedc4",
        backgroundColor: "whie",
        marginTop: '20px',

        color: "#38023b",
        justify:"center",
        // '&:hover': {
        //     backgroundColor: "#00b0ff",
        //     cursor: 'default'
        // },
        '& .MuiSvgIcon-root': {
            fontSize: '10rem',
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
        paddingLeft: theme.spacing(9),
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5)
      },
}))


ChangePassword.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };


export default function ProfileInfo(props) {

    const classes = useStyles();

    const [userInfo, setUserInfo] = useState(AuthService.getCurrentUser().userInfo);
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

    useEffect(()=>{
        UserService.getUserInfo(userInfo.id)
        .then((response) =>{
            setUserInfo(response)
        },
        error =>{
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
        })
    },[])
    

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
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            UserService.updateUserInfo(userInfo)
            .then(
                (response) =>{
                    setNotify({
                        isOpen: true,
                        message: response,
                        type: "success"
                    })
                },
                error =>{
                    console.log("ERROR", error.response)
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
    if (userInfo.userRole === 'LEADER'){
        return(
            <Container maxWidth="md">
            <Grid container justify="center">
                    <IconButton disableRipple className={classes.titleIcon}>
                            {/* <NotListedLocationIcon /> */}
                            <PersonRoundedIcon/>
                    </IconButton>
            </Grid>
            <form onSubmit={handleSubmit}>
                <div className={classes.settings}>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={6} md={6} >
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
                            <Grid item xs={12} sm={6} md={6}>
                                <Controls.Input
                                    disabled
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
                            <Grid item xs={12} sm={6} md={6}>
                                <Controls.Input 
                                    className={classes.inputField}
                                    name="department" 
                                    label="Department" 
                                    value={userInfo.department}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
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
                        <Button variant="contained" onClick={handleClickOpen} style={{width:"192px", backgroundColor: 'white'}}>Change Password</Button>
                    </Grid>
            </Grid>
            </form>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />

            <ChangePassword userEmail={userInfo.email} selectedValue={selectedValue} open={open} onClose={handleClose} />

            
            </Container>
        )
    }
    return (
            <Container maxWidth="md">
            <Grid container justify="center">
                    <IconButton disableRipple className={classes.titleIcon}>
                            {/* <NotListedLocationIcon /> */}
                            <PersonRoundedIcon/>
                    </IconButton>
            </Grid>
            <Form onSubmit={handleSubmit}>
            <div className={classes.settings} justifyContent="center" justify="center">

                <Grid container justify="center" justifyContent="center">
                    <Grid item xs={6}>

                        <Controls.Input
                            label="Email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleInputChange}
                            error={errors.email}
                            variant="outlined"
                        />
                        
                        <Controls.Input
                            label="Department"
                            name="department"
                            value={userInfo.department}
                            onChange={handleInputChange}
                            // error={errors.department}
                            variant="outlined"
                        />

                        <Controls.Input
                            label="Position"
                            name="position"
                            value={userInfo.position}
                            onChange={handleInputChange}
                            variant="outlined"
                        />

                    </Grid>
                    <Grid item xs={6}>

                    <Controls.Input
                            name="fullName"
                            label="Full Name"
                            value={userInfo.fullName}
                            onChange={handleInputChange}
                            error={errors.fullName}
                            variant="outlined"
                            />

                        <Controls.DatePicker
                            name="hireDate"
                            label="Hire Date"
                            value={userInfo.hireDate}
                            onChange={handleInputChange}
                        />
                        <Controls.RadioGroup
                            name="gender"
                            label="Gender"
                            value={userInfo.gender}
                            onChange={handleInputChange}
                            items={genderItems}
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
                </Form>
            


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
                UserService.updateUserPassword(body)
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
            <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}><Typography variant="h6">Change password</Typography></DialogTitle>
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
