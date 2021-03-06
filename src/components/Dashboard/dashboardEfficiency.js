import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import EffectiveLineChart from './effectiveLineChart'
import CustomDay from './date'

import { Grid, Card, Container, Input, Paper, FormControl, Button,IconButton, Typography, Select, MenuItem } from '@material-ui/core';
import TableMember from "./Employee/tableMember"
import Table from "./table"

import EfficiencyChart from './Employee/efficiencyChart'
import EfficiencyByDayChart from './Employee/efficiencySumChart'
import UsageChart from './Employee/usageChart'
import UsageSumChart from './Employee/usageSum'
import { makeStyles } from '@material-ui/core/styles';
import EfficiencyOfTeamChart from './Team/efficiencyOfTeamChart'
import EfficiencyOfTeamSumChart from './Team/efficiencyOfTeamSumChart'
import UsageOfTeamChart from './Team/usageOfTeamChart'
import UsageOfTeamSumChart from './Team/usageOfTeamSumChart'
import Sites from './Sites'

import InsertChartOutlinedRoundedIcon from '@material-ui/icons/InsertChartOutlinedRounded';
import WebAssetIcon from '@material-ui/icons/WebAsset';

import BigStat from "./BigStat";
import Mock from "./Mock"

const styles = makeStyles((theme) => ({
  paperSettings:{
    boxShadow: "0px 5px 12px rgba(10, 1, 50, 0.3)",
    borderRadius: "25px",
    paddingLeft: theme.spacing(2)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    boxShadow: "0px 5px 12px rgba(10, 1, 50, 0.3)",
    borderRadius: "25px",
  },
  card:{
    boxShadow: "0px 5px 12px rgba(10, 1, 50, 0.3)",
    borderRadius: "25px",
    height: '455px'
  },
  dateAndSwitcher:{
    display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      // textAlign: 'right'
  },
  selectInput: {  
    padding: 10,
    paddingRight: 25,
    "&:focus": {
      backgroundColor: "white",
    },
  },
  header:
  {
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(4),
  },
  appbar:{
    marginBottom: theme.spacing(2),
    backgroundColor: '#ffffff',
    position: 'sticky',
    // overflowX: 'hidden',
    width: '100%',
    // overflowX: 'hidden',
    // overflowY: 'hidden',
    // maxWidth: '100%',
    // position: 'fixed',
    // width: '100%',
    // height: '50px',
    // top: '30px',
    
    // height: '80px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  appbarContent: {
    // paddingRight: '15px', 
    display: 'flex',
    justifyContent: 'space-between'
  },
  typography:{
    paddingTop:'8px',
    fontFamily: 'Poppins',
    fontWeight: '900',
    fontSize: '20px'
  },
  // cont:{
  //   overflow: 'hidden'
  // }
})); 


