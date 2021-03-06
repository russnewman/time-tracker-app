import React from 'react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'apexcharts'
import { FaRegClosedCaptioning } from 'react-icons/fa';
import pure from 'recompose/pure'

import EfficiencyService from '../../../services/efficiency.service'
import DateService from '../../../services/date.service'


const getOptions = (series, timePeriod) => {
  if (timePeriod == 1 || timePeriod == 0){
    return {
      series:series,
      plotOptions: {
        pie: {
            donut: { 
                labels: {
                    total: {label: 'Всего'}
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
                      label: 'В среднем',
                      formatter: function (w) {
                        return DateService.secondsToHours(w.globals.seriesTotals.reduce((a, b) => {
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

const updateChart = (opt) =>{
  ReactApexChart.exec("efficiencySum", 'updateOptions', opt, true)  
}


const getSeries = (efficiency, timePeriod) =>{

  let effective, neutral, ineffective, without

  if(timePeriod == 1 || timePeriod == 0){
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


const series = [0,0,0,0]
const options = {
  chart: {
    type: 'donut',
    id: 'efficiencySum'
  },
  labels: ['Эффективно', 'Нейтрально', 'Неэффективно', 'Без категории'],
  fill: {
    colors: ['#00cc99', '#ffee32', '#d90368', '#bcb8b1'],
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
                            return DateService.secondsToHours(val)
                        }
                    },
                    total: {
                        show: true,
                        showAlways: false,
                        label: 'Loasd',
                        fontSize: '22px',
                        fontFamily: 'Roboto, sans-seri',
                        fontWeight: 700,
                        color: '#373d3f',
                        formatter: function (w) {
                          return DateService.secondsToHours(w.globals.seriesTotals.reduce((a, b) => {
                            return a + b
                          }, 0))
                        }
                      }
                }
            }
        }
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
    legend: {show: false},
    tooltip: {enabled: false},
}


  function EfficiencySumChart(props){
      const employeeId = props.employeeId

      React.useEffect(() => {
        const ser = getSeries(EfficiencyService.getEfficiencyFromSessionStorage(employeeId).current, props.timePeriod)
        const options = getOptions(ser, props.timePeriod)
        ReactApexChart.exec("efficiencySum", 'updateOptions', options, true)
      });
      return (
        <Chart options={options} series={series} type="donut" width={'100%'} height={'80%'} />
      )
  }

  export default pure(EfficiencySumChart)
  
  