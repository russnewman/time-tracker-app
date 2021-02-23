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
import { Container, Input, Paper, Typography, Select, DialogActions, Button, DialogContent, MenuItem } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import DialogContentText from '@material-ui/core/DialogContentText';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ByHoursChart from './Employee/byHoursChart'
import KeyboardOutlinedIcon from '@material-ui/icons/KeyboardOutlined';


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
    boxShadow: "0px 5px 12px rgba(10, 1, 50, 0.3)",
    borderRadius: "20px",
  },
  paperSmall:{
    width: '70%',
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    boxShadow: "0px 5px 12px rgba(10, 1, 50, 0.3)",
    borderRadius: "20px",
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


function createDataMemberDay(resourse, duration, startTime, endTime, activity, type, keylog) {
  return { 
    resourse: resourse, 
    duration: minutesToHours(duration), 
    startTime: startTime, 
    endTime: endTime, 
    activityRate: computeActivityRate(activity, duration),
    activity: minutesToHours(activity),
    type: type, 
    keylog: keylog
    };
}

function createData(resourse, duration, activity, type) {
  return { 
    resourse: resourse, 
    duration: minutesToHours(duration), 
    activityRate: computeActivityRate(activity, duration),
    activity: minutesToHours(activity),
    type: type
    };
}


function computeActivityRate(activeMinutes, duration){
    if (duration === 0) return "0%"
    return Math.round(activeMinutes/duration * 100) + '%'
}

function minutesToHours(minutes){
    const hours = Math.floor(minutes/60)
    const min = minutes % 60
    if (hours != 0){
        if (min != 0) return  hours+ 'h ' + minutes%60 + 'm'
        return hours+'h'
    }
    return minutes%60+'m'
}   


function processUrl(url){
  if(url) return url.replace('https://','')
  return
}

const keylogs = [
  'Raindrops Keep Fallin On My Head - Perry Como',
  'Cras mattis consectetur purus sit amet fermentum.\n' +
  'Cras justo odio, dapibus ac facilisis in, egestas eget quam.\n' +
  'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.' +
  'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
  'CTRL+C CTRL+V',
  'Sometheng interesting',
  'вк'
]

const itemsDayMember = [
  createDataMemberDay('https://music.yandex.ru/home', 159, 15.31, 18.00, 130, 'neutral', keylogs[0]),
  createDataMemberDay('https://spring.io/', 2, 11.11, 11.13, 1, 'effective'),
  createDataMemberDay('https://www.google.com/', 22, 15.40, 16.02, 14,'neutral', keylogs[4]),
  createDataMemberDay('https://spring.io/', 2, 11.11, 11.13, 1, 'effective'),
  createDataMemberDay('https://www.youtube.com/', 22, 15.40, 16.02, 14,'ineffective', keylogs[3]),
  createDataMemberDay('https://spring.io/', 2, 11.11, 11.13, 1, 'effective'),
  createDataMemberDay('https://vk.com/feed', 22, 15.40, 16.02, 14,'ineffective', keylogs[1])
];

const itemsWeekMember = [
  createData('https://music.yandex.ru/home', 559,  130, 'neutral'),
  createData('https://spring.io/', 534,  1, 'effective'),
  createData('https://www.youtube.com/', 22, 14,'ineffective'),
  createData('https://www.w3.org/', 123, 100, 'effective'),
  createData('https://ru.reactjs.org/', 14, 11, 'effective'),
  createData('https://angular.io/', 99, 50, 'effective'),
  createData('https://vk.com/feed', 156, 140, 'ineffective')
];


const itemsDayTeam = [
  createData('https://www.google.com/', 145, 130, 'neutral'),
  createData('https://stackoverflow.com/', 559,  530, 'effective'),
  createData('https://spring.io/', 534,  320, 'effective'),
  createData('https://www.youtube.com/', 22, 14,'ineffective'),
  createData('https://music.yandex.ru/', 123, 100, 'neutral'),
  createData('https://ru.reactjs.org/', 14, 11, 'effective'),
  createData('https://angular.io/', 99, 50, 'effective'),
  createData('https://vuejs.org/', 340, 298, 'effective'),
  createData('https://vk.com/feed', 156, 140, 'ineffective')
]


const itemsWeekTeam = [
  createData('https://www.google.com/', 8845, 1130, 'neutral'),
  createData('https://stackoverflow.com/', 1559,  1430, 'effective'),
  createData('https://spring.io/', 4534,  1320, 'effective'),
  createData('https://www.youtube.com/', 1222, 1214,'ineffective'),
  createData('https://music.yandex.ru/', 2223, 1200, 'neutral'),
  createData('https://ru.reactjs.org/', 124, 111, 'effective'),
  createData('https://angular.io/', 2999, 1500, 'effective'),
  createData('https://vuejs.org/', 340, 298, 'effective'),
  createData('https://vk.com/feed', 990, 740, 'ineffective')
]



export default function AcccessibleTable(props) {

  const subjectOfChange = props.subjectOfChange
  const timePeriod = props.timePeriod
  let items

  if (subjectOfChange === 1 && timePeriod === 1) items = itemsDayMember
  else if (subjectOfChange === 1 && timePeriod === 2) items = itemsWeekMember
  else if (subjectOfChange === 2 && timePeriod === 1) items = itemsDayTeam
  else if (subjectOfChange === 2 && timePeriod === 2) items = itemsWeekTeam

  const [rows, setRows] = React.useState(items)
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);



  //////////////////////////////////////////
  const [row, setRow] = React.useState('')


  const [open, setOpen] = React.useState(false);
  const [openKeylog, setOpenKeylog] = React.useState(false);
  // const [resourseName, setResourseName] = React.useState("");
  // const [type, setType] = React.useState("");
  const [ind, setInd] = React.useState(0);
  const classes = useStyles();
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


  React.useEffect(() => {
    setRows(items);
  }, [items])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseKeylog = () => {
    setOpenKeylog(false)
  }

  const openDialog = (row, ind) => {
    setInd(ind)
    // setResourseName(row.resourse)
    // setType(row.type)
    setOpen(true)
  }

  const openKeylogDialog = (row) =>{
    setRow(row)
    setOpenKeylog(true)
  }

  const updateRows = (rows, ind, newType) => {
      let row = rows[ind]
      row.type = newType
  }

  return (
    <div>
        {(subjectOfChange === 1 && timePeriod === 1) &&
        <div style={{display: 'flex', justifyContent: 'center', paddingLeft: '64px', paddingRight: '64px'}}>
            <Paper className={classes.paper}>
              {/* <Typography>Hello</Typography> */}
                  <ByHoursChart/>
            </Paper>
        </div>
        }
        <div style={{display: 'flex', justifyContent: 'center', paddingLeft: '64px', paddingRight: '64px'}}>
            <Paper className={timePeriod === 1 && subjectOfChange === 1 ? classes.paper : classes.paperSmall}>
                <TableContainer>
                <Table  className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table">
                    <TableHead>
                    <TableRow>
                        {/* <TableCell padding="checkbox">
                        </TableCell> */}
                        <TableCell style={{paddingLeft:'60px'}}>
                            <Typography className="font-weight-bold">Web resourse</Typography>
                            </TableCell>
                        <TableCell align="right"><Typography className="font-weight-bold">Duration</Typography></TableCell>
                        {timePeriod === 1 && subjectOfChange === 1 && <TableCell align="right"><Typography className="font-weight-bold">Start time</Typography></TableCell>}
                        {timePeriod === 1 && subjectOfChange === 1 && <TableCell align="right"><Typography className="font-weight-bold">End time</Typography></TableCell>}
                        <TableCell align="right"><Typography className="font-weight-bold">Activity</Typography></TableCell>
                        {timePeriod === 1 && subjectOfChange === 1 && <TableCell align="right"><Typography className="font-weight-bold">Keylogger</Typography></TableCell>}
                    </TableRow>
                    </TableHead>



                    <TableBody>
                    {(rowsPerPage > 0
                          ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          : rows
                        ).map((row, index) => (
                        <TableRow key={row.name}>
                        <TableCell>
                            <div>
                                <IconButton className={classes.editIcon} style={{marginRight:'8px'}} onClick={()=>{openDialog(row, index)}}>
                                    <CreateIcon style={{fontSize:'14px'}}/>
                                </IconButton>
                                {row.type === 'effective' && <a style={{color:'#00e572'}} href={row.resourse}>{processUrl(row.resourse)}</a>}
                                {row.type === 'neutral' && <a style={{color:'steelblue'}} href={row.resourse}>{processUrl(row.resourse)}</a>}
                                {row.type === 'ineffective' && <a style={{color:'crimson'}} href={row.resourse}>{processUrl(row.resourse)}</a>}
                            </div>                                                         
                        </TableCell>
                        <TableCell align="right">

                            {row.duration}
                            </TableCell>
                        {timePeriod === 1 && subjectOfChange === 1 && <TableCell align="right">{row.startTime}</TableCell>}
                        {timePeriod === 1 && subjectOfChange === 1 && <TableCell align="right">{row.endTime}</TableCell>}
                          <TableCell align="right">
                            <Typography style={{display: 'inline-block', fontWeight:'500'}} >{row.activityRate}</Typography>
                            <Typography className="text-black-50" style={{fontSize:'11px'}} >{row.activity}</Typography>
                          {/* {row.activity} */}
                          </TableCell>

                          {timePeriod === 1 && subjectOfChange === 1 && 
                            <TableCell align="right">
                              {row.keylog && 
                                <IconButton onClick={()=>{openKeylogDialog(row)}}>
                                  <KeyboardOutlinedIcon/>
                                </IconButton>
                              }
                            </TableCell>

                          }
                        </TableRow>

                    ))}
                {emptyRows > 0 && (
                <TableRow >
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
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
                </Paper>

               <ChangeResourseType rows={rows} ind={ind} subjectOfChange={subjectOfChange} open={open} onClose={handleClose}/> 
               {(subjectOfChange === 1 && timePeriod === 1) && <KeyloggerDialog row={row} open={openKeylog} onClose={handleCloseKeylog}/>}

       </div> 
    </div>
  );
}



function ChangeResourseType(props) {
  const classes = useStyles()
  let rows = props.rows
  let ind = props.ind
  const onClose = props.onClose
  const open = props.open
  const subjectOfChange = props.subjectOfChange

  let row = rows[ind]
  // let row = props.row
  const resourseName = row.resourse

  const [type, setType] = React.useState(row.type)
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



function KeyloggerDialog(props){


  const onClose = props.onClose
  const open = props.open
  const row = props.row
  console.log('Row', row)
  // const resourse = props.resourse
  // const startTime = props.startTime
  // const EndTime = props.endTime

  const [scroll, setScroll] = React.useState('paper');



  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  const handleClose = () => {
    onClose()
  };


  return(
    <Dialog
    fullWidth maxWidth='sm'
      PaperProps={{
        style: { borderRadius: 10 }
      }}
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description">
      <DialogTitle id="scroll-dialog-title">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant='h6' style={{display: 'inline-block', fontWeight: '500'}}>
          {processUrl(row.resourse)} 
        </Typography>
        <Typography style={{display: 'inline-block'}}>
          {row.startTime} - {row.endTime}
        </Typography>
        </div>
        </DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}>
            {/* sdfsdfkjlwejfwk;wf */}
            {row.keylog}
          {/* {[...new Array(1)]
            .map(
              () =>
                'Cras mattis consectetur purus sit amet fermentum.\n' +
                'Cras justo odio, dapibus ac facilisis in, egestas eget quam.\n' +
                'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.' +
                'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.'
            )
            .join('\n')} */}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}