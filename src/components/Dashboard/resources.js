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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import DialogContentText from '@material-ui/core/DialogContentText';
// import Typography from '../../wrappers/Typography';



import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import ByHoursChart from './Employee/byHoursChart'
import KeyboardOutlinedIcon from '@material-ui/icons/KeyboardOutlined';
import ResourcesService from '../../services/resources.service'
import DateService from '../../services/date.service'
import Notification from "../employees/Notification";

// '#d90368', '#f5cc00', '#00cc99', '#bcb8b1' 



const ERadio = withStyles({
  root: {
    '&$checked': {
      color: '#00cc99',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const NRadio = withStyles({
  root: {
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
    backgroundColor: '#060b26',
    color: 'white',
    fontWeight: '600'
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


function createDataMemberDay(resource, duration, startTime, endTime, activity, type, keylog) {
  return { 
    resource: resource, 
    duration: DateService.secondsToHours(duration), 
    startTime: DateService.getTimeFromTimeStamp(startTime), 
    endTime: DateService.getTimeFromTimeStamp(endTime), 
    activityRate: computeActivityRate(activity, duration),
    activity: DateService.secondsToHours(activity),
    type: type, 
    keylog: keylog
    };
}

function createData(resource, duration, activity, type) {
  return { 
      resource: resource, 
      duration: DateService.secondsToHours(duration), 
      activityRate: computeActivityRate(activity, duration),
      activity: DateService.secondsToHours(activity),
      type: type
    };
}


function computeActivityRate(activeMinutes, duration){
    if (duration === 0) return "0%"
    return Math.round(activeMinutes/duration * 100) + '%'
}


function processUrl(url){
  if(url) return url.replace('https://','').replace('http://', '')
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




const getRows = (employeeIdOrAllTeam, resourcesDto)=>{
  if (!resourcesDto || resourcesDto.length === 0) return []

  let res = []
  if (employeeIdOrAllTeam !== 'all'){
    //day
    if (resourcesDto[0].startTime){
      for (let resource of resourcesDto){
        console.log(resource)
        const resourceLink = resource.protocolIdentifier +"://"+ resource.host
        res.push(createDataMemberDay(resourceLink, resource.duration, resource.startTime, resource.endTime, 0, resource.category))
      }
    }
    else{
      for (let resource of resourcesDto){
        const resourceLink = resource.protocolIdentifier +"://"+ resource.host
        res.push(createData(resourceLink, resource.duration, 0, resource.category))
      }
    }
  }

  else{
    for (const [key, value] of Object.entries(resourcesDto)){
      let totalDuration = 0
      let category = value[0].category
      const protocolIdentifier = value[0].protocolIdentifier
      const resourceLink = protocolIdentifier +"://"+ key


      value.forEach(resource => {
        if (category != "mix" && resource.category != category){
          category = "mix"
        }
        totalDuration += resource.duration
      })
      res.push(createData(resourceLink, totalDuration, 0, category))
    }
  }

  return res
}


function parseDurationValue(duration, symb){
  let res
  if (symb === 'h'){
    return duration.indexOf(symb) == -1 ? 0 : duration.substring(0, duration.indexOf('h'))
  }
  const mInd = duration.indexOf(symb)
  if (mInd != -1){
    if (mInd - 2 >=0 && duration[mInd - 2] != ' '){
      res = duration.substring(mInd -2, mInd)
    }
    else res = duration.substring(mInd - 1, mInd)
  }
  return res
}

function descendingComparator(a, b, orderBy) {
  a = a[orderBy]
  b = b[orderBy]

  if (typeof a === 'string' && (a.indexOf('h') != -1 || a.indexOf('m') != -1 || a.indexOf('s') != -1) && (a.indexOf('.') === -1)){

    const hoursA = parseInt(parseDurationValue(a, 'h'))
    const minutesA = parseInt(parseDurationValue(a, 'm'))
    const secondsA = parseInt(parseDurationValue(a, 's'))

    const hoursB = parseInt(parseDurationValue(b, 'h'))
    const minutesB = parseInt(parseDurationValue(b, 'm'))
    const secondsB = parseInt(parseDurationValue(b, 's'))


    if (hoursB < hoursA) return -1        
    if (hoursB > hoursA) return 1
    else{
        if (minutesB < minutesA) return -1
        if (minutesB > minutesA) return 1
        else{
          if (secondsB < secondsA) return -1
          if (secondsB > secondsA) return 1
          return 0
        }
    }
  }
  else if (typeof a === 'string' && (a.length === 8) && (a.indexOf('.') === -1)){

    const aFirstColonInd = a.indexOf(':')
    const aSecondColonInd = a.indexOf(':', aFirstColonInd + 1)

    const bFirstColonInd = b.indexOf(':')
    const bSecondColonInd = b.indexOf(':', bFirstColonInd + 1)

    
    const hoursA = parseInt(a.substring(0, aFirstColonInd))
    const minutesA = parseInt(a.substring(aFirstColonInd + 1, aSecondColonInd))
    const secondsA = parseInt(a.substring(aSecondColonInd))

    const hoursB = parseInt(b.substring(0, bFirstColonInd))
    const minutesB = parseInt(b.substring(bFirstColonInd + 1, bSecondColonInd))
    const secondsB = parseInt(b.substring(bSecondColonInd))


    if (hoursB < hoursA) return -1        
    if (hoursB > hoursA) return 1
    else{
        if (minutesB < minutesA) return -1
        if (minutesB > minutesA) return 1
        else{
          if (secondsB < secondsA) return -1
          if (secondsB > secondsA) return 1
          return 0
        }
    }
  }
  else if (typeof a === 'string'){
    if (processUrl(b) < processUrl(a)) return -1;
    if (processUrl(b) > processUrl(a)) return 1;
    return 0;
  }
  if (b < a) return -1;
  if (b > a) return 1;
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
    if (order !== 0) {
        return order};
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
  const { classes, order, orderBy, numSelected, isOnePersonAndDay, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
                      <TableCell style={{paddingLeft:'60px'}} 
                              key='resource'
                              sortDirection={orderBy === 'resource' ? order : false}>
                              <TableSortLabel
                                active={orderBy === 'resource'}
                                direction={orderBy === 'resource' ? order : 'asc'}
                                onClick={createSortHandler('resource')}
                              >
                                <Typography className="font-weight-bold">Web resourse</Typography>
                                {orderBy === 'resource' ? (
                                    <span className={classes.visuallyHidden}>
                                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                  ) : null}
                              </TableSortLabel>
                      </TableCell>

                      <TableCell align="right"
                                  key='duration'
                                  sortDirection={orderBy === 'duration' ? order : false}>
                              <TableSortLabel
                                active={orderBy === 'duration'}
                                direction={orderBy === 'duration' ? order : 'asc'}
                                onClick={createSortHandler('duration')}
                              >
                                <Typography className="font-weight-bold">Duration</Typography>
                                {orderBy === 'duration' ? (
                                    <span className={classes.visuallyHidden}>
                                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                  ) : null}
                              </TableSortLabel>
                      </TableCell>


                      {isOnePersonAndDay && <TableCell align="right"
                                  key='start'
                                  sortDirection={orderBy === 'start' ? order : false}>
                              <TableSortLabel
                                active={orderBy === 'startTime'}
                                direction={orderBy === 'startTime' ? order : 'asc'}
                                onClick={createSortHandler('startTime')}
                              >
                                <Typography className="font-weight-bold">Start time</Typography>
                                {orderBy === 'startTime' ? (
                                    <span className={classes.visuallyHidden}>
                                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                  ) : null}
                              </TableSortLabel>
                      </TableCell>}


                      {isOnePersonAndDay && <TableCell align="right"
                                  key='endTime'
                                  sortDirection={orderBy === 'endTime' ? order : false}>
                              <TableSortLabel
                                active={orderBy === 'endTime'}
                                direction={orderBy === 'endTime' ? order : 'asc'}
                                onClick={createSortHandler('endTime')}
                              >
                                <Typography className="font-weight-bold">End time</Typography>
                                {orderBy === 'endTime' ? (
                                    <span className={classes.visuallyHidden}>
                                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                  ) : null}
                              </TableSortLabel>
                      </TableCell>}


                      <TableCell align="right"
                                  key='activity'
                                  sortDirection={orderBy === 'end' ? order : false}>
                              <TableSortLabel
                                active={orderBy === 'activity'}
                                direction={orderBy === 'activity' ? order : 'asc'}
                                onClick={createSortHandler('activity')}
                              >
                                <Typography className="font-weight-bold">Activity</Typography>
                                {orderBy === 'activity' ? (
                                    <span className={classes.visuallyHidden}>
                                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                  ) : null}
                              </TableSortLabel>
                      </TableCell>

                      {isOnePersonAndDay && <TableCell align="right"><Typography className="font-weight-bold">Keylogger</Typography></TableCell>}
      </TableRow>
    </TableHead>
  );
}



export default function AcccessibleTable(props) {

  const employeeIdOrAllTeam = props.employeeIdOrAllTeam
  const timePeriod = props.timePeriod
  // const date = props.date
  const rows = getRows(employeeIdOrAllTeam, ResourcesService.getResourcesFromSS())
  console.log(rows)


  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('startTime');
  const [row, setRow] = React.useState({})
  const [render, setRender] = React.useState("render1")
  


  const [open, setOpen] = React.useState(false);
  const [openKeylog, setOpenKeylog] = React.useState(false);
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' })

  
  const [host, setHost] = React.useState("");
  const classes = useStyles();
  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


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
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseKeylog = () => {
    setOpenKeylog(false)
  }

  const openDialog = (row, ind) => {
    setHost(processUrl(row.resource))
    setOpen(true)
  }

  const openKeylogDialog = (row) =>{
    setRow(row)
    setOpenKeylog(true)
  }

  console.log("RERENDERIG")

  return (
    <div>
        {(employeeIdOrAllTeam !== 'all' && timePeriod === 1) &&
        <div style={{display: 'flex', justifyContent: 'center', paddingLeft: '64px', paddingRight: '64px'}}>
            <Paper className={classes.paper}>
                  <ByHoursChart render={render} setRender={setRender}/>
            </Paper>
        </div>
        }
        <div style={{display: 'flex', justifyContent: 'center', paddingLeft: '64px', paddingRight: '64px'}}>
            <Paper className={timePeriod === 1 && employeeIdOrAllTeam !== 'all' ? classes.paper : classes.paperSmall}>
                <TableContainer>
                <Table  className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table">
                    <EnhancedTableHead
                                  classes={classes}
                                  order={order}
                                  orderBy={orderBy}
                                  onRequestSort={handleRequestSort}
                                  isOnePersonAndDay={timePeriod === 1 && employeeIdOrAllTeam !== 'all'}
                                  // rowCount={rows.length}
                                />

                    <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                        <TableRow key={row.resource}>
                        <TableCell>
                            <div>
                            {/* <Typography className="font-weight-bold"/>Hello<Typography/> */}

                                <IconButton className={classes.editIcon} style={{marginRight:'8px'}} onClick={()=>{openDialog(row, index)}}>
                                    <CreateIcon style={{fontSize:'14px'}}/>
                                </IconButton>

                                {row.type === 'effective' && <a style={{color:'#00cc99'}} href={row.resource}>{processUrl(row.resource)}</a>}
                                {row.type === 'neutral' && <a style={{color:'#f5cc00'}} href={row.resource}>{processUrl(row.resource)}</a>}
                                {row.type === 'ineffective' && <a style={{color:'#d90368'}} href={row.resource}>{processUrl(row.resource)}</a>}
                                {row.type === 'without' && <a style={{color:'#bcb8b1'}} href={row.resource}>{processUrl(row.resource)}</a>}
                                {row.type === 'mix' && <a style={{color:'#000080'}} href={row.resource}>{processUrl(row.resource)}</a>}

                                {/* #bcb8b1 */}
                            </div>                                                         
                        </TableCell>
                        
                        <TableCell align="right">
                            {row.duration}
                            </TableCell>

                        {timePeriod === 1 && employeeIdOrAllTeam !== 'all' && <TableCell align="right">{row.startTime}</TableCell>}
                        {timePeriod === 1 && employeeIdOrAllTeam !== 'all' && <TableCell align="right">{row.endTime}</TableCell>}
                          <TableCell align="right">
                            <Typography style={{display: 'inline-block', fontWeight:'500'}} >{row.activityRate}</Typography>
                            <Typography className="text-black-50" style={{fontSize:'11px'}} >{row.activity}</Typography>
                          {/* {row.activity} */}
                          </TableCell>

                          {timePeriod === 1 && employeeIdOrAllTeam !== 'all' && 
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

               <ChangeResourseType host={host} employeeIdOrAllTeam={employeeIdOrAllTeam} open={open} onClose={handleClose}/> 
               {(employeeIdOrAllTeam !== 'all' && timePeriod === 1) && <KeyloggerDialog row={row} open={openKeylog} onClose={handleCloseKeylog}/>}
               <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
       </div> 
    </div>
  );
}

function ChangeResourseType(props) {
  const classes = useStyles()
  let host = props.host
  const onClose = props.onClose
  const open = props.open
  const employeeIdOrAllTeam = props.employeeIdOrAllTeam
  const resources = ResourcesService.getResourcesFromSS()

  let resource = {
    host: "",
    category: ""
  }
  if (employeeIdOrAllTeam === "all"){

    let category = ""
    for (let [key, value] of Object.entries(resources)){
      if (key === host){
        category = value[0].category
        value.forEach(res => {
          if (category != res.category){
            category = "mix"
          }
        })
        break;
      }
    }
    resource = {
      host: host,
      category: category
    }
  }
  else{
    for (let res of resources){
      if (res.host == host){
        resource = {
          host: res.host,
          category: res.category
        }
      }
    }
  }

  const resourceName = resource.host

  const [category, setCategory] = React.useState(resource.category)
  const [selectValue, setSelectValue] = React.useState('employee')
  const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' })

  const handleClose = () => {
    onClose();
    setCategory(resource.category)
    setSelectValue('team')
  };

  const handleSave = () =>{
    if (category == "effective" || category == "ineffective" || category == "neutral"){
      handleClose()

      if (employeeIdOrAllTeam != "all"){
        resources.map(item => {
          if (item.host === resource.host) item.category = category
        })
      }
      else{
        for (let [key, value] of Object.entries(resources)){
          if (key === resource.host){
            value.forEach(res => {
              res.category = category
            })
            break;
          }
        }
      }
      ResourcesService.updateResourcesInSS(resources)
      ResourcesService.updateResource(employeeIdOrAllTeam, selectValue, resource.host, category)
    }
  }

  const handleChange = (event) => {
    setCategory(event.target.value);
  };


  React.useEffect(() => {
    setCategory(resource.category);
  }, [resource.category])

  return (
    
  <div>
    <Dialog onClose={handleClose} fullWidth maxWidth='sm' aria-labelledby="simple-dialog-title" open={open} className={classes.dialog}>
      <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}><h5 style={{fontWeight: '700'}}>{processUrl(resourceName)}</h5></DialogTitle>
      <DialogContent className={classes.dialogContent}>

            <Container style={{ display: 'flex', flexDirection:'row', justifyContent: 'center'}}>
                {employeeIdOrAllTeam !== 'all' && 
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



function KeyloggerDialog(props){


  const onClose = props.onClose
  const open = props.open
  const row = props.row
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
      <DialogTitle id="scroll-dialog-title" style={{backgroundColor: '#060b26', color: 'white'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant='h6' style={{display: 'inline-block', fontWeight: '900'}}>
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