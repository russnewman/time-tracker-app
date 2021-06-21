import React, { useState, useEffect } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Typography, TextField} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

import Notification from "../components/employees/Notification";
import ConfirmDialog from "../components/employees/ConfirmDialog";
import Controls from "../components/employees/controls/Controls";
import useTable from "../components/employees/useTable";
import AuthService from "../services/auth.service"
import EmployeeService from "../services/employee.service";


import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        boxShadow: "0px 5px 12px rgba(10, 1, 50, 0.3)",
        borderRadius: "25px",
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
        width: '100%',
        position: 'absolute',
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
}))



const headCells = [
    { id: 'email', alignRight: false, disablePadding: true, label: 'Email' },
    { id: 'fullName', alignRight: false, disablePadding: false, label: 'Имя руководителя'},
    { id: 'department', alignRight: false, disablePadding: false, label: 'Департамент'},
    { id: 'position', alignRight: false, disablePadding: false, label: 'Позиция' },
    { id: 'action', alignRight: false, disablePadding: false, label: '' },
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




export default function LeadersComponent() {

    const [rows, setRows] = useState(AuthService.getCurrentUser().managers)

    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [userManager, setUserManager ]=useState(AuthService.getCurrentUser().userManager)
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(rows, headCells, filterFn);




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
            setRows(response)
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
            <Typography style={{paddingLeft: '64px', paddingTop: '24px', paddingBottom: '24px'}} variant="h4">Ваш руководитель</Typography>

                <div className={classes.root}>
                    <TableContainer>

                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox"></TableCell>
                                <TableCell><Typography className="font-weight-bold">Email</Typography></TableCell>
                                <TableCell><Typography className="font-weight-bold">Полное имя</Typography></TableCell>
                                <TableCell><Typography className="font-weight-bold">Департамент</Typography></TableCell>
                                <TableCell><Typography className="font-weight-bold">Позиция</Typography></TableCell>
                                <TableCell><Typography className="font-weight-bold"></Typography></TableCell>


                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow key={userManager.id}>
                                <TableCell padding="checkbox"></TableCell>
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
                                                        title: 'Уверены что хотите удалить?',
                                                        onConfirm: () => {deleteManager() }
                                                    })
                                                }}>
                                                <CloseIcon fontSize="small" />
                                            </Controls.ActionButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
            </Paper>

            {/* <Paper className={classes.pageContent}>
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
            </Paper>  */}
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
        <div style={{paddingRight: '32px', paddingLeft:'32px'}}>
            <Paper className={classes.pageContent}>
                <TextField style={{width: '27%', marginLeft: '48px', marginBottom: '16px', marginTop: '16px'}} label="Поиск" onChange={handleSearch}>
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
                            .map((item, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={item.fullName}
                                >
                                <TableCell padding="checkbox">
                                </TableCell>
                                <TableCell component="th" id={labelId} scope="row" padding="none">
                                    {item.email}
                                </TableCell>
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
                                </TableRow>
                            );
                            })}
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
        </div>




            {/* <Paper className={classes.pageContent}>
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
            </Paper> */}

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
