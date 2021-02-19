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
import { Container, Input, Paper, Typography, Select, Button, DialogContent, MenuItem } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


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
    // marginBottom: theme.spacing(3),
    // marginTop: theme.spacing(3),
    // boxShadow: "0px 5px 12px rgba(10, 1, 50, 0.3)",
    // borderRadius: "20px",
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



function createDataMemberDay(resourse, duration, startTime, endTime, activity, type) {
  return { 
    resourse: resourse, 
    duration: minutesToHours(duration), 
    startTime: startTime, 
    endTime: endTime, 
    activityRate: computeActivityRate(activity, duration),
    activity: minutesToHours(activity),
    type: type
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
    return url.replace('https://','')
}

const itemsDayMember = [
  createDataMemberDay('https://music.yandex.ru/home', 159, 15.31, 18.00, 130, 'neutral'),
  createDataMemberDay('https://spring.io/', 2, 11.11, 11.13, 1, 'effective'),
  createDataMemberDay('https://www.youtube.com/', 22, 15.40, 16.02, 14,'ineffective'),
  createDataMemberDay('https://spring.io/', 2, 11.11, 11.13, 1, 'effective'),
  createDataMemberDay('https://www.youtube.com/', 22, 15.40, 16.02, 14,'ineffective'),
  createDataMemberDay('https://spring.io/', 2, 11.11, 11.13, 1, 'effective'),
  createDataMemberDay('https://www.youtube.com/', 22, 15.40, 16.02, 14,'ineffective')
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


  const [open, setOpen] = React.useState(false);
  const [resourseName, setResourseName] = React.useState("")
  const [type, setType] = React.useState("")
  const [ind, setInd] = React.useState(0)
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
  const handleClose = (value) => {
    setOpen(false);
  };

  const openDialog = (row, ind) => {
    setInd(ind)
    setResourseName(row.resourse)
    setType(row.type)
    setOpen(true)
  }

  const updateRows = (rows, ind, newType) => {
      let row = rows[ind]
      row.type = newType
  }

  return (
    <div>
        <Container style={{display: 'flex', justifyContent: 'center'}}>
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
                       { timePeriod === 1 && subjectOfChange === 1 && <TableCell align="right">{row.startTime}</TableCell>}
                        {timePeriod === 1 && subjectOfChange === 1 && <TableCell align="right">{row.endTime}</TableCell>}
                        <TableCell align="right">
                            <Typography style={{display: 'inline-block', fontWeight:'500'}} >{row.activityRate}</Typography>
                            <Typography className="text-black-50" style={{fontSize:'11px'}} >{row.activity}</Typography>
                          {/* {row.activity} */}
                          </TableCell>

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

       </Container> 
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


