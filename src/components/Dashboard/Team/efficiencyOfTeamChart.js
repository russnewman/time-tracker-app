import React from 'react';
import Chart from 'react-apexcharts';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import ReactApexChart from 'apexcharts';



const styles = makeStyles((theme) => ({
  bottomArrows:{
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1)*-2
  }
}))


function minutesToHours(minutes){
  const hours = Math.floor(minutes/60)
  const min = minutes % 60
  if (hours != 0){
      if (min != 0) return  hours+ 'h' + ' ' + minutes%60 + 'm'
      return hours+'h'
  }
  return minutes%60+'m'
}   


const dataEffective = [121,60,143,90,41,200,100, 131, 300, 100, 57,99]
const dataNeutral = [136,190,101,98,230,15,240, 23, 90,20,34,90]
const dataIneffective = [200,120,10,10,15,20, 11, 0,76,1.0,80,1]
const dataWithout = [200,55,104,210,100,201,0, 100, 10,99,20,33]

const maxYVal = 600
const tickAmount = 5

const categories = [['Cupcake'],['Donut'], ['Eclair'],['Frozen yoghurt'],['Gingerbread'],['Honeycomb'],['Ice cream sandwich'],
['Jelly Bean'],['KitKat'],['Lollipop'], ['Marshmallow'], ['Nougat']]

const series =  [{
    name: 'Effective',
    data: dataEffective.slice(0,6)
  }, {
    name: 'Neutral',
    data: dataNeutral.slice(0,6)
  }, {
    name: 'Ineffective',
    data: dataIneffective.slice(0,6),
  },
  {
    name: 'Without',
    data: dataWithout.slice(0,6)
  }
]
  
  
  const options = {
    chart: {
      id: 'efficiencyOfEmployees',
      type: 'bar',
      height: 350,
      stacked: true,
      width: 50,
      // stackType: '100%',
    //   foreColor: '#373d3f',
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
            speed: 350
        }
    },
    toolbar:{
      show: false
    }
    },
  
    plotOptions: {
      bar: {
        borderRadius: 6,
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
        categories: categories.slice(0, 6),
        labels: {rotate: -45}
    }
    ,
    yaxis:{

      min: 0,
      max: maxYVal,
      tickAmount: tickAmount,

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
        formatter: (value) => { return minutesToHours(value) },
      },
    },
  
    fill: {
      colors: ['#d90368', '#f5cc00', 'springgreen', '#bcb8b1'],
      opacity: 1
      },
  }


  const dataEffectiveWeek = [23,23,24,25,13,12,14,13, 23, 20, 8, 13]
  const dataNeutralWeek = [13,23,20,8,13,27,31,17,14,8,10,10]
  const dataIneffectiveWeek = [11,12,15,15,21,14,14,17,12,10,11,11]

const seriesWeek =  [{
    name: 'Effective',
    data: dataEffectiveWeek.slice(0,6)
  }, {
    name: 'Neutral',
    data: dataNeutralWeek.slice(0,6)
  }, {
    name: 'Ineffective',
    data: dataIneffectiveWeek.slice(0,6)
  }]
  
  const optionsWeek = {
    series: seriesWeek
  }
  const optionsDay = {
    series: series
  }


  export default function EfficiencyByHoursChart(props){
    const classes = styles()

    const [timePeriod, setTimePeriod] = React.useState(0)
    const [beginInd, setBeginInd] = React.useState(0)
    const [endInd, setEndInd] = React.useState(6)
    const catLen = categories.length

    const handleLeftClick = event => {

      let newBeginInd
      if (beginInd < 6)  newBeginInd = 0
      else newBeginInd = beginInd - 6
      let newEndInd = newBeginInd + 6 <= categories.length -1 ? newBeginInd + 6 : categories.length - 1

      const newOpt = {
      series: [{
          name: 'Effective',
          data: dataEffective.slice(newBeginInd, newEndInd + 1)
        }, {
          name: 'Neutral',
          data: dataNeutral.slice(newBeginInd, newEndInd + 1)
        }, {
          name: 'Ineffective',
          data: dataIneffective.slice(newBeginInd, newEndInd + 1)
        },
        {
          name: 'Without category',
          data: dataWithout.slice(newBeginInd, newEndInd + 1)
        }],
        xaxis:{
          categories: categories.slice(newBeginInd, newEndInd + 1)
        }
      }
      setBeginInd(newBeginInd)
      setEndInd(newEndInd)
      ReactApexChart.exec("efficiencyOfEmployees", 'updateOptions', newOpt, true)
    }

    const handleRightClick = event => {

        let newEndInd
        if (endInd > categories.length - 1 - 6) newEndInd = categories.length - 1
        else newEndInd = endInd + 6
        let newBeginInd = newEndInd-6 >= 0 ? newEndInd - 6 : 0

        const newOptions = {
          series: [{
            name: 'Effective',
            data: dataEffective.slice(newBeginInd, newEndInd + 1)
          }, {
            name: 'Neutral',
            data: dataNeutral.slice(newBeginInd, newEndInd + 1)
          }, {
            name: 'Ineffective',
            data: dataIneffective.slice(newBeginInd, newEndInd + 1)
          },
          {
            name: 'Without category',
            data: dataWithout.slice(newBeginInd, newEndInd + 1)
          }
        ],
          xaxis:{
            categories: categories.slice(newBeginInd, newEndInd + 1)
          }
        }
        setBeginInd(newBeginInd)
        setEndInd(newEndInd)
        ReactApexChart.exec("efficiencyOfEmployees", 'updateOptions', newOptions, true)
    }
    

    React.useEffect(() => {
      if (timePeriod != 0 && timePeriod == props.timePeriod){}

      else if(props.timePeriod == 2){
        ReactApexChart.exec("efficiencyOfEmployees", 'updateOptions', optionsWeek, true)  
        setTimePeriod(props.timePeriod)
      }

      else if(props.timePeriod == 1){
        ReactApexChart.exec("efficiencyOfEmployees", 'updateOptions', optionsDay, true)
        setTimePeriod(props.timePeriod)
      }
    });

    return(
      <div>
          <Chart options={options} series={series} type="bar" height={370}  width={800}/>
          <div className={classes.bottomArrows}>
            {beginInd === 0 ? (<Button disabled><KeyboardArrowLeftIcon/></Button>):(<Button onClick={handleLeftClick}><KeyboardArrowLeftIcon/></Button>)}
            {endInd === catLen - 1 ? (<Button disabled><KeyboardArrowRightIcon/></Button>) : (<Button onClick={handleRightClick}><KeyboardArrowRightIcon/></Button>)}
          </div>)
      </div>
    )
  }
