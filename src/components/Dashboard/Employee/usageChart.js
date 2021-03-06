// import React from 'react';
// import Chart from 'react-apexcharts';
// import ReactApexChart from 'apexcharts'
// import {Button } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';



// import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';



// const styles = makeStyles((theme) => ({
//   bottomArrows:{
//     display: "flex",
//     justifyContent: "center",
//     marginTop: theme.spacing(1)*-2
//   }
// }))



// const dataUsing = [44, 50, 41, 37, 22, 13,12,25,21,27,21,34,12, 44, 50, 41, 37, 22, 13,12,25,21,27,21,34,12]
// const dataWaste = [11, 5, 19, 20, 30, 41,43,30,19,21,30,16,48, 11, 5, 19, 20, 30, 41,43,30,19,21,30,16,48]
// const categories = [['09:00','-','10:00'], ['10:00','-','11.00'], ['11:00','-','12:00'], ['12:00','-','13:00'],
//         ['13:00','-','14:00'], ['14:00','-','15:00'],['15.00','-','16:00'],['16.00','-','17:00'],['17.00','-','18:00'],
//         ['18.00','-','19:00'],['19.00','-','20:00'],['20.00','-','21:00'], ['21.00','-','22:00']]

// const series =  [{
//     name: 'using',
//     data: dataUsing.slice(8, 20)
//   },
//   {
//     name: 'waste',
//     data: dataWaste.slice(8, 20)
//   }]
  
//   const options = {
//     chart: {
//       id: 'usage',
//       type: 'bar',
//       height: 350,
//       stacked: true,
//       width: 50,
//       foreColor: '#373d3f',
//       animations: {
//         enabled: true,
//         easing: 'easeinout',
//         speed: 800,
//         animateGradually: {
//             enabled: true,
//             delay: 150
//         },
//         dynamicAnimation: {
//             enabled: true,
//             speed: 350
//         }
      
//         },
//         toolbar:{
//             show: false
//         }
//     },
  
//     plotOptions: {
//       bar: {
//         borderRadius: 6,
//         columnWidth: '25%',
//       }
//     },
//     dataLabels: {
//       enabled: false
//     },
//     legend: {
//       show: false
//     },
//     states: {
//       hover: {
//           filter: {
//               type: 'darken',
//               value: 0.5,
//           }
//       },
//     },
//     xaxis: {
//       categories: categories
//     },
  
//     fill: {
//         colors: ['#e91e63', '#031d44'],
//         opacity: 1
//       }
    
//   }


//   const seriesWeek =  [{
//     name: 'PRODUCT A',
//     data: [44, 55, 41, 37, 22, 13,12],
//   },
//   {
//     name: 'PRODUCT B',
//     data: [16, 5, 19, 23, 38, 47,48]
//   }]

//   const optionsWeek = {
//     series: seriesWeek,
//     xaxis: {
//       categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
//     },
//   }

//   const optionsDay = {
//     series: series,
//     xaxis: {
//       categories: categories
//     }
//   }
  


//   function computeNewOptions(beginInd, endInd, dataUsing, dataWaste, categories){
//     return {
//       series: [{
//           name: 'Using',
//           data: dataUsing.slice(beginInd, endInd)
//         }, {
//           name: 'Waste',
//           data: dataWaste.slice(beginInd, endInd)
//         }],
//         xaxis:{
//           categories: categories.slice(beginInd, endInd)
//         }
//       }
//   }


//   export default function UsageByHoursChart(props){

//     const classes = styles()

//     const [timePeriod, setTimePeriod] = React.useState(0)
//     const [beginInd, setBeginInd] = React.useState(8)
//     const [endInd, setEndInd] = React.useState(20)
//     const catLen = categories.length

//     // const [endInd, setEndInd] = React.useState(20)

//     const handleLeftClick = event => {

//       if (beginInd == 0) return

//       let newBeginInd = beginInd
//       if (beginInd == 8){
//         newBeginInd = 0
//       }
//       else if (beginInd == 12){
//         newBeginInd = 8
//       }

