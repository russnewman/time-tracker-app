import React from 'react';
import Chart from 'react-apexcharts';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

import ReactApexChart from 'apexcharts';

const seriesEffectiveDay =  [{
      name: 'PRODUCT A',
      data: [44, 55, 41, 57, 22, 13, 12, 25,21,27,21,34,12]
}]
    
const seriesIneffectiveDay =  [{
  name: 'PRODUCT C',
  data: [11, 17, 15, 15, 21, 14,14,17,22,20,15,31,9]
}]

const seriesNeutralDay =  [{
  name: 'PRODUCT B',
  data: [13, 23, 20, 8, 13, 27,31,37,24,28,20,10,19]
}]

  const optionsEffective = {
    chart: {
      id: 'effective',
      type: 'area',
      height: 350,
      stacked: true,
      width: 50,
      colors :['#80ffdb'],
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
      categories: [['09:00','-','10:00'], ['10:00','-','11.00'], ['11:00','-','12:00'], ['12:00','-','13:00'],
        ['13:00','-','14:00'], ['14:00','-','15:00'],['15.00','-','16:00'],['16.00','-','17:00'],['17.00','-','18:00'],
        ['18.00','-','19:00'],['19.00','-','20:00'],['20.00','-','21:00'], ['21.00','-','22:00']
      ],
    },

    
    stroke: {
          curve: 'smooth'
        },

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
    colors :['#80ffdb'],

  }

  const optionsEffectiveDay = {
    series: seriesEffectiveDay,
    xaxis: {
      categories: [['09:00','-','10:00'], ['10:00','-','11.00'], ['11:00','-','12:00'], ['12:00','-','13:00'],
        ['13:00','-','14:00'], ['14:00','-','15:00'],['15.00','-','16:00'],['16.00','-','17:00'],['17.00','-','18:00'],
        ['18.00','-','19:00'],['19.00','-','20:00'],['20.00','-','21:00'], ['21.00','-','22:00']
      ],
    },
    colors :['#80ffdb']

  }



export default function EffectiveLineChart(props){

    const [timePeriod, setTimePeriod] = React.useState(0);
    const [effectiveType, setEffectiveType] = React.useState(0)


    React.useEffect(() => {

      let optionsEffective;
      let optionsNeutral;
      let optionsIneffective
    
      if (timePeriod != 0 && timePeriod == props.timePeriod && effectiveType == props.effectiveType){return}

      if(props.timePeriod == 2){
        optionsEffective = optionsEffectiveWeek
        ///!!!
        optionsNeutral = optionsNeutralDay
        optionsIneffective = optionsIneffectiveDay
        setTimePeriod(props.timePeriod)
      }

      else if(props.timePeriod == 1){
        optionsEffective = optionsEffectiveDay
        ///!!!
        optionsNeutral = optionsNeutralDay
        optionsIneffective = optionsIneffectiveDay


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
        
    });
    return(
        <Chart options={optionsEffective} series={seriesEffectiveDay} type="area" height={400}  width={1225}/>
    )
  }