import React from 'react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'apexcharts'
import { FaRegClosedCaptioning } from 'react-icons/fa';

import EfficiencyService from '../../../services/efficiency.service'


// const series = [127,172,61, 76]

function secondsToHours(seconds){
  const hours = Math.floor(seconds/3600)
  const minutes = Math.floor(seconds % 3600 / 60)
  const sec = seconds % 3600 % 60

  if (hours != 0){
      if (minutes != 0){
        if (sec != 0) return  hours+ 'h' + ' ' + minutes + 'm' + ' ' + sec + 's'
        return hours+ 'h' + ' ' + minutes + 'm'
      } 
      return hours+'h'
  }
  if (minutes != 0){
    if (sec != 0) return minutes + 'm' + ' ' + sec + 's'
    return  minutes + 'm'
  }
  return sec + 's'
}   


const options = {
  chart: {
    type: 'donut',
    id: 'efficiencySum'
  },
  labels: ['Ineffective', 'Neutral', 'Effective', 'Without category'],
  fill: {
    colors: ['#d90368', '#ffee32', '#00cc99', '#bcb8b1'],
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
                            return secondsToHours(val)
                        }
                    },
                    total: {
                        show: true,
                        showAlways: false,
                        label: 'Total',
                        fontSize: '22px',
                        fontFamily: 'Roboto, sans-seri',
                        fontWeight: 700,
                        color: '#373d3f',
                        formatter: function (w) {
                          return secondsToHours(w.globals.seriesTotals.reduce((a, b) => {
                            return a + b
                          }, 0))
                        }
                      }
                }
            }
        }
    },

    tooltip: {
      enabled: false
    },
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
            colors:['#020202', '#020202', '#020202', '#020202']
        }
      },
    
    legend: {
      show: false
    },
}


const seriesWeek = [142,67,121, 100]

// const optionsWeek = {
//   series: seriesWeek,
//   plotOptions: {
//     pie: {
//         donut: {
//             labels: {
//                 total: {
//                     label: 'Average',
//                     formatter: function (w) {
//                       return minutesToHours(w.globals.seriesTotals.reduce((a, b) => {
//                         return a + b
//                       }, 0))
//                     }
//                   }
//               }
//           }
//       }
//     }
// }

// const optionsDay = {
//   series:series,
//   plotOptions: {
//     pie: {
//         donut: {
//             labels: {
//                 total: {label: 'Total'}
//             }
//           }
//       }
//   }
// }

const getOptions = (series, timePeriod) => {
  if (timePeriod == 1 || timePeriod == 0){
    return {
      series:series,
      plotOptions: {
        pie: {
            donut: {
                labels: {
                    total: {label: 'Total'}
                }
            }
        }
      }
    }
  }

  return  {
    series: series,
    plotOptions: {
      pie: {
          donut: {
              labels: {
                  total: {
                      label: 'Average',
                      formatter: function (w) {
                        return secondsToHours(w.globals.seriesTotals.reduce((a, b) => {
                          return a + b
                        }, 0))
                      }
                    }
                }
            }
          }
        }
    }
}



const getSeries = (efficiency, timePeriod) =>{

  let effective, neutral, ineffective, without
  
  if(timePeriod == 1){
    effective = efficiency.EFFECTIVE.reduce((a, b) => a + b)
    neutral = efficiency.NEUTRAL.reduce((a, b) => a + b)
    ineffective = efficiency.INEFFECTIVE.reduce((a, b) => a + b)
    without = efficiency.WITHOUT.reduce((a, b) => a + b)
  }
  else if (timePeriod == 2){
    // console.log("Efficiency", efficiency)


    const numberOfWorkingDays = 5

    effective = Math.floor(efficiency.EFFECTIVE.reduce((a, b) => (a + b)) / numberOfWorkingDays);
    neutral = Math.floor(efficiency.NEUTRAL.reduce((a, b) => (a + b)) / numberOfWorkingDays);
    ineffective = Math.floor(efficiency.INEFFECTIVE.reduce((a, b) => (a + b)) / numberOfWorkingDays);
    without = Math.floor(efficiency.WITHOUT.reduce((a, b) => (a + b)) / numberOfWorkingDays);
  }

  return [effective, neutral, ineffective, without]
}


  export default function EfficiencySumChart(props){

      const [timePeriod, setTimePeriod] = React.useState(0);
      const [date, setDate] = React.useState(new Date())
      
      React.useEffect(() => {
    
        if (timePeriod != 0 && timePeriod == props.timePeriod && date == props.date){}
        else{
          // setTimePeriod(props.timePeriod)
          const ser = getSeries(EfficiencyService.getEfficiencyFromSessionStorage('3').efficiency.current, props.timePeriod)
          const opt = getOptions(ser, props.timePeriod)
          ReactApexChart.exec("efficiencySum", 'updateOptions', opt, true)  
        }

        // else if(props.timePeriod == 2){
        //   ReactApexChart.exec("efficiencySum", 'updateOptions', optionsWeek, true) 
        //   setTimePeriod(props.timePeriod)
        // }

        // else if(props.timePeriod == 1){

        //   ReactApexChart.exec("efficiencySum", 'updateOptions', optionsDay, true)  
        //   setTimePeriod(props.timePeriod)
        // }
      });
      return (
        <Chart options={options} series={getSeries(EfficiencyService.getEfficiencyFromSessionStorage('3').efficiency.current, timePeriod)} type="donut" width={'100%'} height={'80%'} />
      )
  }
  
  