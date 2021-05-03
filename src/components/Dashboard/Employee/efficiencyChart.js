import React from 'react';
import Chart from 'react-apexcharts';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import pure from 'recompose/pure'
import ReactApexChart from 'apexcharts';

import EfficiencyService from '../../../services/efficiency.service'


const styles = makeStyles((theme) => ({
  bottomArrows:{
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1)*-2
    // marginLeft: theme.spacing(5)
  }
}))

function secondsToHours(seconds){
  const hours = Math.floor(seconds/3600)
  const minutes = Math.floor(seconds % 3600 / 60)
  const sec = seconds % 3600 % 60

  if (hours != 0){
      if (minutes != 0){
        if (sec != 0) return  hours+ 'h' + ' ' + minutes + 'm' + ' ' + sec + 's'
        return hours+ 'h' + ' ' + minutes + 'm'
      } 
      return hours+'h'
  }
  if (minutes != 0){
    if (sec != 0) return minutes + 'm' + ' ' + sec + 's'
    return  minutes + 'm'
  }
  return sec + 's'
}   

const categories = [['00:00','-','01:00'],['01:00','-','2:00'], ['02:00','-','3:00'],['03:00','-','04:00'],['04:00','-','5:00'],['05:00','-','6:00'],['06:00','-','7:00'],
['07:00','-','8:00'],['08:00','-','9:00'],['09:00','-','10:00'], ['10:00','-','11.00'], ['11:00','-','12:00'], ['12:00','-','13:00'],
['13:00','-','14:00'], ['14:00','-','15:00'],['15.00','-','16:00'],['16.00','-','17:00'],['17.00','-','18:00'],
['18.00','-','19:00'],['19.00','-','20:00'],['20.00','-','21:00'], ['21.00','-','22:00'], ['22.00','-','23:00'],['23.00','-','00:00']]
  
  const optionsDefault = {
    chart: {
      id: 'efficiency',
      type: 'bar',
      height: 350,
      stacked: true,
      width: 50,
      foreColor: '#373d3f',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 300,
        animateGradually: {
            enabled: true,
            delay: 1
        },
        dynamicAnimation: {
            enabled: true,
            speed: 450
        }
      },
      toolbar:{show: false}
    },
  
    plotOptions: {
      bar: {
        columnWidth: '25%',
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: categories.slice(8, 20)
    },
    yaxis:{
      min: 0,
      max: 3600,
      tickAmount: 6,
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 900,
        },
        formatter: (value) => { return secondsToHours(value) + 'm' },
      },
    },
    fill: {
      colors: ['#d90368', '#f5cc00', '#00cc99', '#bcb8b1'],
      opacity: 1
      },
  }



  const getSeries = (efficiency, timePeriod, beginInd, endInd) =>{

    let effective, neutral, ineffective, without
    if (timePeriod === 1 || timePeriod == 0){
      effective = efficiency.EFFECTIVE.slice(beginInd, endInd)
      neutral = efficiency.NEUTRAL.slice(beginInd,endInd)
      ineffective = efficiency.INEFFECTIVE.slice(beginInd,endInd)
      without = efficiency.WITHOUT.slice(beginInd,endInd)
    }
    else{
      effective = efficiency.EFFECTIVE
      neutral = efficiency.NEUTRAL
      ineffective = efficiency.INEFFECTIVE
      without = efficiency.WITHOUT
    }

    return [ 
      {
        name: 'Ineffective',
        data: ineffective
      },
      {
        name: 'Neutral',
        data: neutral
      },
      {
        name: 'Effective',
        data: effective
      },
      {
        name: 'Without category',
        data: without
      }
    ]
  }


  const getOptions = (series, timePeriod) => {
    if (timePeriod === 0 || timePeriod === 1){

      const opt = {
          series: series,
          xaxis: {
            categories:  categories.slice(8, 20)
          },
          yaxis:{
            // min: 0,
            max: 3600,
            tickAmount: 6,
            labels: {
              formatter: (value) => { return secondsToHours(value)},
            },
          },
        }
      return opt
    }
    
   const opt =  {
        series: series,
        xaxis: {
          categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        },
        yaxis:{
          max: 28800,
          tickAmount: 4,
          labels: {
            formatter: (value) => { return secondsToHours(value)},
          },
        },
      }
      return opt
    }


   function EfficiencyByHoursChart(props){

    const classes = styles()
    const [timePeriod, setTimePeriod] = React.useState(0)
    const [beginInd, setBeginInd] = React.useState(8)
    const employeeId = props.employeeId
    console.log("ID",employeeId)
    const series = getSeries(EfficiencyService.getEfficiencyFromSessionStorage(employeeId).current, timePeriod)
   
    const handleLeftClick = event => {
      if (beginInd == 0) return

      let newBeginInd = beginInd
      if (beginInd == 8){
        newBeginInd = 0
      }
      else if (beginInd == 12){
        newBeginInd = 8
      }

      const newOpt = {
      series: getSeries(EfficiencyService.getEfficiencyFromSessionStorage(employeeId).current, 1, newBeginInd, newBeginInd + 12),
        xaxis:{
          categories: categories.slice(newBeginInd, newBeginInd + 12)
        }
      }
      setBeginInd(newBeginInd)
      ReactApexChart.exec("efficiency", 'updateOptions', newOpt, true)
    }

    const handleRightClick = event => {
        if (beginInd == 12) return

        let newBeginInd = beginInd
        if (beginInd == 0) newBeginInd = 8
        else if (beginInd == 8) newBeginInd = 12

        const newOptions = {
          series: getSeries(EfficiencyService.getEfficiencyFromSessionStorage(employeeId).current, 1, newBeginInd, newBeginInd + 12),
          xaxis:{
            categories: categories.slice(newBeginInd, newBeginInd + 12)
          }
        }
        setBeginInd(newBeginInd)
        ReactApexChart.exec("efficiency", 'updateOptions', newOptions, true)
    }
    

    React.useEffect(() => {
        const newEfficiency = EfficiencyService.getEfficiencyFromSessionStorage(employeeId).current
        let beginInd, endInd
        if (props.timePeriod == 1 || props.timePeriod == 0) {
          beginInd = 8
          endInd = 20
        }
        else if (props.timePeriod == 2){
          beginInd = 0 
          endInd = 6
        }

        const ser = getSeries(newEfficiency, props.timePeriod, beginInd, endInd)
        const newOptions = getOptions(ser, props.timePeriod)
  
        ReactApexChart.exec("efficiency", 'updateOptions', newOptions, true)       
    });

    return(
      <div>
          <Chart options={optionsDefault} series={series} type="bar" height={370}  width={'100%'}/>
          {props.timePeriod == 1 ? (<div className={classes.bottomArrows}>
            <Button onClick={handleLeftClick}><KeyboardArrowLeftIcon/></Button>
            <Button onClick={handleRightClick}><KeyboardArrowRightIcon/></Button>
          </div>) : (<div></div>)}
      </div>
    )
  }


  export default pure(EfficiencyByHoursChart)