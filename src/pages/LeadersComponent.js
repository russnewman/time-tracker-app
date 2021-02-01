import React, { useState, useEffect } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

import Notification from "../components/employees/Notification";
import ConfirmDialog from "../components/employees/ConfirmDialog";
import Controls from "../components/employees/controls/Controls";
import useTable from "../components/employees/useTable";
import AuthService from "../services/auth.service"
import EmployeeService from "../services/employee.service";


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        // width: '100%',
        // position: 'fixed',
        // marginTop: theme.spacing(3),

    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    employeesComponent:{
        // position: 'fixed',
        // marginTop: theme.spacing(1),
        // top: '60px',
        width: '100%',
        position: 'absolute',
        // top: '40px',
        // marginTop: theme.spacing(3),
      }
}))

const headCells = [
    { id: 'email', label: 'Email Address' },
    { id: 'fullName', label: 'Leader Name' },
    { id: 'department', label: 'Department' },
    { id: 'position', label: 'Position' },
    { id: 'actions', disableSorting: true }
]

export default function LeadersComponent() {

    const [records, setRecords] = useState(AuthService.getCurrentUser().managers)

    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [userManager, setUserManager ]=useState(AuthService.getCurrentUser().userManager)

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    useEffect(()=>{
        EmployeeService.getManagerRest()
        .then((response) =>{
            setUserManager(response)
        },
        error =>{
            setNotify({
                isOpen: true,
                message: EmployeeService.buildErrorNotification(error),
                type: "error"
            })
        })

        EmployeeService.getAllManagersRest()
        .then((response) =>{
            setRecords(response)
        },
        error =>{
            setNotify({
                isOpen: true,
                message: EmployeeService.buildErrorNotification(error),
                type: "error"
            })
        })
    },[])

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.email.toLowerCase().includes(target.value))
            }
        })
    }

    const chooseManager = (item) => {
        setUserManager(item)
        EmployeeService.chooseManagerRest(item)
        .then((response) => {
            setNotify(response)})
    }

    const deleteManager = () => {
        setUserManager(null)
        EmployeeService.deleteManagerRest()
        .then((response) => {
            setNotify(response)})

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
    }

    if(userManager){
        return(
            <>
            <Paper className={classes.pageContent}>
                <h4>Your manager</h4>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        <TableRow key={userManager.id}>
                            <TableCell>{userManager.email}</TableCell>
                            <TableCell>{userManager.fullName}</TableCell>
                            <TableCell>{userManager.department}</TableCell>
                            <TableCell>{userManager.position}</TableCell>
                            
                            <TableCell>
                            <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    onConfirm: () => {deleteManager() }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </TblContainer>
            </Paper>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            </>
        )
    }
    else
    return (
        <>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search manager by email"
                        className={classes.searchInput}
                        onChange={handleSearch}
                    />
                </Toolbar>

                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map((item, index )=>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>{item.position}</TableCell>
                                    
                                    <TableCell>

                                        <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { chooseManager(item) }}>
                                        <CheckCircleOutlineOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
