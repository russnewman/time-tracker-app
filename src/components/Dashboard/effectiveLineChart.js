import React from 'react';
import Chart from 'react-apexcharts';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import EfficiencyService from '../../services/efficiency.service'
import DateService from '../../services/date.service'

import ReactApexChart from 'apexcharts';

const styles = makeStyles((theme) => ({
  bottomArrows:{
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1)*-2
  }
}))

const computeMaxValueAndTickAmount = (data, timePeriod) => {

  if (timePeriod === 1){
    return {
      maxValue: 3600,
      tickAmount: 6
    }
  }

  const maxValues = [21600, 28800, 36000, 43200, 50400, 57600, 64800, 72000, 79200, 86400]
  const tickAmounts = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  let maxElem = data[0] ? data[0] : 0
  for (let elem of data){
    if (elem > maxElem){
      maxElem = elem
    }
  }

  for (let ind = 0; ind < maxValues.length; ind++){
    if (maxValues[ind] - 3600 > maxElem){
      return {
        maxValue: maxValues[ind],
        tickAmount: tickAmounts[ind]
      }
    }
  }
  return {
    maxValue: 86000,
    tickAmount: 12
  }


}
const categoriesDay = [['00:00 - 01:00'],['01:00 - 2:00'], ['02:00 - 3:00'],['03:00 - 04:00'],['04:00 - 5:00'],['05:00 - 6:00'],['06:00 - 7:00'],
['07:00 - 8:00'],['08:00 - 9:00'],['09:00 - 10:00'], ['10:00 - 11.00'], ['11:00 - 12:00'], ['12:00 - 13:00'],
['13:00 - 14:00'], ['14:00 - 15:00'],['15.00 - 16:00'],['16.00 - 17:00'],['17.00 - 18:00'],
['18.00 - 19:00'],['19.00 - 20:00'],['20.00 - 21:00'], ['21.00 - 22:00'], ['22.00 - 23:00'],['23.00 - 00:00']]

const categoriesWeek = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const optionsInit = {
  chart: {
    id: "lineChart",
    type: 'line',
    height: 350,
    stacked: true,
    width: 50,
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
          enabled: true,
          delay: 150
      },
      dynamicAnimation: {
          enabled: true,
          speed: 350
      }
    
    },
    toolbar:{show: false}
  },

  plotOptions: {
    bar: {
      borderRadius: 6,
      columnWidth: '25%',
    }
  },
  dataLabels: {enabled: false},
  legend: {show: false},
  xaxis: {categories: categoriesDay.slice(8,20)},

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
      formatter: (value) => { return DateService.secondsToHours(value)},
    },
  },

  colors: ['#00cc99'],

  stroke: {curve: 'smooth'},
  fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [70, 100, 40, 20]
          },
      }
}


  const getData = (effectiveType, employeeId) => {
    switch (effectiveType){
      case 1:
        return EfficiencyService.getEfficiencyFromSessionStorage(employeeId).current.EFFECTIVE
      case 2:
        return EfficiencyService.getEfficiencyFromSessionStorage(employeeId).current.NEUTRAL
      case 3:
        return EfficiencyService.getEfficiencyFromSessionStorage(employeeId).current.INEFFECTIVE
    }
  }

  const getOptions = (effectiveType, timePeriod, data) =>{

    let categories
    let colors = []

    const maxValueAndTickAmount = computeMaxValueAndTickAmount(data, timePeriod)
    const maxValue = maxValueAndTickAmount.maxValue
    const tickAmount = maxValueAndTickAmount.tickAmount


    if (effectiveType === 1){
      colors.push('#00cc99')
    }
    else if (effectiveType === 2){
      colors.push('#f5cc00')
    }
    else if (effectiveType === 3){
      colors.push('#d90368')
    }

    if (timePeriod === 1){
      categories = categoriesDay.slice(8, 20)
    }
    else if (timePeriod === 2){
      categories = categoriesWeek
    }

    const options = {

      xaxis: {categories: categories},
      yaxis:{
        min: 0,
        max: maxValue,
        tickAmount: tickAmount,
        labels: {
          formatter: (value) => { return DateService.secondsToHours(value)},
        },
      },
      colors: colors,
    }
    return options
  }



const getSeries = (employeeId, effectiveType, timePeriod) =>{
  let data
  let beginInd;
  let endInd;

  let name = ""
  switch (effectiveType){
    case 1:
      name = "Effective";
      data = EfficiencyService.getEfficiencyFromSessionStorage(employeeId).current.EFFECTIVE
      break;
    case 2:
      name = "Neutral";
      data = EfficiencyService.getEfficiencyFromSessionStorage(employeeId).current.NEUTRAL
      break;
    case 3:
      name = "Ineffective";
      data = EfficiencyService.getEfficiencyFromSessionStorage(employeeId).current.INEFFECTIVE
      break;
  }

  if (timePeriod === 1){
    beginInd = 8;
    endInd = 20;
  }
  else {
      beginInd = 0;
      endInd = data.length < 12 ? data.length : 12
  }

  return [{
    name: name,
    data: data.slice(beginInd, endInd)
  }]
  
}


export default function EffectiveLineChart(props){

    const classes = styles()

    const series = getSeries(props.employeeId, props.effectiveType, props.timePeriod)
    const [beginInd, setBeginInd] = React.useState(8)

    const handleLeftClick = event => {
      
      console.log("BEGIN", beginInd)
      let newOpt
      if (props.timePeriod === 1){
          
        if (beginInd == 0) return

        let newBeginInd = beginInd
        if (beginInd == 8){
          newBeginInd = 0
        }
        else if (beginInd == 12){
          newBeginInd = 8
        }

 
        const categ = categoriesDay.slice(newBeginInd, newBeginInd + 12)
        const data = getData(props.effectiveType, props.employeeId).slice(newBeginInd, newBeginInd + 12)

        newOpt = {
          series: [{
              name: props.effectiveType,
              data: data
            }],
          xaxis:{
            categories: categ
          }
        }
        ReactApexChart.exec("lineChart", 'updateOptions', newOpt, true)
        setBeginInd(newBeginInd)
      }
    }

    const handleRightClick = event => {

      console.log("BEGIN", beginInd)
      let newOpt = {}        
      let newBeginInd = beginInd
      if (props.timePeriod === 1){

        if (beginInd == 12) return

        if (beginInd == 0) newBeginInd = 8
        else if (beginInd == 8) newBeginInd = 12

        newOpt = {
          series: [{
            name: 'Effective',
            data: getData(props.effectiveType, props.employeeId).slice(newBeginInd, newBeginInd + 12)
          }],
          xaxis:{
            categories: categoriesDay.slice(newBeginInd, newBeginInd + 12)
          }
        }
      }
      setBeginInd(newBeginInd)
      ReactApexChart.exec("lineChart", 'updateOptions', newOpt, true)
    }


    React.useEffect(()=>{
      const series = getSeries(props.employeeId, props.effectiveType, props.timePeriod)
      const opt = getOptions(props.effectiveType, props.timePeriod, series[0].data)
      setBeginInd(8)
      ReactApexChart.exec("lineChart", 'updateOptions', opt, true)
    },[props.effectiveType, props.timePeriod])

    return(
      <div>
          <Chart options={optionsInit} series={series} type="area" height={370}  width={1390}/>
          {props.timePeriod == 1 ? (<div className={classes.bottomArrows}>
          <Button onClick={handleLeftClick}><KeyboardArrowLeftIcon/></Button>
          <Button onClick={handleRightClick}><KeyboardArrowRightIcon/></Button>
        </div>) : (<div></div>)}

      </div>
    )
  }