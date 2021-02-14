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



const dataA = [43,23,34,25,53,12,34,13, 23, 20, 8, 13, 27,31,37,24,28,20,10,19,16,14,19,54]
const dataB = [13,23,20,8,13,27,31,37,24,28,20,10,19,27,31,37,24,28,20,10,19,16,14,19,54]
const dataC = [11,17,15,15,21,14,14,17,22,20,15,31,9, 13, 23, 20, 8, 13, 27,31,37,24,28,20,47]
const categories = [['00:00 - 01:00'],['01:00 - 2:00'], ['02:00 - 3:00'],['03:00 - 04:00'],['04:00 - 5:00'],['05:00 - 6:00'],['06:00 - 7:00'],
['07:00 - 8:00'],['08:00 - 9:00'],['09:00 - 10:00'], ['10:00 - 11.00'], ['11:00 - 12:00'], ['12:00 - 13:00'],
['13:00 - 14:00'], ['14:00 - 15:00'],['15.00 - 16:00'],['16.00 - 17:00'],['17.00 - 18:00'],
['18.00 - 19:00'],['19.00 - 20:00'],['20.00 - 21:00'], ['21.00 - 22:00'], ['22.00 - 23:00'],['23.00 - 00:00']]

  const seriesEffectiveDay =  [{
        name: 'Effective',
        data: dataA.slice(8, 20)
  }]
      
  const seriesIneffectiveDay =  [{
    name: 'Ineffective',
    data: dataB.slice(8, 20)
  }]

  const seriesNeutralDay =  [{
    name: 'Neutral',
    data: dataC.slice(8, 20)
  }]

  const optionsEffective = {
    chart: {
      id: 'effective',
      type: 'line',
      height: 350,
      stacked: true,
      width: 50,
      // colors :['#80ffdb'],
      // foreColor: '#373d3f',
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
    xaxis: {categories: categories.slice(8,20)},

    yaxis:{
      min: 0,
      max: 60,
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
        formatter: (value) => { return value + 'm' },
      },
    },

    
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


  const optionsIneffectiveDay = {
      series: seriesIneffectiveDay,
      colors: ['#000C77'],
  }

  const optionsNeutralDay = {
      series: seriesNeutralDay,
      colors: ['#56cfe1']
  }
    
  const seriesEffectiveWeek =  [{
    name: 'Effective',
    data: [44, 55, 41, 67, 22, 13,12]
  }]


  const optionsEffectiveWeek = {
    series: seriesEffectiveWeek,
    xaxis: {
      categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    },
    yaxis:{
      min: 0,
      max: 60,
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
        formatter: (value) => { return value + 'h' },
      },
    },
    colors :['#80ffdb'],
  }


  const optionsEffectiveDay = {
    series: seriesEffectiveDay,
    xaxis: {
      categories: categories.slice(8,20)
    },
    yaxis:{
      min: 0,
      max: 60,
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
        formatter: (value) => { return value + 'm' },
      },
    },
    colors :['#80ffdb']

  }


  const seriesMix = [{
    name: 'Effective',
    data: dataA.slice(8, 20)
  },{
    name: 'Neutral',
    data: dataB.slice(8, 20)
  },{
    name: 'Ineffective',
    data: dataC.slice(8, 20)
  }]

  const optionsMixDay = {
    series: seriesMix,
    chart: {
      id: 'effective',
      type: 'line',
      stacked: false,
      height: 350,
      zoom: {
        enabled: false
      },
    },
    xaxis: {
      categories: categories.slice(8,20)
    },

    colors :['springgreen', 'blue', 'red'],
  }



export default function EffectiveLineChart(props){

    const classes = styles()

    const [timePeriod, setTimePeriod] = React.useState(0);
    const [effectiveType, setEffectiveType] = React.useState(0)
    const [beginInd, setBeginInd] = React.useState(8)

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
      series: [{
          name: 'Effective',
          data: dataA.slice(newBeginInd, newBeginInd + 12)
        }],
        xaxis:{
          categories: categories.slice(newBeginInd, newBeginInd + 12)
        }
      }
      setBeginInd(newBeginInd)
      ReactApexChart.exec("effective", 'updateOptions', newOpt, true)
    }

    const handleRightClick = event => {

        if (beginInd == 12) return


        let newBeginInd = beginInd
        if (beginInd == 0) newBeginInd = 8
        else if (beginInd == 8) newBeginInd = 12

        const newOptions = {
          series: [{
            name: 'Effective',
            data: dataA.slice(newBeginInd, newBeginInd + 12)
          }],
          xaxis:{
            categories: categories.slice(newBeginInd, newBeginInd + 12)
          }
        }
        setBeginInd(newBeginInd)
        ReactApexChart.exec("effective", 'updateOptions', newOptions, true)
    }


    React.useEffect(() => {

      let optionsEffective;
      let optionsNeutral;
      let optionsIneffective;
      let optionsMix;
    
      if (timePeriod != 0 && timePeriod == props.timePeriod && effectiveType == props.effectiveType){return}

      if(props.timePeriod == 2){
        optionsEffective = optionsEffectiveWeek
        ///!!!
        optionsNeutral = optionsNeutralDay
        optionsIneffective = optionsIneffectiveDay
        optionsMix = optionsMixDay
        setTimePeriod(props.timePeriod)
      }

      else if(props.timePeriod == 1){
        optionsEffective = optionsEffectiveDay
        ///!!!
        optionsNeutral = optionsNeutralDay
        optionsIneffective = optionsIneffectiveDay
        optionsMix = optionsMixDay

        setTimePeriod(props.timePeriod)
      }

      if(props.effectiveType == 1){
        ReactApexChart.exec("effective", 'updateOptions', optionsEffective, true)  
        setEffectiveType(1)
      }
      else if(props.effectiveType == 2){
        ReactApexChart.exec("effective", 'updateOptions', optionsNeutral, true)  
        setEffectiveType(2)
      }
      else if(props.effectiveType == 3){
        ReactApexChart.exec('effective', 'updateOptions', optionsIneffective, true)
        setEffectiveType(3)  
      }
      // else if(props.effectiveType == 4){
      //   ReactApexChart.exec('effective', 'updateOptions', optionsMix, true)
      //   setEffectiveType(4)  
      // }
         
    });
    return(
      <div>
          {/* {effectiveType === 4 ? <Chart options={opt}></Chart>} */}
          <Chart options={optionsEffective} series={seriesEffectiveDay} type="area" height={370}  width={1225}/>
          {props.timePeriod == 1 ? (<div className={classes.bottomArrows}>
          <Button onClick={handleLeftClick}><KeyboardArrowLeftIcon/></Button>
          <Button onClick={handleRightClick}><KeyboardArrowRightIcon/></Button>
        </div>) : (<div></div>)}

      </div>
    )
  }