//       const newOpt = computeNewOptions(newBeginInd, newBeginInd + 12, dataUsing, dataWaste, categories)
//       console.log("NO", newOpt)
//       // {
//       // series: [{
//       //     name: 'Effective',
//       //     data: dataA.slice(newBeginInd, newBeginInd + 12)
//       //   }, {
//       //     name: 'Neutral',
//       //     data: dataB.slice(newBeginInd, newBeginInd + 12)
//       //   }, {
//       //     name: 'Ineffective',
//       //     data: dataC.slice(newBeginInd, newBeginInd + 12)
//       //   },
//       //   {
//       //     name: 'Without category',
//       //     data: dataD.slice(newBeginInd, newBeginInd + 12)
//       //   }],
//       //   xaxis:{
//       //     categories: categories.slice(newBeginInd, newBeginInd + 12)
//       //   }
//       // }
//       setBeginInd(newBeginInd)
//       setEndInd(newBeginInd + 12)
//       ReactApexChart.exec("usage", 'updateOptions', newOpt, true)
//     }

//     const handleRightClick = event => {

//         if (beginInd == 12) return

//         let newBeginInd = beginInd
//         if (beginInd == 0) newBeginInd = 8
//         else if (beginInd == 8) newBeginInd = 12

//         const newOptions = computeNewOptions(newBeginInd, newBeginInd + 12, dataUsing, dataWaste, categories)
//         // {
//         //   series: [{
//         //     name: 'Effective',
//         //     data: dataA.slice(newBeginInd, newBeginInd + 12)
//         //   }, {
//         //     name: 'Neutral',
//         //     data: dataB.slice(newBeginInd, newBeginInd + 12)
//         //   }, {
//         //     name: 'Ineffective',
//         //     data: dataC.slice(newBeginInd, newBeginInd +12)
//         //   },
//         //   {
//         //     name: 'Without category',
//         //     data: dataD.slice(newBeginInd, newBeginInd +12)
//         //   }
//         // ],
//         //   xaxis:{
//         //     categories: categories.slice(newBeginInd, newBeginInd + 12)
//         //   }
//         // }
//         setBeginInd(newBeginInd)
//         setEndInd(newBeginInd + 12)
//         ReactApexChart.exec("usage", 'updateOptions', newOptions, true)
//     }


        
//       React.useEffect(() => {
    
//         if (timePeriod != 0 && timePeriod == props.timePeriod){}

//         else if(props.timePeriod == 2){
//           ReactApexChart.exec("usage", 'updateOptions', optionsWeek, true) 
//           setTimePeriod(props.timePeriod)
//         }
 

//         else if(props.timePeriod == 1){
//           ReactApexChart.exec("usage", 'updateOptions', optionsDay, true)  
//           setTimePeriod(props.timePeriod)
//         }

//       });

//       return (
//         <div>
//           <Chart options={options} series={series} type="bar" height={370}  width={'100%'}/>


//           {timePeriod === 1 && (<div className={classes.bottomArrows}>
//               {beginInd === 0 ? (<Button disabled><KeyboardArrowLeftIcon/></Button>):(<Button onClick={handleLeftClick}><KeyboardArrowLeftIcon/></Button>)}
//               {endInd === catLen - 1 ? (<Button disabled><KeyboardArrowRightIcon/></Button>) : (<Button onClick={handleRightClick}><KeyboardArrowRightIcon/></Button>)}
//           </div>)}

          
//           {/* {timePeriod === 2 && (<div className={classes.bottomArrows}>
//               {beginInd === 0 ? (<Button disabled><KeyboardArrowLeftIcon/></Button>):(<Button onClick={handleLeftClick}><KeyboardArrowLeftIcon/></Button>)}
//               {endInd === catLen - 1 ? (<Button disabled><KeyboardArrowRightIcon/></Button>) : (<Button onClick={handleRightClick}><KeyboardArrowRightIcon/></Button>)}
//             </div>)} */}
//         </div>
//       )
//   }
  
  



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


function minutesToHours(minutes){
  const hours = Math.floor(minutes/60)
  const min = minutes % 60
  if (hours != 0){
      if (min != 0) return  hours+ 'h' + ' ' + minutes%60 + 'm'
      return hours+'h'
  }
  return minutes%60+'m'
}   

const maxYVal = 600
const tickAmount = 5


