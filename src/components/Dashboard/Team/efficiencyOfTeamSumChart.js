import React from 'react';
import Chart from 'react-apexcharts';
import ReactApexChart from 'apexcharts'



function minutesToHours(minutes){
  const hours = Math.floor(minutes/60)
  const min = minutes % 60
  if (hours != 0){
      if (min != 0) return  hours+ 'h' + ' ' + minutes%60 + 'm'
      return hours+'h'
  }
  return minutes%60+'m'
}   


const series = [54,92,181, 171]

const options = {
  chart: {
    type: 'donut',
    id: 'efficiencyOfEmployeesSum'
  },
  labels: ['Ineffective', 'Neutral', 'Effective', 'Without'],
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
                          return minutesToHours(w.globals.seriesTotals.reduce((a, b) => {
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


const seriesWeek = [21,100,123, 119]

const optionsWeek = {
  series: seriesWeek
}

const optionsDay = {
  series:series
}



  export default function EfficiencySumChart(props){
      const [timePeriod, setTimePeriod] = React.useState(0);
      React.useEffect(() => {
    
        if (timePeriod != 0 && timePeriod == props.timePeriod){}

        else if(props.timePeriod == 2){
          ReactApexChart.exec("efficiencyOfEmployeesSum", 'updateOptions', optionsWeek, true) 
          setTimePeriod(props.timePeriod)
        }

        else if(props.timePeriod == 1){
          ReactApexChart.exec("efficiencyOfEmployeesSum", 'updateOptions', optionsDay, true)  
          setTimePeriod(props.timePeriod)
        }
      });
      return (
        <Chart options={options} series={series} type="donut" />
      )
  }
  
  