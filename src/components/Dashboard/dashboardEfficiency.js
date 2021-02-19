import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import EffectiveLineChart from './effectiveLineChart'
import CustomDay from './date'

import { Grid, Card, Container, Input, Paper, FormControl, Button, Typography, Select, MenuItem } from '@material-ui/core';
import TableMember from "./Employee/tableMember"
import TableTeam from "./Team/tableTeam"

import EfficiencyChart from './Employee/efficiencyChart'
import EfficiencyByDayChart from './Employee/efficiencySumChart'
import UsageChart from './Employee/usageChart'
import UsageByDayChart from './Employee/usageSum'
import { makeStyles } from '@material-ui/core/styles';
import EfficiencyOfTeamChart from './Team/efficiencyOfTeamChart'
import EfficiencyOfTeamSumChart from './Team/efficiencyOfTeamSumChart'
import UsageOfTeamChart from './Team/usageOfTeamChart'
import UsageOfTeamSumChart from './Employee/usageOfTeamSumChart'
import Sites from './Sites'
import SitesAllTime from './SitesAllTime'




// import React, { Fragment } from 'react';

import BigStat from "./BigStat";

const mock = {
  bigStat: [
    {
      product: "Worked day",
      total: {
        monthly: 4232,
        weekly: 1465,
        daily: 199,
        percent: { value: 3.7, profit: false }
      },
      color: "Worked week",
      registrations: {
        monthly: { value: 830, profit: false },
        weekly: { value: 215, profit: true },
        daily: { value: 33, profit: true }
      },
      bounce: {
        monthly: { value: 4.5, profit: false },
        weekly: { value: 3, profit: true },
        daily: { value: 3.25, profit: true }
      }
    },
    {
      product: "Worked week",
      total: {
        monthly: 754,
        weekly: 180,
        daily: 27,
        percent: { value: 2.5, profit: true }
      },
      color: "warning",
      registrations: {
        monthly: { value: 32, profit: true },
        weekly: { value: 8, profit: true },
        daily: { value: 2, profit: false }
      },
      bounce: {
        monthly: { value: 2.5, profit: true },
        weekly: { value: 4, profit: false },
        daily: { value: 4.5, profit: false }
      }
    },
    {
      product: "Worked mounth",
      total: {
        monthly: 1025,
        weekly: 301,
        daily: 44,
        percent: { value: 3.1, profit: true }
      },
      color: "secondary",
      registrations: {
        monthly: { value: 230, profit: true },
        weekly: { value: 58, profit: false },
        daily: { value: 15, profit: false }
      },
      bounce: {
        monthly: { value: 21.5, profit: false },
        weekly: { value: 19.35, profit: false },
        daily: { value: 10.1, profit: true }
      }
    }
  ],
};



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
    position: 'sticky'
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
  }
})); 


export default function DashboardEfficiency(props){

    const [chartSwitcher, setChartSwitcher] = React.useState('Efficiency')
    const classes = styles()
    const [timePeriod, setTimePeriod] = React.useState(1);
    const [subjectOfChange, setSubjectOfChange] = React.useState(1);
    const [effectiveType, setEffectiveType] = React.useState(1);
    const [view, setView] = React.useState('analytics')

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
    return (
      <div>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Container className={classes.appbarContent}>


          <Button  variant="outlined"  style={{marginTop:'8px', marginBottom:'8px', minWidth:'150px'}} onClick={handleViewChange}>
            {view}
          </Button>

            <div>

          <FormControl variant="outlined" className={classes.formControl}>
              <Select
                value={subjectOfChange}
                onChange={handleSubjecChange}
              >
                <MenuItem value={1}>Member</MenuItem>
                <MenuItem value={2}>All Team</MenuItem>
                <MenuItem value={3}>Me</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                value={timePeriod}
                onChange={handleTimeChange}
              >
                <MenuItem value={1}>Day</MenuItem>
                <MenuItem value={2}>Week</MenuItem>
              </Select>
            </FormControl>

            <FormControl MenuProps={{ disableScrollLock: true }} variant="outlined" className={classes.formControl}>
              <CustomDay/>
            </FormControl>
            </div>
            
          </Container>
        </Toolbar>
      </AppBar>

      {view === 'analytics' ? (<Container>

        <Grid container spacing={4}>
          {mock.bigStat.map(stat => (
            <Grid item md={4} sm={6} xs={12} key={stat.product}>
              <BigStat {...stat}/>
            </Grid>
          ))}
        </Grid>


        <Paper className={classes.paper}>
          {subjectOfChange == 1 && <TableMember/>}
          {subjectOfChange == 2 && <TableTeam/>}
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
                  <MenuItem value="Usage">Usage</MenuItem>
                </Select>
                  {timePeriod == 1 ? (<Typography className={classes.typography}>14 Feb 2021
                    </Typography>): (<Typography className={classes.typography}> 8 Feb 2021 - 14 Feb 2021
                    </Typography>)}

              </div>
              {subjectOfChange === 2 && (chartSwitcher === 'Efficiency' ? 
                  <EfficiencyOfTeamChart timePeriod={timePeriod}/> :
                  <UsageOfTeamChart timePeriod={timePeriod}/> 
              )}
              {subjectOfChange === 1 && (chartSwitcher === 'Efficiency' ? 
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

              {subjectOfChange === 2 && (chartSwitcher === 'Efficiency' ? 
                  <EfficiencyOfTeamSumChart timePeriod={timePeriod}/> : 
                  <UsageOfTeamSumChart timePeriod={timePeriod}/>)}
              {subjectOfChange === 1 && (chartSwitcher === 'Efficiency' ? 
                  (<EfficiencyByDayChart timePeriod={timePeriod}/>) : 
                  (<UsageByDayChart timePeriod={timePeriod}/>)
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
                  <MenuItem value={4}>Mix</MenuItem>
                </Select>
                
              </div>
              <EffectiveLineChart effectiveType={effectiveType} timePeriod={timePeriod}/>
            </Card>
          </Grid>
        </Grid>
        </Container>)
        :
        (<SitesAllTime subjectOfChange={subjectOfChange} timePeriod={timePeriod}/>)}
    </div>
    )

}