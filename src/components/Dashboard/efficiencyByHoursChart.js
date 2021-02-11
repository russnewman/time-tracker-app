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
    // marginLeft: theme.spacing(5)
  }
}))


const dataA = [43,65,34,25,53,12,34,13, 23, 20, 8, 13, 27,31,37,24,28,20,10,19,16,14,19,54]
const dataB = [13,23,20,8,13,27,31,37,24,28,20,10,19,27,31,37,24,28,20,10,19,16,14,19,54]
const dataC = [11,17,15,15,21,14,14,17,22,20,15,31,9, 13, 23, 20, 8, 13, 27,31,37,24,28,20,47]
const categories = [['00:00','-','01:00'],['01:00','-','2:00'], ['02:00','-','3:00'],['03:00','-','04:00'],['04:00','-','5:00'],['05:00','-','6:00'],['06:00','-','7:00'],
['07:00','-','8:00'],['08:00','-','9:00'],['09:00','-','10:00'], ['10:00','-','11.00'], ['11:00','-','12:00'], ['12:00','-','13:00'],
['13:00','-','14:00'], ['14:00','-','15:00'],['15.00','-','16:00'],['16.00','-','17:00'],['17.00','-','18:00'],
['18.00','-','19:00'],['19.00','-','20:00'],['20.00','-','21:00'], ['21.00','-','22:00'], ['22.00','-','23:00'],['23.00','-','00:00']]

const series =  [{
    name: 'PRODUCT A',
    data: dataA.slice(8,20)
  }, {
    name: 'PRODUCT B',
    data: dataB.slice(8,20)
  }, {
    name: 'PRODUCT C',
    data: dataC.slice(8,20)
  }]
  
  
  const options = {
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
      categories: categories.slice(8, 20)
    },
  
    fill: {
      colors: ['#000C77', '#56cfe1', '#80ffdb'],
      opacity: 1
      },
  }



const seriesWeek =  [{
    name: 'Effective',
    data: [44, 55, 41, 67, 22, 13,12]
  }, {
    name: 'Neutral',
    data: [13, 23, 20, 8, 13, 27,31]
  }, {
    name: 'Ineffective',
    data: [11, 17, 15, 15, 21, 14,14]
  }]
  
  const optionsWeek = {
    series: seriesWeek,
    xaxis: {
      categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    },
  }

  const optionsDay = {
    series: series,
    xaxis: {
      categories:  categories.slice(8, 20)
    }
  }


  export default function EfficiencyByHoursChart(props){
    const classes = styles()

    const [timePeriod, setTimePeriod] = React.useState(0)
    const [beginInd, setBeginInd] = React.useState(8)
    // const [endInd, setEndInd] = React.useState(20)

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
          name: 'PRODUCT A',
          data: dataA.slice(newBeginInd, newBeginInd + 12)
        }, {
          name: 'PRODUCT B',
          data: dataB.slice(newBeginInd, newBeginInd + 12)
        }, {
          name: 'PRODUCT C',
          data: dataC.slice(newBeginInd, newBeginInd + 12)
        }],
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
          series: [{
            name: 'PRODUCT A',
            data: dataA.slice(newBeginInd, newBeginInd + 12)
          }, {
            name: 'PRODUCT B',
            data: dataB.slice(newBeginInd, newBeginInd + 12)
          }, {
            name: 'PRODUCT C',
            data: dataC.slice(newBeginInd, newBeginInd +12)
          }],
          xaxis:{
            categories: categories.slice(newBeginInd, newBeginInd + 12)
          }
        }
        setBeginInd(newBeginInd)
        ReactApexChart.exec("efficiency", 'updateOptions', newOptions, true)
    }
    

    React.useEffect(() => {
      if (timePeriod != 0 && timePeriod == props.timePeriod){}

      else if(props.timePeriod == 2){
        ReactApexChart.exec("efficiency", 'updateOptions', optionsWeek, true)  
        setTimePeriod(props.timePeriod)
      }

      else if(props.timePeriod == 1){
        ReactApexChart.exec("efficiency", 'updateOptions', optionsDay, true)
        setTimePeriod(props.timePeriod)
      }
    });



    return(
      <div>

          <Chart options={options} series={series} type="bar" height={370}  width={800}/>
          <div className={classes.bottomArrows}>
            <Button onClick={handleLeftClick}><KeyboardArrowLeftIcon/></Button>
            <Button onClick={handleRightClick}><KeyboardArrowRightIcon/></Button>
          </div>

      </div>
    )
  }
