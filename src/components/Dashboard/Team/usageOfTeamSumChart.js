import React from 'react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'apexcharts'


const series = [404,55]


function minutesToHours(minutes){
  const hours = Math.floor(minutes/60)
  const min = minutes % 60
  if (hours != 0){
      if (min != 0) return  hours+ 'h' + ' ' + minutes%60 + 'm'
      return hours+'h'
  }
  return minutes%60+'m'
}   


const options = {
  chart: {
    type: 'donut',
    id: 'usageOfEmployeesSum'
  },
  labels: ['Using', 'Waste'],
  fill: {
    colors: ['#e91e63', '#031d44'],
    opacity: 1
    },
  plotOptions: {
        pie: {
            donut: {
                labels: {
                    show: true,
                    name: {
                        show: true,
                        fontSize: '25px',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 700,
                        color: '#373d3f',
                        formatter: function (val) {
                            return val
                        }
                    },
                    value: {
                        show: true,
                        fontSize: '16px',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 100,
                        color: '#373d3f',
                        offsetY: 16,
                        formatter: function (val) {
                            return minutesToHours(val)
                        }
                    },
                    total: {
                        show: true,
                        showAlways: false,
                        label: 'Average',
                        fontSize: '22px',
                        fontFamily: 'Roboto, sans-seri',
                        fontWeight: 700,
                        color: '#373d3f',
                        formatter: function (w) {
                            console.log("ASDSA",w.globals)
                          return minutesToHours(w.globals.seriesTotals.reduce((a, b) => {
                            return a + b
                          }, 0))
                        }
                      }
                }
            }
        }
    },

    tooltip:{enabled: false},

    colors: ['#030C54', '#56cfe1', '#80ffdb'],
    dataLabels: {
        enabled: true,
        dropShadow: {
            enabled: false
        },
        background: {
            enabled: false
        },
        style: {
            fontSize: '14px',
            fontFamily: 'Roboto, sans-seri',
            fontWeight: 100,
            colors: ['#ffffff', '#ffffff']
        }
      },
    legend: {
    show: false
    },
}


const seriesWeek = [450,77]
const optionsWeek = {
  series: seriesWeek
}
const optionsDay = {
  series:series
}



export default function UsageOfTeamSumChart(props){

    const [timePeriod, setTimePeriod] = React.useState(0);
    
    React.useEffect(() => {
  
      if (timePeriod != 0 && timePeriod == props.timePeriod){}

      else if(props.timePeriod == 2){
        ReactApexChart.exec("usageOfEmployeesSum", 'updateOptions', optionsWeek, true) 
        setTimePeriod(props.timePeriod)
      }

      else if(props.timePeriod == 1){
        ReactApexChart.exec("usageOfEmployeesSum", 'updateOptions', optionsDay, true)  
        setTimePeriod(props.timePeriod)
      }
    });
    return (
      <Chart options={options} series={series} type="donut" width={'100%'} height={'80%'}/>
    )
}
  
  