import React from 'react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'apexcharts'
import EfficiencyService from '../../../services/efficiency.service'
import DateService from '../../../services/date.service'



const series = [0,0,0,0]
const options = {
  chart: {
    type: 'donut',
    id: 'efficiencyOfEmployeesSum'
  },
  labels: ['Effective', 'Neutral', 'Ineffective', 'Without'],
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
                        label: 'Average',
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


const getSeries = () => {
  const efficiencyForAllTeam = EfficiencyService.getEfficiencyFromSSAllTeam();
  let effectiveCurrentTotal = 0
  let neutralCurrentTotal = 0
  let ineffectiveCurrentTotal = 0
  let withoutCurrentTotal = 0

  let counter = 0
  let numOfWorkingDays = 1;
  for (const [key, value] of Object.entries(efficiencyForAllTeam)){
      if (counter == 0) {
        if (value.current.EFFECTIVE.length == 24) numOfWorkingDays = 1
        else if (value.current.EFFECTIVE.length == 7) numOfWorkingDays = 5
      }
      effectiveCurrentTotal += value.current.EFFECTIVE.reduce((a,b) => a + b)
      neutralCurrentTotal += value.current.NEUTRAL.reduce((a,b) => a + b)
      ineffectiveCurrentTotal += value.current.INEFFECTIVE.reduce((a,b) => a + b)
      withoutCurrentTotal += value.current.WITHOUT.reduce((a,b) => a + b)
      counter++
  }

  
  let effectiveCurrent = 0
  let neutralCurrent = 0
  let ineffectiveCurrent = 0
  let withoutCurrent = 0


  if (counter !== 0){
      effectiveCurrent = Math.floor(effectiveCurrentTotal/(counter * numOfWorkingDays))
      neutralCurrent = Math.floor(neutralCurrentTotal/(counter * numOfWorkingDays))
      ineffectiveCurrent = Math.floor(ineffectiveCurrentTotal/(counter * numOfWorkingDays))
      withoutCurrent =  Math.floor(withoutCurrentTotal/(counter * numOfWorkingDays))
  }
  return [effectiveCurrent, neutralCurrent, ineffectiveCurrent, withoutCurrent]
}

export default function EfficiencySumChart(props){
    
    React.useEffect(() => {

      const newSeries = getSeries()
      const newOptions = {
        series: newSeries
      }
      ReactApexChart.exec("efficiencyOfEmployeesSum", 'updateOptions', newOptions, true)  
    });
    return (
      <Chart options={options} series={series} type="donut" />
    )
}
  
  