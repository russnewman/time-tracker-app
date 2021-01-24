import React, { useState } from 'react'
import EmployeeForm from "./EmployeeForm";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import Notification from "../../components/employees/Notification";
import ConfirmDialog from "../../components/employees/ConfirmDialog";
// import PageHeader from "../../components/PageHeader";
import Popup from "../../components/employees/Popup";
import Controls from "../../components/employees/controls/Controls";
import * as employeeService from "../../services/employeeService";
import useTable from "../../components/employees/useTable";

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
    { id: 'city', label: 'City' },
    { id: 'actions', disableSorting: true }

    // { id: 'Email', label: 'Email Address' },
    // { id: 'First', label: 'First Name' },
    // { id: 'Last', label: 'Last Name' },
    // { id: 'Department', label: 'Department' },
    // { id: 'City', label: 'City' },
    // { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function EmployeesComponent() {

    let data1 = {
        id: 1, 
        fullName: "Максим Алексеенко", 
        email: "alekseenko.md@phystech.edu", 
        department: "Development",
        city: "Королёв",
        mobile: "1234567890", 
        gender: "male",
        hireDate: "2021-01-21T05:45:16.309Z",
    }
    let data2 = {
        id: 1, 
        fullName: "Алексей Иванов", 
        email: "kdflksjdl", 
        mobile: "1234567890", 
        city: "Moscow",
        gender: "male",
        department: "HR",
        hireDate: "2021-01-21T05:45:16.309Z",
    }

    let employeeArr = []
    employeeArr.push(data1)
    employeeArr.push(data2)

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(employeeService.getAllEmployees())

    // console.log(arr)
    // console.log(records)
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

    const addOrEdit = (employee, resetForm) => {
        if (employee.id == 0)
            employeeService.insertEmployee(employee)
        else
            employeeService.updateEmployee(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    return (
        <>
            {/* <div className={classes.employeesComponent}> */}
            <Paper className={classes.pageContent}>

                {/* //Search and add new  */}
                <Toolbar>
                    <Controls.Input
                        label="Search Employees"
                        className={classes.searchInput}
                        // InputProps={{
                        //     startAdornment: (<InputAdornment position="start">
                        //         <Search />
                        //     </InputAdornment>)
                        // }}
                        onChange={handleSearch}
                    />
                    {/* <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    /> */}
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
                                    <TableCell>{item.city}</TableCell>
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
                    addOrEdit={addOrEdit} />
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
