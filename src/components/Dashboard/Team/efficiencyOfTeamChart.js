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
const dataNeutral =   [136,190,101,98,230,15,240, 23, 90,20,34,90]
const dataIneffective = [100,120,10,10,15,20, 11, 0,76,1.0,80,1]
const dataWithout = [200,55,104,210,100,201,0, 100, 10,99,20,33]

const dataEffectiveWeek = [121,230,240,250,130,120,140,123,243,120,86,135]
const dataNeutralWeek = [100,212,20,80,130,270,310,107,14,78,101,100]
const dataIneffectiveWeek = [20,120,150,154,76,45,13,67,72,50,61,21]
const dataWithoutWeek = [132,11,13,53,46,97,120,53,62,78,23,109]


const maxYVal = 600
const tickAmount = 5

// createData('Bobrov Artur','Senior Software Engineer','Development', true, '31m', '60%', '2h 30m', '32%','2h 40m', '38%', '1h 39m', '28%', '5h 51m'),
// createData('Michaylov Dmitry','Ml engineer','Development', false, '21m', '10%', '4h 31m', '53%','1h 40m', '38%', '3h 20m', '39%', '4h 23m'),
// createData('Lisa Davies','Business analyst','Analytics', true, '4h 2m', '40%', '1h 30m', '22%', '1h', '20%', '24m', '19%','7h 2m'),
// createData('Mark Evans', 'Business analyst', 'Analytics', false,'1h', '2%', '2h', '32%','4h', '90%','2m', '1%', '9h 52m'),
// createData('Novikova Anna','Junior software engineer','Development', false, '4h 20m', '18%', '0m', '0%','0m', '0%','54m', '18%', '4h 20m'),
// createData('David Smith','Lead software engineer','Development', true, '31m', '90%', '2h 30m', '32%','2h 40m', '38%','20m', '9%', '5h 51m'),
// createData('Kuznezova Veronika','Junior hr specialist', "HR", true, '9h', '1%', '1m', '99%','2h', '38%', '5h 52m', '79%', '15h 52m'),
// createData('Prokhorov Andrew', 'Accounter', 'Bookkeeping', false, '1h 3m', '55%', '2h 30m', '29%','2h 43m', '28%','2h 34m', '39%', '16h 51m'),
// createData('Popov Ilya', 'Manager', 'Inner Managament', true, '31m','30%', '2h 30m', '32%','2h 40m', '38%', '2h 51m', '39%','5h 51m'),
// createData('Paul Taylor','Business analyst', 'Analytics', false, '4h 20m', '18%', '0m', '0%','0m', '0%', '2h 1m', '34%', '4h 20m'),
// createData('Maria Jones', 'Researcher', 'Research', true, '21m', '14%', '4h 31m', '23%','1h 40m', '38%', '4h', '42%', '1h 23m'),
// createData('Sorokin Alexandr','Ml engineer', 'Development', false, '21m', '10%', '4h 31m', '53%','1h 40m', '38%','2h 19m', '29%', '23m'),
// ];

const categories = [['Bobrov Artur'],['Kuznezova Veronika'], ['Lisa Davies'],['Maria Jones'],['Mark Evans'],['Michaylov Dmitry'],['Novikova Anna'],
['David Smith'],['Paul Taylor'],['Popov Ilya'], ['Prokhorov Andrew'], ['Sorokin Alexandr']]

const series =  [
  {
    name: 'Ineffective',
    data: dataIneffective.slice(0,6),
  },
  {
    name: 'Neutral',
    data: dataNeutral.slice(0,6)
  }, 
  {
    name: 'Effective',
    data: dataEffective.slice(0,6)
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
      colors: ['#d90368', '#f5cc00', '#00cc99', '#bcb8b1'],
      opacity: 1
      },
  }


  function computeNewOptions(beginInd, endInd, dataEffective, dataNeutral, dataIneffective, dataWithout){
    return {
      series: [
        {
          name: 'Ineffective',
          data: dataIneffective.slice(beginInd, endInd + 1)
        },
        {
        name: 'Neutral',
        data: dataNeutral.slice(beginInd, endInd + 1)
      },
      {
        name: 'Effective',
        data: dataEffective.slice(beginInd, endInd + 1)
      },
      {
        name: 'Without category',
        data: dataWithout.slice(beginInd, endInd + 1)
      }],
      xaxis:{
        categories: categories.slice(beginInd, endInd + 1)
      }
    }
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

      let dataE, dataN, dataI, dataW
      if (timePeriod === 2){
        dataE = dataEffectiveWeek
        dataN = dataNeutralWeek
        dataI = dataIneffectiveWeek
        dataW = dataWithoutWeek
      }
      else {
        dataE = dataEffective
        dataN = dataNeutral
        dataI = dataIneffective
        dataW = dataWithout
      }
      const newOpt = computeNewOptions(newBeginInd, newEndInd, dataE, dataN, dataI, dataW)
      setBeginInd(newBeginInd)
      setEndInd(newEndInd)
      ReactApexChart.exec("efficiencyOfEmployees", 'updateOptions', newOpt, true)
    }

    const handleRightClick = event => {

        let newEndInd
        if (endInd > categories.length - 1 - 6) newEndInd = categories.length - 1
        else newEndInd = endInd + 6
        let newBeginInd = newEndInd-6 >= 0 ? newEndInd - 6 : 0
        
        let dataE, dataN, dataI, dataW
        if (timePeriod === 2){
          dataE = dataEffectiveWeek
          dataN = dataNeutralWeek
          dataI = dataIneffectiveWeek
          dataW = dataWithoutWeek
        }
        else {
          dataE = dataEffective
          dataN = dataNeutral
          dataI = dataIneffective
          dataW = dataWithout
        }
        const newOpt = computeNewOptions(newBeginInd, newEndInd, dataE, dataN, dataI, dataW)
        setBeginInd(newBeginInd)
        setEndInd(newEndInd)
        ReactApexChart.exec("efficiencyOfEmployees", 'updateOptions', newOpt, true)
    }
    

    React.useEffect(() => {
      if (timePeriod != 0 && timePeriod == props.timePeriod){}

      else if(props.timePeriod == 2){
        const newOpt = computeNewOptions(beginInd, endInd, dataEffectiveWeek, dataNeutralWeek, dataIneffectiveWeek, dataWithoutWeek)
        ReactApexChart.exec("efficiencyOfEmployees", 'updateOptions', newOpt, true)  
        setTimePeriod(props.timePeriod)
      }

      else if(props.timePeriod == 1){
        const newOpt = computeNewOptions(beginInd, endInd, dataEffective, dataNeutral, dataIneffective, dataWithout)
        ReactApexChart.exec("efficiencyOfEmployees", 'updateOptions', newOpt, true)
        setTimePeriod(props.timePeriod)
      }
    });

    return(
      <div>
          <Chart options={options} series={series} type="bar" height={370}  width={'100%'}/>
          <div className={classes.bottomArrows}>
            {beginInd === 0 ? (<Button disabled><KeyboardArrowLeftIcon/></Button>):(<Button onClick={handleLeftClick}><KeyboardArrowLeftIcon/></Button>)}
            {endInd === catLen - 1 ? (<Button disabled><KeyboardArrowRightIcon/></Button>) : (<Button onClick={handleRightClick}><KeyboardArrowRightIcon/></Button>)}
          </div>)
      </div>
    )
  }
