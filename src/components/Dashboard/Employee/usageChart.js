import React from 'react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'apexcharts'


const series =  [{
    name: 'PRODUCT A',
    data: [44, 55, 41, 37, 22, 13,12,25,21,27,21,34,12],
  },
  {
    name: 'PRODUCT B',
    data: [16, 5, 19, 23, 38, 47,48,35,39,33,39,26,48]
  }]
  
  
  const options = {
    chart: {
      id: 'usage',
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
    states: {
      hover: {
          filter: {
              type: 'darken',
              value: 0.5,
          }
      },
    },
    xaxis: {
      categories: [['09:00','-','10:00'], ['10:00','-','11.00'], ['11:00','-','12:00'], ['12:00','-','13:00'],
        ['13:00','-','14:00'], ['14:00','-','15:00'],['15.00','-','16:00'],['16.00','-','17:00'],['17.00','-','18:00'],
        ['18.00','-','19:00'],['19.00','-','20:00'],['20.00','-','21:00'], ['21.00','-','22:00']
      ],
    },
  
    fill: {
      colors: ['#e91e63', '#031d44'],
      opacity: 1
      }
    
  }


  const seriesWeek =  [{
    name: 'PRODUCT A',
    data: [44, 55, 41, 37, 22, 13,12],
  },
  {
    name: 'PRODUCT B',
    data: [16, 5, 19, 23, 38, 47,48]
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
      categories: [['09:00','-','10:00'], ['10:00','-','11.00'], ['11:00','-','12:00'], ['12:00','-','13:00'],
        ['13:00','-','14:00'], ['14:00','-','15:00'],['15.00','-','16:00'],['16.00','-','17:00'],['17.00','-','18:00'],
        ['18.00','-','19:00'],['19.00','-','20:00'],['20.00','-','21:00'], ['21.00','-','22:00']
      ],
    }
  }
  

  export default function UsageByHoursChart(props){
    
    const [timePeriod, setTimePeriod] = React.useState(0);
    
      React.useEffect(() => {
    
        if (timePeriod != 0 && timePeriod == props.timePeriod){}

        else if(props.timePeriod == 2){
          ReactApexChart.exec("usage", 'updateOptions', optionsWeek, true) 
          setTimePeriod(props.timePeriod)
        }
 

        else if(props.timePeriod == 1){
          ReactApexChart.exec("usage", 'updateOptions', optionsDay, true)  
          setTimePeriod(props.timePeriod)
        }

      });

      return (
        <Chart options={options} series={series} type="bar" height={400}  width={'100%'}/>
      )
  }
  
  