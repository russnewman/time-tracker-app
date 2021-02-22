import React, { useState, useEffect } from 'react'
import EmployeeForm from "./EmployeeForm";
import { Paper, makeStyles, TableBody, TableRow, TableCell, TextField} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import Dialog from '@material-ui/core/Dialog';

import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

import Notification from "../../components/employees/Notification";
import ConfirmDialog from "../../components/employees/ConfirmDialog";
import Popup from "../../components/employees/Popup";
import Controls from "../../components/employees/controls/Controls";
import AuthService from "../../services/auth.service"
import ManagerService from "../../services/manager.service";
import SitesAllTime from "../../components/Dashboard/SitesAllTime"

import WebAssetIcon from '@material-ui/icons/WebAsset';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        // padding: theme.spacing(3),
        boxShadow: "0px 5px 12px rgba(10, 1, 50, 0.3)",
        borderRadius: "25px",
    },
    root: {
        width: '100%',
      },
      paper: {
        width: '100%',
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
        boxShadow: "0px 5px 12px rgba(10, 1, 50, 0.3)",
        borderRadius: "25px",
      },
      table: {
        minWidth: 750,
      },
    appBar: {
        position: 'relative',
      },
      title: {
        marginLeft: theme.spacing(2),
        flex: 1,
      },
    searchInput: {
        width: '176px',
        paddingLeft: '48px',
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
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
}))

const headCells = [
    { id: 'fullName', alignRight: false, disablePadding: true, label: 'Employee Name'},
    { id: 'email', alignRight: false, disablePadding: false, label: 'Email Adress' },
    { id: 'department', alignRight: false, disablePadding: false, label: 'Department'},
    { id: 'position', alignRight: false, disablePadding: false, label: 'Position' },
    { id: 'actions', alignRight: false, disablePadding: false, label: 'Actions' },
  ];



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
function getComparator(order, orderBy) {
return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
const stabilizedThis = array.map((el, index) => [el, index]);
stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
});
return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
    const { classes, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.alignRight ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                <Typography className="font-weight-bold">{headCell.label}</Typography>
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }



export default function EmployeesComponent() {


    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)

    const [rows, setRows] = useState(AuthService.getCurrentUser().employees)


    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [openSitesDialog, setOpenSitesDialog] = useState(false)
    const [employee, setEmployee] = useState(null)
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };
    
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    
    useEffect(()=>{
        ManagerService.getEmployeesRest()
        .then((response) =>{        
            console.log("ASd",response.status)
            setRows(response)
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

    const updateEmployee = (employeeInfo) => {
        setOpenPopup(false)
        setRows(ManagerService.updateEmployeeInfo(employeeInfo))
        ManagerService.updateEmployeeInfoRest(employeeInfo)
        .then((response) => {
            setNotify(response)})
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = employeeId => {

        setRows(ManagerService.deleteEmployee(employeeId))
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        ManagerService.deleteEmployeeRest(employeeId)
        .then((response) => {
            setNotify(response)})
    }

    const handleCloseSitesDialog = () => {
        setOpenSitesDialog(false);
    };


return(
    <div style={{paddingRight: '32px', paddingLeft:'32px'}}>
        <Paper className={classes.pageContent}>
            <TextField style={{width: '27%', marginLeft: '48px', marginBottom: '16px', marginTop: '16px'}} label="Search employee" onChange={handleSearch}>
            </TextField>
            <div className={classes.root}>
                <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />


                    <TableBody>
                    {stableSort(filterFn.fn(rows), getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                            <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.fullName}
                            >
                            <TableCell padding="checkbox">
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                {row.fullName}
                            </TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.department}</TableCell>
                            <TableCell>{row.position}</TableCell>
                            <TableCell>

                                                <Controls.ActionButton
                                                    color="primary"
                                                    onClick={() => { openInPopup(row)}}>
                                                    <InfoOutlinedIcon fontSize="small" />
                                                </Controls.ActionButton>

                                                <Controls.ActionButton
                                                    color="primary"
                                                    onClick={() => { setOpenSitesDialog(true)
                                                    setEmployee(row) }}>
                                                    <WebAssetIcon fontSize="small" />
                                                </Controls.ActionButton>

                                                <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    onConfirm: () => { onDelete(row.id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                </TableCell>
                            </TableRow>
                        );
                        })}
                    {/* {emptyRows > 0 && (
                        <TableRow >
                        <TableCell colSpan={6} />
                        </TableRow>
                    )} */}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
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
        <SitesDialog open={openSitesDialog} employee={employee} onClose={handleCloseSitesDialog}/>
    </div>
    )
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
function SitesDialog(props) {

    const open = props.open
    const onClose = props.onClose
    const employee = props.employee
    
    const handleClose = () => {
      onClose()
    };
  
    return (
      <div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <SitesAllTime onMainDialogClose={handleClose} employee={employee}/>
        </Dialog>
      </div>
    );
  }
