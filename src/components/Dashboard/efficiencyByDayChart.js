import React from 'react';
import Chart from 'react-apexcharts';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';



const styles = makeStyles((theme) => ({
  card:{
    boxShadow: "0px 10px 20px rgba(10, 1, 50, 0.3)",
    borderRadius: "25px",
    height: '415px'
  },
  header:
  {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(1),
  }
})); 




// const series = [
//     {
//         name: 'effectively',
//         data: [31]
//     }, 
//     {
//         name: 'neurtral',
//         data: [55]
//     },
//     {   
//         name: 'ineffective',
//         data: [41
//     }
// ]

const series = [31,55,41]


const options = {
  chart: {
    type: 'donut',
  },
  labels: ['Ineffective', 'Neutral', 'Effective'],
  fill: {
    colors: ['#030C54', '#56cfe1', '#80ffdb'],
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

                        // fontFamily: 'Helvetica, Arial, sans-serif',
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
                            if(val == 1) return val + ' hour'
                            return val + ' hours'
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
                          return w.globals.seriesTotals.reduce((a, b) => {
                            return a + b
                          }, 0) + ' hours'
                        }
                      }
                }
            }
        }
    },

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
            color: '#F50505'
        }
      },
    
    legend: {
    show: false
    },
}

  export default function efficiencyByHoursChart(){
    const  classes  = styles();
      return (
      <Card className={classes.card}>
          <div className={classes.header}>
            <Typography variant="h5">All day</Typography>
          </div>
        <Chart options={options} series={series} type="donut" />
      </Card>)
  }
  
  