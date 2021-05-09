import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from  '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { Container, Input, Paper, Typography, TextField,  Toolbar, Fab, Select, Button, DialogContent, MenuItem, Grid } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { arrayIncludes } from '@material-ui/pickers/_helpers/utils';
import AddIcon from '@material-ui/icons/Add';
import { FormatColorResetRounded } from '@material-ui/icons';
import ResourcesService from '../../services/resources.service'
import Notification from "../employees/Notification"


// '#d90368', '#f5cc00', '#00cc99', '#bcb8b1' 

const ERadio = withStyles({
  root: {
    // color: green[400],
    '&$checked': {
      color: '#00cc99',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const NRadio = withStyles({
  root: {
    // color: green[400],
    '&$checked': {
      color: '#f5cc00',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);



const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: '650',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(3),
    // marginTop: theme.spacing(3),
    boxShadow: "0px 2px 12px rgba(10, 1, 20, 0.3)",
    borderRadius: "15px",
  },
  paperSmall:{
    width: '70%',
    // marginBottom: theme.spacing(3),
    // marginTop: theme.spacing(3),
    // boxShadow: "0px 5px 12px rgba(10, 1, 50, 0.3)",
    // borderRadius: "20px",
  },
  appBar:{
    background: '#38023b',
    position: 'relative',
    marginBottom: theme.spacing(3)
  },
  editIcon: {
    fontSize:'10px'      
  },
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5),
    minWidth: '100px'
  },
  dialogTitle: {
    textAlign: 'center',
    fontWeight: '900',
    backgroundColor: '#38023b',
    color: 'white'
  },
  dialogContent: {
    // textAlign: 'center',
    margin: 'auto',
    padding: "auto",
},
dialogAction: {
    justifyContent: 'center'
},
}));


function createData(resourse, type) {
  return { 
        resourse: resourse, 
        type: type
    };
}


function processUrl(url){
    return url.replace('https://','').replace('http://')
}

function extractResourceName(url){
  let str = processUrl(url)
  if (str.indexOf("/") > 0){
    return str.substring(0, str.indexOf("/"))
  }
  return str
}

function onlyEffective(rows){
    console.log("ROWSSS", rows)
    return rows.filter(row => row.category === 'effective')
}
function onlyNeutral(rows){
    return rows.filter(row => row.category === 'neutral')
}

function onlyIneffective(rows){
    return rows.filter(row => row.category === 'ineffective')
}

export default function AcccessibleTable(props) {

    const employee = props.employee
    const closeMainDialog = props.onMainDialogClose

    const classes = useStyles();
    const [rows, setRows] = React.useState([])

    const [rowsPerPageEffective, setRowsPerPageEffective] = React.useState(5);
    const [pageEffective, setPageEffective] = React.useState(0);

    const [rowsPerPageNeutral, setRowsPerPageNeutral] = React.useState(5);
    const [pageNeutral, setPageNeutral] = React.useState(0);

    const [rowsPerPageIneffective, setRowsPerPageIneffective] = React.useState(5);
    const [pageIneffective, setPageIneffective] = React.useState(0);

    const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' })



    React.useEffect(() => {
      ResourcesService.getResourcesWithCategoryForEmployee(employee.id).then(
        response => {
          setRows(response.data);
        }
      )
      .catch(error => {
        setNotify(ResourcesService.buildErrorNotification(error, ""))
      })
      }, [])

    
    const [openChangeDialog, setOpenChangeDialog] = React.useState(false);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);

    // React.useEffect(() => {
    //   setOpenAddDialog(props.openAddDialog);
    // }, [props.openAddDialog])

    const [hostName, setHostName] = React.useState("")


  const handleChangePageEffective = (event, newPage) =>setPageEffective(newPage);
  const handleChangePageNeutral = (event, newPage) => setPageNeutral(newPage);
  const handleChangePageIneffective = (event, newPage) => setPageIneffective(newPage);

  const handleChangeRowsPerPageEffective = (event) => {
    setRowsPerPageEffective(parseInt(event.target.value, 10));
    setPageEffective(0);
  };
  const handleChangeRowsPerPageNeutral = (event) => {
    setRowsPerPageNeutral(parseInt(event.target.value, 10));
    setPageNeutral(0);
  };

  const handleChangeRowsPerPageIneffective = (event) => {
    setRowsPerPageIneffective(parseInt(event.target.value, 10));
    setPageIneffective(0);
  };

  const handleCloseChangeDialog = (value) => {
    setOpenChangeDialog(false);
  };

  const handleCloseAddDialog = (value) => {
      setOpenAddDialog(false)
  }

  const openChangeTypeDialog = (hostName) => {
    setHostName(hostName)
    setOpenChangeDialog(true)
  }

  return (
    <div>
    <AppBar className={classes.appBar}>
      <Toolbar>
        {/* <IconButton edge="start" color="inherit" onClick={()=>{closeMainDialog()}} style={{marginLeft: '112px', marginRight: '32px'}}>
          <CloseIcon />
        </IconButton> */}
        <IconButton edge="start" color="inherit" onClick={()=>setOpenAddDialog(true)} style={{marginLeft: '112px', marginRight: '32px'}}>
          <AddIcon style={{fontSize: '30px'}}/>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {employee.fullName}
        </Typography>
        <div style={{ float: 'right', display: 'flex', marginLeft: 'auto', marginRight: '112px'}}>
          {/* <IconButton size="small" color = "secondary" onClick={()=>setOpenAddDialog(true)} >
              <AddIcon style={{fontSize: '30px'}}/>
          </IconButton> */}
          <IconButton size="small" color = "secondary" onClick={()=>{closeMainDialog()}}>
            <CloseIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>

    <Container>
        {/* <Button  variant="outlined"  style={{marginTop:'8px', marginBottom:'8px', minWidth:'150px'}}>
            Add
        </Button> */}
        {/* <div style={{ float: 'right'}}>
            <IconButton onClick={()=>setOpenAddDialog(true)}>
                <AddIcon style={{fontSize: '30px'}}/>
            </IconButton>
        </div> */}
        <Grid container spacing={4}>
            <Grid item md={4} sm={6} xs={12}>
                <Paper className={classes.paper}>
                <TableContainer>
                    <Table  className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{paddingLeft:'60px', justifyContent: 'space-between', display: 'flex'}}>
                                        <Typography className="font-weight-bold">Effective resources</Typography>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {(rowsPerPageEffective > 0
                            ? onlyEffective(rows).slice(pageEffective * rowsPerPageEffective, pageEffective * rowsPerPageEffective + rowsPerPageEffective)
                            : onlyEffective(rows)
                            ).map((row, index) => (
                            <TableRow key={row.name}>
                                <TableCell>
                                    <div>
                                        <IconButton className={classes.editIcon} style={{marginRight:'8px'}} onClick={()=>{openChangeTypeDialog(row.host)}}>
                                            <CreateIcon style={{fontSize:'14px'}}/>
                                        </IconButton>
                                        {row.category === 'effective' && <a style={{color:'#00cc99'}} href={'//' + row.host}>{processUrl(row.host)}</a>}

                                    </div>                                                         
                                </TableCell>
                            </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {onlyEffective(rows).length > 5 && <TablePagination
                        rowsPerPageOptions={[5, 25, 100]}
                        component="div"
                        count={onlyEffective(rows).length}
                        rowsPerPage={rowsPerPageEffective}
                        page={pageEffective}
                        onChangePage={handleChangePageEffective}
                        onChangeRowsPerPage={handleChangeRowsPerPageEffective}
                    />
                }
                </Paper>

            </Grid>
            <Grid item md={4} sm={6} xs={12} >

                <Paper className={classes.paper}>
                <TableContainer>
                    <Table  className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{paddingLeft:'60px'}}>
                                        <Typography className="font-weight-bold">Neutral resources</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {(rowsPerPageNeutral > 0
                            ? onlyNeutral(rows).slice(pageNeutral * rowsPerPageNeutral, pageNeutral * rowsPerPageNeutral + rowsPerPageNeutral)
                            : onlyNeutral(rows)
                            ).map((row, index) => (
                            <TableRow key={row.name}>
                                <TableCell>
                                    <div>
                                        <IconButton className={classes.editIcon} style={{marginRight:'8px'}} onClick={()=>{openChangeTypeDialog(row.host)}}>
                                            <CreateIcon style={{fontSize:'14px'}}/>
                                        </IconButton>
                                        {/* {row.type === 'effective' && <a style={{color:'#00e572'}} href={row.resourse}>{processUrl(row.resourse)}</a>} */}
                                        {row.category === 'neutral' && <a style={{color:'#f5cc00'}} href={'//' + row.host}>{processUrl(row.host)}</a>}
                                        {/* {row.type === 'ineffective' && <a style={{color:'crimson'}} href={row.resourse}>{processUrl(row.resourse)}</a>} */}
                                    </div>                                                         
                                </TableCell>
                            </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {onlyNeutral(rows).length > 5 && <TablePagination
                        rowsPerPageOptions={[5, 25, 100]}
                        component="div"
                        count={onlyNeutral(rows).length}
                        rowsPerPage={rowsPerPageNeutral}
                        page={pageNeutral}
                        onChangePage={handleChangePageNeutral}
                        onChangeRowsPerPage={handleChangeRowsPerPageNeutral}
                    />}
                </Paper>
            </Grid>
            
            <Grid item md={4} sm={6} xs={12} >
                <Paper className={classes.paper}>
                <TableContainer>
                    <Table  className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{paddingLeft:'60px'}}>
                                        <Typography className="font-weight-bold">Ineffective resources</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {(rowsPerPageIneffective > 0
                            ? onlyIneffective(rows).slice(pageIneffective * rowsPerPageIneffective, pageIneffective * rowsPerPageIneffective + rowsPerPageIneffective)
                            : onlyIneffective(rows)
                            ).map((row, index) => (
                            <TableRow key={row.name}>
                                <TableCell>
                                    <div>
                                        <IconButton className={classes.editIcon} style={{marginRight:'8px'}} onClick={()=>{openChangeTypeDialog(row.host)}}>
                                            <CreateIcon style={{fontSize:'14px'}}/>
                                        </IconButton>
                                        
                                        {/* {row.type === 'effective' && <a style={{color:'#00e572'}} href={row.resourse}>{processUrl(row.resourse)}</a>}
                                        {row.type === 'neutral' && <a style={{color:'steelblue'}} href={row.resourse}>{processUrl(row.resourse)}</a>} */}
                                        {row.category === 'ineffective' && <a style={{color:'#d90368'}} href={'//' + row.host}>{processUrl(row.host)}</a>}
                                    </div>                                                         
                                </TableCell>
                            </TableRow>

                            ))}
                            {/* {emptyRows > 0 && (
                            <TableRow >
                            <TableCell colSpan={6}/>
                            </TableRow>
                                )} */}
                        </TableBody>
                    </Table>
                </TableContainer>
                {onlyIneffective(rows).length > 5 &&<TablePagination
                        rowsPerPageOptions={[5, 25, 100]}
                        component="div"
                        count={onlyIneffective(rows).length}
                        rowsPerPage={rowsPerPageIneffective}
                        page={pageIneffective}
                        onChangePage={handleChangePageIneffective}
                        onChangeRowsPerPage={handleChangeRowsPerPageIneffective}
                    />
                }
                </Paper>
            </Grid>
        </Grid>
        
        <ChangeResourseType employeeId={employee.id} rows={rows} hostName={hostName} open={openChangeDialog} onClose={handleCloseChangeDialog}/>
        <AddResourse employeeId={employee.id} rows={rows} open={openAddDialog} onClose={handleCloseAddDialog}></AddResourse> 
        <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
    </Container>
    </div>
  );
}



function ChangeResourseType(props) {
  const classes = useStyles()

  const employeeId = props.employeeId
  let rows = props.rows
  let hostName = props.hostName
  const onClose = props.onClose
  const open = props.open
  // const subjectOfChange = props.subjectOfChange


  const tmp =  rows.find(row => row.host === hostName)
  const row = tmp ? tmp : ""

  const [category, setCategory] = React.useState(row)
  const [selectValue, setSelectValue] = React.useState('employee')
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' })


  React.useEffect(() => {
    setCategory(row.category);
  }, [row.category])


  const handleClose = () => {
    onClose();
    setCategory(row.category)
    setSelectValue('team')
  };

  const handleSave = () =>{
    handleClose()
    rows.map(item => {if (item.host === row.host) item.category = category})
    console.log("{QWPE{")
    ResourcesService.updateResource(employeeId, selectValue, row.host, category)
    .catch(error => {
      const message = "Data will not be saved."
        setNotify(ResourcesService.buildErrorNotification(error, message))
    })
  }
  const handleChange = (event) => {
    setCategory(event.target.value);
  };


  return (
    <div>
    <Dialog onClose={handleClose} fullWidth maxWidth='sm' aria-labelledby="simple-dialog-title" open={open} className={classes.dialog}>
      <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}><h5 style={{fontWeight: '600'}}>{processUrl(hostName)}</h5></DialogTitle>
      <DialogContent className={classes.dialogContent}>

            <Container style={{ display: 'flex', flexDirection:'row', justifyContent: 'center'}}>
                
                <div style={{width: '56px', marginRight: '96px', marginTop:'6px'}}>
                  <Select
                        value={selectValue}
                        onChange={e => setSelectValue(e.target.value)}
                        input={
                          <Input
                            disableUnderline
                            classes={{ input: classes.selectInput }}
                          />
                        }
                      >
                    <MenuItem value="team">All team</MenuItem>
                    <MenuItem value="employee">This employee</MenuItem>
                  </Select>
                </div>
              
                <RadioGroup  row aria-label="position" value={category} onChange={handleChange}>
                  <FormControlLabel value="effective" control={<ERadio/>} label="Effective" />
                  <FormControlLabel value="neutral" control={<NRadio/>} label="Neutral" />
                  <FormControlLabel value="ineffective" control={<Radio/>} label="Ineffective" />
                </RadioGroup>
            </Container>
            <div style={{justifyContent: 'center', display: 'flex'}}>
                <Button 
                        // type="submit"
                        variant="outlined"
                        // color="secondary" 
                        style={{width:"96px", marginTop: "24px", marginBottom: '8px'}} 
                        onClick={handleSave}>
                        Save
                </Button>
            </div>
      </DialogContent>
    </Dialog>
    <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
    </div>
    );
  }


  function AddResourse(props) {
    const classes = useStyles()

    const employeeId = props.employeeId
    const onClose = props.onClose
    const open = props.open
    let rows = props.rows

    const [category, setCategory] = React.useState("")
    const [newUrl, setNewUrl] = React.useState("")
    
    const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' })


    
    const handleClose = () => {
        onClose()
        setCategory("")
    };
  
    const handleSave = () =>{
        if (category === 'effective' || category === 'neutral' || category === 'ineffective' && newUrl != ""){
            rows.push(
                {
                    host: extractResourceName(newUrl),
                    category: category
                }
            )
            ResourcesService.addResource(employeeId, "employee", newUrl, category)
            .catch(error => {
              const message = "Data will not be saved."
                setNotify(ResourcesService.buildErrorNotification(error, message))
            })
        }
        onClose()
        setCategory("")
    }
  
    const handleTypeChange = (event) => setCategory(event.target.value)
    const handleUrlChange = (event) => setNewUrl(event.target.value)
    
  
    return (
      <div>
      <Dialog onClose={handleClose} fullWidth maxWidth='sm' aria-labelledby="simple-dialog-title" open={open} className={classes.dialog}>
        <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}><h5 style={{fontWeight: '600'}}>Add resource</h5></DialogTitle>
        <DialogContent className={classes.dialogContent}>
  

            <Container style={{ display: 'flex', flexDirection:'row', justifyContent: 'center', marginBottom: '24px'}}>
                <TextField id="outlined-basic" label="Web resourse" style={{width: '330px'}} onChange={handleUrlChange}/>
            </Container>

              <Container style={{ display: 'flex', flexDirection:'row', justifyContent: 'center'}}>
                  

                  <RadioGroup  row aria-label="position" value={category} onChange={handleTypeChange}>
                    <FormControlLabel value="effective" control={<ERadio/>} label="Effective" />
                    <FormControlLabel value="neutral" control={<NRadio/>} label="Neutral" />
                    <FormControlLabel value="ineffective" control={<Radio/>} label="Ineffective" />
                  </RadioGroup>
              </Container>
              <div style={{justifyContent: 'center', display: 'flex'}}>
                  <Button 
                          variant="outlined"
                          style={{width:"96px", marginTop: "24px", marginBottom: '8px'}} 
                          onClick={handleSave}>
                          Save
                  </Button>
              </div>
        </DialogContent>
      </Dialog>
      <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
      </div>
      );
    }
  
  