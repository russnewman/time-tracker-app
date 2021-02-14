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


const dataUsage = [7.5,6,8.1,7.5,4.3,3.7,2.1,2.2, 2.3, 2, 0.8, 0.3]
const dataWaste = [1.3,2.3,2,0.8,1.3,2.7,3.1,1.7,1.4,0.7,1,1]

const categories = [['Cupcake'],['Donut'], ['Eclair'],['Frozen yoghurt'],['Gingerbread'],['Honeycomb'],['Ice cream sandwich'],
['Jelly Bean'],['KitKat'],['Lollipop'], ['Marshmallow'], ['Nougat']]

const series =  [{
    name: 'Usage',
    data: dataUsage.slice(0,6)
  }, {
    name: 'Waste',
    data: dataWaste.slice(0,6)
  }
]
  
  const options = {
    chart: {
      id: 'usageOfEmployees',
      type: 'bar',
      height: 350,
      stacked: true,
      width: 50,
    //   foreColor: '#373d3f',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 300,
        animateGradually: {
            enabled: true,
            delay: 150
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
  
    fill: {
      colors: ['#e91e63', '#031d44'],
      opacity: 1
      }
  }


  // const dataEffectiveWeek = [23,23,24,25,13,12,14,13, 23, 20, 8, 13]
  // const dataNeutralWeek = [13,23,20,8,13,27,31,17,14,8,10,10]
  // const dataIneffectiveWeek = [11,12,15,15,21,14,14,17,12,10,11,11]

// const seriesWeek =  [{
//     name: 'Effective',
//     data: dataEffectiveWeek.slice(0,6)
//   }, {
//     name: 'Neutral',
//     data: dataNeutralWeek.slice(0,6)
//   }, {
//     name: 'Ineffective',
//     data: dataIneffectiveWeek.slice(0,6)
//   }]
  
//   const optionsWeek = {
//     series: seriesWeek
//   }
//   const optionsDay = {
//     series: series
//   }


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

      const newOptions = {
      series: [{
          name: 'Usage',
          data: dataUsage.slice(newBeginInd, newEndInd + 1)
        }, {
          name: 'Waste',
          data: dataWaste.slice(newBeginInd, newEndInd + 1)
        }],
        xaxis:{
          categories: categories.slice(newBeginInd, newEndInd + 1)
        }
      }
      setBeginInd(newBeginInd)
      setEndInd(newEndInd)
      ReactApexChart.exec("usageOfEmployees", 'updateOptions', newOptions, true)
    }

    const handleRightClick = event => {

        let newEndInd
        if (endInd > categories.length - 1 - 6) newEndInd = categories.length - 1
        else newEndInd = endInd + 6
        let newBeginInd = newEndInd-6 >= 0 ? newEndInd - 6 : 0

        const newOptions = {
          series: [{
              name: 'Usage',
              data: dataUsage.slice(newBeginInd, newEndInd + 1)
            }, {
              name: 'Waste',
              data: dataWaste.slice(newBeginInd, newEndInd + 1)
            }],
            xaxis:{
              categories: categories.slice(newBeginInd, newEndInd + 1)
            }
          }
        setBeginInd(newBeginInd)
        setEndInd(newEndInd)
        ReactApexChart.exec("usageOfEmployees", 'updateOptions', newOptions, true)
    }
    

    React.useEffect(() => {
      // if (timePeriod != 0 && timePeriod == props.timePeriod){}

      // else if(props.timePeriod == 2){
      //   ReactApexChart.exec("efficiencyOfEmployees", 'updateOptions', optionsWeek, true)  
      //   setTimePeriod(props.timePeriod)
      // }

      // else if(props.timePeriod == 1){
      //   ReactApexChart.exec("efficiencyOfEmployees", 'updateOptions', optionsDay, true)
      //   setTimePeriod(props.timePeriod)
      // }
    });



    console.log("END", endInd)
    console.log(catLen)
    return(
      <div>
          <Chart options={options} series={series} type="bar" height={370}  width={800}/>
          {props.timePeriod == 1 ? (<div className={classes.bottomArrows}>
            {beginInd === 0 ? (<div/>):(<Button onClick={handleLeftClick}><KeyboardArrowLeftIcon/></Button>)}
            {endInd === catLen - 1 ? (<div/>) : (<Button onClick={handleRightClick}><KeyboardArrowRightIcon/></Button>)}
          </div>) : (<div></div>)}
      </div>
    )
  }
