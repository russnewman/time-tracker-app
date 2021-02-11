import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import EffectiveLineChart from './effectiveLineChart'
import CustomDay from './date'



// import MenuItem from '@material-ui/core/MenuItem';



import { Grid, Card, Container, Input, Paper, FormControl, Typography, Select, MenuItem, Tabs, Tab, Button } from '@material-ui/core';
import Table from "./table"

import EfficiencyByHoursChart from './efficiencyByHoursChart'
import EfficiencyByDayChart from './efficiencySumChart'
import UsageByHoursChart from './usageByHoursChart'
import UsageByDayChart from './usageSum'
import { makeStyles } from '@material-ui/core/styles';


// import React, { Fragment } from 'react';

import BigStat from "./BigStat";

const mock = {
  bigStat: [
    {
      product: "Workerd today",
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
      product: "Activity",
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
  switcher:{
      paddingTop: theme.spacing(1),
      paddingRight: theme.spacing(2),
      textAlign: 'right'
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
    padding: theme.spacing(3),
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
    paddingRight: '15px', 
    display: 'flex',
    justifyContent: 'flex-end'
  }
})); 


export default function DashboardEfficiency(props){

    const [chartSwitcher, setChartSwitcher] = React.useState('Efficiency')
    const classes = styles()
    const [timePeriod, setTimePeriod] = React.useState(1);
    const [subjectOfChange, setSubjectOfChange] = React.useState(1);
    const [effectiveType, setEffectiveType] = React.useState(1);

    const handleTimeChange = (event) => {
      setTimePeriod(event.target.value);
    };
    const handleSubjecChange = (event) => {
      setSubjectOfChange(event.target.value);
    }

    return (

      <div>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Container className={classes.appbarContent}>

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

            <FormControl variant="outlined" className={classes.formControl}>
              <CustomDay/>
            </FormControl>
            
          </Container>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid container spacing={4}>
          {mock.bigStat.map(stat => (
            <Grid item md={4} sm={6} xs={12} key={stat.product}>
              <BigStat {...stat}/>
            </Grid>
          ))}
        </Grid>
        <Paper className={classes.paper}>
          <Table/>
        </Paper>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Card className={classes.card}>
              <div className={classes.switcher}> 
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
              </div>
              {chartSwitcher === 'Efficiency' ? 
              (<EfficiencyByHoursChart timePeriod={timePeriod}/>) : 
              (<UsageByHoursChart timePeriod={timePeriod}/>)}
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card className={classes.card}>
              <div className={classes.header}>
                {timePeriod === 1 ? (<Typography variant="h5">All day</Typography>) : 
                (<Typography variant="h5">All week</Typography>)}
              
              </div>
              {chartSwitcher === 'Efficiency' ? (<EfficiencyByDayChart timePeriod={timePeriod}/>) : (<UsageByDayChart timePeriod={timePeriod}/>)}
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            <Card className={classes.card}>
            <div className={classes.switcher}>
                <Select
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
                </Select>
              </div>
              <EffectiveLineChart effectiveType={effectiveType} timePeriod={timePeriod}/>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
    )

}