const dataUsing = [0,0,0,0,0,0,0,0, 23, 20, 8, 13, 17,11,12,12 ,20,20,10,19,16,14,19,14]
const dataWaste = [0,0,0,0,0,0,0,17,14,8,10,10,11,2,11,11,4,0,12,10,0,11,14,12,14]


const categories = [['00:00','-','01:00'],['01:00','-','2:00'], ['02:00','-','3:00'],['03:00','-','04:00'],['04:00','-','5:00'],['05:00','-','6:00'],['06:00','-','7:00'],
['07:00','-','8:00'],['08:00','-','9:00'],['09:00','-','10:00'], ['10:00','-','11.00'], ['11:00','-','12:00'], ['12:00','-','13:00'],
['13:00','-','14:00'], ['14:00','-','15:00'],['15.00','-','16:00'],['16.00','-','17:00'],['17.00','-','18:00'],
['18.00','-','19:00'],['19.00','-','20:00'],['20.00','-','21:00'], ['21.00','-','22:00'], ['22.00','-','23:00'],['23.00','-','00:00']]

const series =  [ 
  {
    name: 'Using',
    data: dataUsing.slice(8,20)
  },
  {
    name: 'Waste',
    data: dataWaste.slice(8,20)
  }
]
  
  
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
        speed: 300,
        animateGradually: {
            enabled: true,
            delay: 1
        },
        dynamicAnimation: {
            enabled: true,
            speed: 450
        }
      },
      toolbar:{show: false}
    },
  
    plotOptions: {
      bar: {
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
    yaxis:{
      min: 0,
      max: 60,
      tickAmount: 6,
      labels: {
        show: true,
        align: 'right',
        minWidth: 0,
        maxWidth: 160,
        style: {
            colors: [],
            fontSize: '12px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 900,
        },
        formatter: (value) => { return value + 'm' },
      },
    },
    fill: {
      colors: ['#e91e63', '#031d44'],
      opacity: 1
      },
  }


const seriesWeek =  [
  {
    name: 'Using',
    data: [320, 217, 400, 423, 314, 0,0]
  },
  {
    name: 'Waste',
    data: [23, 21, 79, 85, 34, 0,0]
  }
]
  
  const optionsWeek = {
    series: seriesWeek,
    xaxis: {
      categories: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    },
    yaxis:{
      min: 0,
      max: maxYVal,
      tickAmount: tickAmount,
      labels: {
        formatter: (value) => { return minutesToHours(value) },
      },
    },
  }

  const optionsDay = {
    series: series,
    xaxis: {
      categories:  categories.slice(8, 20)
    },
    yaxis:{
      min: 0,
      max: 60,
      tickAmount: 6,
      labels: {
        formatter: (value) => { return value + 'm'  },
      },
    },
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
          name: 'Using',
          data: dataUsing.slice(newBeginInd, newBeginInd + 12)
        }, {
          name: 'Waste',
          data: dataWaste.slice(newBeginInd, newBeginInd + 12)
        }],
        xaxis:{
          categories: categories.slice(newBeginInd, newBeginInd + 12)
        }
      }
      setBeginInd(newBeginInd)
      ReactApexChart.exec("usage", 'updateOptions', newOpt, true)
    }

    const handleRightClick = event => {

        if (beginInd == 12) return

        let newBeginInd = beginInd
        if (beginInd == 0) newBeginInd = 8
        else if (beginInd == 8) newBeginInd = 12

        const newOptions = {
          series: [{
            name: 'Using',
            data: dataUsing.slice(newBeginInd, newBeginInd + 12)
          }, {
            name: 'Waste',
            data: dataWaste.slice(newBeginInd, newBeginInd + 12)
          }
        ],
          xaxis:{
            categories: categories.slice(newBeginInd, newBeginInd + 12)
          }
        }
        setBeginInd(newBeginInd)
        ReactApexChart.exec("usage", 'updateOptions', newOptions, true)
    }
    

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



    return(
      <div>

          <Chart options={options} series={series} type="bar" height={370}  width={'100%'}/>
          {props.timePeriod == 1 ? (<div className={classes.bottomArrows}>
            <Button onClick={handleLeftClick}><KeyboardArrowLeftIcon/></Button>
            <Button onClick={handleRightClick}><KeyboardArrowRightIcon/></Button>
          </div>) : (<div></div>)}
      </div>
    )
  }
