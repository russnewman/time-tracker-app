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
import { Container, Input, Paper, Typography, TextField, Select, Button, DialogContent, MenuItem, Grid } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { arrayIncludes } from '@material-ui/pickers/_helpers/utils';
import AddIcon from '@material-ui/icons/Add';
import { FormatColorResetRounded } from '@material-ui/icons';

const ERadio = withStyles({
  root: {
    // color: green[400],
    '&$checked': {
      color: '#00e572',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const NRadio = withStyles({
  root: {
    // color: green[400],
    '&$checked': {
      color: '#6a9bc3',
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
    marginTop: theme.spacing(3),
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
    fontWeight: '900'
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
    return url.replace('https://','')
}

function onlyEffective(rows){
    return rows.filter(row => row.type === 'effective')
}
function onlyNeutral(rows){
    return rows.filter(row => row.type === 'neutral')
}

function onlyIneffective(rows){
    return rows.filter(row => row.type === 'ineffective')
}


const items = [
    createData(processUrl('https://stackoverflow.com'), 'effective'),
    createData(processUrl('https://spring.io/'), 'effective'),
    createData(processUrl('https://www.google.com/'), 'neutral'),
    createData(processUrl('https://music.yandex.ru/'), 'neutral'),
    createData(processUrl('https://vk.com/feed'), 'ineffective'),
    createData(processUrl('https://www.youtube.com/'), 'ineffective')
]


export default function AcccessibleTable(props) {

    const subjectOfChange = props.subjectOfChange
    const timePeriod = props.timePeriod

    const classes = useStyles();

    const [rows, setRows] = React.useState(items)

    const [rowsPerPageEffective, setRowsPerPageEffective] = React.useState(5);
    const [pageEffective, setPageEffective] = React.useState(0);

    const [rowsPerPageNeutral, setRowsPerPageNeutral] = React.useState(5);
    const [pageNeutral, setPageNeutral] = React.useState(0);

    const [rowsPerPageIneffective, setRowsPerPageIneffective] = React.useState(5);
    const [pageIneffective, setPageIneffective] = React.useState(0);


    React.useEffect(() => {
        setRows(items);
      }, [items])
    
    const [openChangeDialog, setOpenChangeDialog] = React.useState(false);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);

    const [resourseName, setResourseName] = React.useState("")


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

  const openChangeTypeDialog = (resourseName) => {
    setResourseName(resourseName)
    setOpenChangeDialog(true)
  }

//   const openAddDialog = () => {
//       setOpenAddDialog(true)
//   }

  const updateRows = (rows, ind, newType) => {
      let row = rows[ind]
      row.type = newType
  }

  const handleAddClick = (event) =>{

  }

  return (
    <Container>
        {/* <Button  variant="outlined"  style={{marginTop:'8px', marginBottom:'8px', minWidth:'150px'}}>
            Add
        </Button> */}

        <div style={{align: 'right', display: 'flex'}}>
            <IconButton onClick={()=>setOpenAddDialog(true)}>
                <AddIcon style={{fontSize: '40px'}}/>
            </IconButton>
        </div>
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
                                        <Typography className="font-weight-bold">Effective resourses</Typography>

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
                                        <IconButton className={classes.editIcon} style={{marginRight:'8px'}} onClick={()=>{openChangeTypeDialog(row.resourse)}}>
                                            <CreateIcon style={{fontSize:'14px'}}/>
                                        </IconButton>
                                        {row.type === 'effective' && <a style={{color:'#00e572'}} href={row.resourse}>{processUrl(row.resourse)}</a>}
                                        {row.type === 'neutral' && <a style={{color:'steelblue'}} href={row.resourse}>{processUrl(row.resourse)}</a>}
                                        {row.type === 'ineffective' && <a style={{color:'crimson'}} href={row.resourse}>{processUrl(row.resourse)}</a>}
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
                                        <Typography className="font-weight-bold">Neutral resourses</Typography>
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
                                        <IconButton className={classes.editIcon} style={{marginRight:'8px'}} onClick={()=>{openChangeTypeDialog(row.resourse)}}>
                                            <CreateIcon style={{fontSize:'14px'}}/>
                                        </IconButton>
                                        {row.type === 'effective' && <a style={{color:'#00e572'}} href={row.resourse}>{processUrl(row.resourse)}</a>}
                                        {row.type === 'neutral' && <a style={{color:'steelblue'}} href={row.resourse}>{processUrl(row.resourse)}</a>}
                                        {row.type === 'ineffective' && <a style={{color:'crimson'}} href={row.resourse}>{processUrl(row.resourse)}</a>}
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
                                        <Typography className="font-weight-bold">Ineffective resourses</Typography>
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
                                        <IconButton className={classes.editIcon} style={{marginRight:'8px'}} onClick={()=>{openChangeTypeDialog(row.resourse)}}>
                                            <CreateIcon style={{fontSize:'14px'}}/>
                                        </IconButton>
                                        {row.type === 'effective' && <a style={{color:'#00e572'}} href={row.resourse}>{processUrl(row.resourse)}</a>}
                                        {row.type === 'neutral' && <a style={{color:'steelblue'}} href={row.resourse}>{processUrl(row.resourse)}</a>}
                                        {row.type === 'ineffective' && <a style={{color:'crimson'}} href={row.resourse}>{processUrl(row.resourse)}</a>}
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
        
        <ChangeResourseType rows={rows} resourseName={resourseName} subjectOfChange={subjectOfChange} open={openChangeDialog} onClose={handleCloseChangeDialog}/>
        <AddResourse rows={rows} open={openAddDialog} onClose={handleCloseAddDialog}></AddResourse> 
    </Container>
  );
}



function ChangeResourseType(props) {
  const classes = useStyles()
  let rows = props.rows
  let resourseName = props.resourseName
  const onClose = props.onClose
  const open = props.open
  const subjectOfChange = props.subjectOfChange


  const tmp =  rows.find(row => row.resourse === resourseName)
  const row = tmp ? tmp : ""

  const [type, setType] = React.useState(row)
  const [selectValue, setSelectValue] = React.useState('employee')

  React.useEffect(() => {
    setType(row.type);
  }, [row.type])


  const handleClose = () => {
    onClose();
    setType(row.type)
    setSelectValue('team')
  };

  const handleSave = () =>{
    handleClose()
    rows.map(item => {if (item.resourse === row.resourse) item.type = type})
  }

  const handleChange = (event) => {
    setType(event.target.value);
  };


  return (
    <div>
    <Dialog onClose={handleClose} fullWidth maxWidth='sm' aria-labelledby="simple-dialog-title" open={open} className={classes.dialog}>
      <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}><h3 style={{fontWeight: '500'}}>{processUrl(resourseName)}</h3></DialogTitle>
      <DialogContent className={classes.dialogContent}>

            <Container style={{ display: 'flex', flexDirection:'row', justifyContent: 'center'}}>
                {subjectOfChange == 1 && 
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
              }
                <RadioGroup  row aria-label="position" value={type} onChange={handleChange}>
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
    </div>
    );
  }




  function AddResourse(props) {
    const classes = useStyles()

    const onClose = props.onClose
    const open = props.open
    let rows = props.rows

    const [type, setType] = React.useState("")
    const [newResourse, setNewResourse] = React.useState("")

    
    const handleClose = () => {
        onClose()
        setType("")
    };
  
    const handleSave = () =>{
        if (type === 'effective' || type === 'neutral' || type === 'ineffective'){
            rows.push(
                {
                    resourse: newResourse,
                    type: type
                }
            )
        }
        onClose()
        setType("")
    }
  
    const handleTypeChange = (event) => setType(event.target.value)
    const handleResourseChange = (event) => setNewResourse(event.target.value)
    
  
  
    return (
      <div>
      <Dialog onClose={handleClose} fullWidth maxWidth='sm' aria-labelledby="simple-dialog-title" open={open} className={classes.dialog}>
        <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}><h3 style={{fontWeight: '500'}}>Add resourse</h3></DialogTitle>
        <DialogContent className={classes.dialogContent}>
  

            <Container style={{ display: 'flex', flexDirection:'row', justifyContent: 'center', marginBottom: '24px'}}>
                <TextField id="outlined-basic" label="Web resourse" style={{width: '330px'}} onChange={handleResourseChange}/>
            </Container>

              <Container style={{ display: 'flex', flexDirection:'row', justifyContent: 'center'}}>
                  

                  <RadioGroup  row aria-label="position" value={type} onChange={handleTypeChange}>
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
      </div>
      );
    }
  
  