export default function DashboardEfficiency(props){

    const [chartSwitcher, setChartSwitcher] = React.useState('Efficiency')
    const classes = styles()
    const [timePeriod, setTimePeriod] = React.useState(1);
    const [subjectOfChange, setSubjectOfChange] = React.useState(2);
    const [writing, setWriting] = React.useState('All team')
    const [effectiveType, setEffectiveType] = React.useState(1);
    const [view, setView] = React.useState('analytics')
    const [flag, setFlag] = React.useState(false)


    // const s = 'All team'
    const handleTimeChange = (event) => {
      setTimePeriod(event.target.value);
    };
    const handleSubjecChange = (event) => {
      setSubjectOfChange(event.target.value);
    }

    const handleViewChange = (event) => {
      if(view === 'analytics'){
        setView('sites')
      }
      else setView('analytics')
    }

    React.useEffect(() => {
      setFlag(true);
    })


    let mock
    if (subjectOfChange === 1 && timePeriod === 1) mock = Mock.mockMemberDay
    if (subjectOfChange === 2 && timePeriod === 1) mock = Mock.mockTeamDay
    if (subjectOfChange === 1 && timePeriod === 2) mock = Mock.mockMemberWeek
    if (subjectOfChange === 2 && timePeriod === 2) mock = Mock.mockTeamWeek

    return (
      <div className={classes.cont}>
        <AppBar className={classes.appbar}>
          <Toolbar>
            <Container className={classes.appbarContent}>

            <div style={{ alignItems: 'center', marginLeft: '-90px', display: 'flex'}}>
                  <IconButton onClick={handleViewChange} >
                    {view === 'analytics' ? <WebAssetIcon style={{color: '#000000', fontSize:'32px'}}/> : <InsertChartOutlinedRoundedIcon style={{color: '#000000', fontSize:'32px'}}/>}
                  </IconButton>
                  <Typography variant="h5" style={{color: 'black', fontWeight: '500', marginLeft: '16px', display: 'inline-block'}}>
                      {writing}
                  </Typography>
            </div>

            <div style={{marginRight:'-90px'}}>
              <FormControl variant="outlined" className={classes.formControl}>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select MenuProps={{ disableScrollLock: true }} 
                    value={timePeriod}
                    onChange={handleTimeChange}
                  >
                    <MenuItem value={1}>Day</MenuItem>
                    <MenuItem value={2}>Week</MenuItem>
                  </Select>
                </FormControl>

                <FormControl MenuProps={{ disableScrollLock: true }} variant="outlined" className={classes.formControl}>
                  <CustomDay MenuProps={{ disableScrollLock: true }} />
                </FormControl>
            </div>
              
            </Container>
          </Toolbar>
        </AppBar>
      {/* {writing} */}

      {view === 'analytics' ? (
      <div className = {classes.cont} style={{paddingLeft: '64px', paddingRight: '64px'}}>

        <Grid container spacing={2}>

          
          {mock.bigStat.map(stat => (
            <Grid item md={3} sm={6} xs={12} key={stat.category}>
              <BigStat {...stat}/>
            </Grid>
          ))}
        </Grid>


        <Paper className={classes.paper}>
          {/* {subjectOfChange == 1 && <TableMember setSubjectOfChange={setSubjectOfChange}/>} */}
          <Table setSubjectOfChange={setSubjectOfChange} setWriting={setWriting} writing={writing}/>
        </Paper>


        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Card className={classes.card}>
              <div className={classes.dateAndSwitcher}> 
              <Select
                  value={chartSwitcher}
                  onChange={e => setChartSwitcher(e.target.value)}
                  input={
                    <Input
                      disableUnderline
                      classes={{ input: classes.selectInput }}
                    />
                  }
                >
                  <MenuItem value="Efficiency">Efficiency</MenuItem>
                  <MenuItem value="Usage">Using</MenuItem>
                </Select>
                  {timePeriod == 1 ? (<Typography className={classes.typography}>1 Mar 2021
                    </Typography>): (<Typography className={classes.typography}> 1 Mar 2021 - 7 Mar 2021
                    </Typography>)}

              </div>
              {flag && subjectOfChange === 2 && (chartSwitcher === 'Efficiency' ? 
                  <EfficiencyOfTeamChart timePeriod={timePeriod}/> :
                  <UsageOfTeamChart timePeriod={timePeriod}/> 
              )}
              {flag && subjectOfChange === 1 && (chartSwitcher === 'Efficiency' ? 
                  (<EfficiencyChart timePeriod={timePeriod}/>) : 
                  (<UsageChart timePeriod={timePeriod}/>)
              )}

            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card className={classes.card}>
              <div className={classes.header}>
                {timePeriod === 1 && <Typography className={classes.typography} variant="h5">Day result</Typography>}
                {timePeriod === 2 && <Typography className={classes.typography} variant="h5">Week result</Typography>}
                {timePeriod === 3 && <Typography className={classes.typography} variant="h5">Mounth result</Typography>}
              </div>

              {flag && subjectOfChange === 2 && (chartSwitcher === 'Efficiency' ? 
                  <EfficiencyOfTeamSumChart timePeriod={timePeriod}/> : 
                  <UsageOfTeamSumChart timePeriod={timePeriod}/>)}
              {flag && subjectOfChange === 1 && (chartSwitcher === 'Efficiency' ? 
                  (<EfficiencyByDayChart timePeriod={timePeriod}/>) : 
                  (<UsageSumChart timePeriod={timePeriod}/>)
              )}
            </Card>
          </Grid>
        </Grid> 

        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            <Card className={classes.card}>
            <div className={classes.dateAndSwitcher}>
                <Select MenuProps={{ disableScrollLock: true }} style={{overflow: 'auto'}}
                  value={effectiveType}
                  onChange={e => {setEffectiveType(e.target.value)}}
                  input={
                    <Input
                      disableUnderline
                      classes={{ input: classes.selectInput }}
                    />
                  }
                >
                  <MenuItem value={1}>Effective</MenuItem>
                  <MenuItem value={2}>Neutral</MenuItem>
                  <MenuItem value={3}>Ineffective</MenuItem>
                  {/* <MenuItem value={4}>Mix</MenuItem> */}
                </Select>
                
              </div>
              <EffectiveLineChart effectiveType={effectiveType} timePeriod={timePeriod}/>
            </Card>
          </Grid>
        </Grid>


        
        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            {/* <Card className={classes.card} style={{height: '200px'}}>
              <ByHoursChart/>
            </Card> */}
          </Grid>
        </Grid>
        </div>)
        :
        (<Sites subjectOfChange={subjectOfChange} timePeriod={timePeriod}/>)}
    </div>
    )

}