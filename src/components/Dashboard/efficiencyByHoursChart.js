import React from 'react';
import Chart from 'react-apexcharts';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';



const styles = makeStyles((theme) => ({
  card:{
    boxShadow: "0px 10px 20px rgba(10, 1, 50, 0.3)",
    borderRadius: "25px",
  }
})); 


const series =  [{
    name: 'PRODUCT A',
    data: [44, 55, 41, 67, 22, 13,12,25,21,27,21,34,12]
  }, {
    name: 'PRODUCT B',
    data: [13, 23, 20, 8, 13, 27,31,37,24,28,20,10,19]
  }, {
    name: 'PRODUCT C',
    data: [11, 17, 15, 15, 21, 14,14,17,22,20,15,31,9]
  }]
  
  
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      width: 50,
      foreColor: '#373d3f',
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
    zoom: {
      enabled: false,
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
      categories: [['09:00','-','10:00'], ['10:00','-','11.00'], ['11:00','-','12:00'], ['12:00','-','13:00'],
        ['13:00','-','14:00'], ['14:00','-','15:00'],['15.00','-','16:00'],['16.00','-','17:00'],['17.00','-','18:00'],
        ['18.00','-','19:00'],['19.00','-','20:00'],['20.00','-','21:00'], ['21.00','-','22:00']
      ],
    },
  
    fill: {
      colors: ['#030C54', '#56cfe1', '#80ffdb'],
      opacity: 1
      },
    
  }
  

  export default function efficiencyByHoursChart(){
    const  classes  = styles();
      return (
      <Card className={classes.card}>
        <Chart options={options} series={series} type="bar" height={400}  width={800}/>
      </Card>)
  }
  
  