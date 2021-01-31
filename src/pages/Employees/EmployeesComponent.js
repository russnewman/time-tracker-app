import React, { useState } from 'react'
import EmployeeForm from "./EmployeeForm";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import Notification from "../../components/employees/Notification";
import ConfirmDialog from "../../components/employees/ConfirmDialog";
import Popup from "../../components/employees/Popup";
import Controls from "../../components/employees/controls/Controls";
import useTable from "../../components/employees/useTable";
import AuthService from "../../services/auth.service"
import ManagerService from "../../services/manager.service";


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
    { id: 'fullName', label: 'Employee Name' },
    { id: 'email', label: 'Email Address' },
    { id: 'department', label: 'Department' },
    { id: 'position', label: 'Position' },
    { id: 'actions', disableSorting: true }

]

export default function EmployeesComponent() {

    let employeeArr = AuthService.getCurrentUser().userEmployees

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    // const [records, setRecords] = useState(employeeService.getAllEmployees())

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(employeeArr, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    const updateEmployee = (values) => {
        setOpenPopup(false)
        ManagerService.updateEmployeeInfo(values)
        .then((response)=>{
                setNotify({
                    isOpen: true,
                    message: response,
                    type: "success"
                })
                console.log("Response", response.data)
            },
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
            })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = email => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        ManagerService.deleteEmployee(email)
        .then((response)=>{
                setNotify({
                    isOpen: true,
                    message: response,
                    type: "success"
                })
                console.log("Response", response.data)
            },
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
            })
    }

    return (
        <>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search Employees"
                        className={classes.searchInput}
                        onChange={handleSearch}
                    />
                </Toolbar>

                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                    <TableCell>{item.position}</TableCell>
                                    <TableCell>

                                        {/* //Кнопка редактирования */}
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <InfoOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>

                                        {/* кнопка удаления */}
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>

                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>

            <Popup
                title="Employee full inforamtion"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm
                    recordForEdit={recordForEdit}
                    updateEmployee={updateEmployee} />
            </Popup>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            {/* </div> */}
        </>
    )
}
