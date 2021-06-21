//BUG
import React from 'react';
import Chart from 'react-apexcharts';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AuthService from '../../../services/auth.service'
import EfficiencyService from '../../../services/efficiency.service'
// import EfficiencyService from '../../../services/efficiency.service'
// import DateService from '../../../services/data.service'
import ReactApexChart from 'apexcharts';
import DateService from '../../../services/date.service';



const styles = makeStyles((theme) => ({
  bottomArrows:{
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1)*-2
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

const dataEffective = [121,60,143,90,41,200,100, 131, 300, 100, 57,99]
const dataNeutral =   [136,190,101,98,230,15,240, 23, 90,20,34,90]
const dataIneffective = [100,120,10,10,15,20, 11, 0,76,1.0,80,1]
const dataWithout = [200,55,104,210,100,201,0, 100, 10,99,20,33]

const dataEffectiveWeek = [121,230,240,250,130,120,140,123,243,120,86,135]
const dataNeutralWeek = [100,212,20,80,130,270,310,107,14,78,101,100]
const dataIneffectiveWeek = [20,120,150,154,76,45,13,67,72,50,61,21]
const dataWithoutWeek = [132,11,13,53,46,97,120,53,62,78,23,109]

//FIX
const maxYVal = 7200
const tickAmount = 2

  function computeNewOptions(beginInd, endInd, dataAndCategories){
    return {
      series: [
        {
          name: 'Ineffective',
          data: dataAndCategories.ineffective.slice(beginInd, endInd + 1)
        },
        {
        name: 'Neutral',
        data: dataAndCategories.neutral.slice(beginInd, endInd + 1)
      },
      {
        name: 'Effective',
        data: dataAndCategories.effective.slice(beginInd, endInd + 1)
      },
      {
        name: 'Without category',
        data: dataAndCategories.without.slice(beginInd, endInd + 1)
      }],
      xaxis:{
        categories: dataAndCategories.categories.slice(beginInd, endInd + 1)
      }
    }
  }


  const getEmployeesInfo = () =>{
    let res = []
    let tmp = AuthService.getCurrentUser().employees.slice()
    tmp.push(AuthService.getCurrentUser().userInfo)
    let employeeList = tmp
    employeeList.forEach(employee => {
      res.push({
        "id": employee.id,
        "name": employee.fullName
      })
    })
    return res
  }


  const getDataAndCategories = () =>{

    let categories = []
    let effective = []
    let neutral = []
    let ineffective = []
    let without = []

    let efficiencyAllTeam = EfficiencyService.getEfficiencyFromSSAllTeam()
    let employeeInfoList = getEmployeesInfo()
    console.log(employeeInfoList)

    for (const [key, value] of Object.entries(efficiencyAllTeam)){
        for (let employeeInfo of employeeInfoList){
          console.log(employeeInfo)
          console.log(key)
          if (employeeInfo.id == key){
            console.log('HERE')
            categories.push([employeeInfo.name])
            break;
          }
        }
        let numOfWorkingDays = 1
        if (value.current.EFFECTIVE.length === 7) numOfWorkingDays = 5

        effective.push(Math.floor(value.current.EFFECTIVE.reduce((a,b) => a + b)/numOfWorkingDays))
        neutral.push(Math.floor(value.current.NEUTRAL.reduce((a,b) => a + b)/numOfWorkingDays))
        ineffective.push(Math.floor(value.current.INEFFECTIVE.reduce((a,b) => a + b)/numOfWorkingDays))
        without.push(Math.floor(value.current.WITHOUT.reduce((a,b) => a + b)/numOfWorkingDays))
    }

    return {
      categories: categories,
      effective: effective,
      neutral: neutral,
      ineffective: ineffective,
      without: without
    }
  }


  export default function EfficiencyByHoursChart(props){
    const classes = styles()

    const dataAndCategories = getDataAndCategories()
    // const catLen = dataAndCategories.categories.length

    // console.log(catLen)
    // const eInd = Math.min(ca)
    // console.log(dataAndCategories.categories)
    const [timePeriod, setTimePeriod] = React.useState(0)
    const [beginInd, setBeginInd] = React.useState(0)
    const [endInd, setEndInd] = React.useState(Math.min(dataAndCategories.categories.length, 6))

    const series =  [
      {
        name: 'Неэффективно',
        data: dataAndCategories.ineffective.slice(0,6),
      },
      {
        name: 'Нейтрально',
        data: dataAndCategories.neutral.slice(0,6)
      }, 
      {
        name: 'Эффективно',
        data: dataAndCategories.effective.slice(0,6)
      }, 
      {
        name: 'Без категории',
        data: dataAndCategories.without.slice(0,6)
      }
    ]

    const options = {
      chart: {
        id: 'efficiencyOfEmployees',
        type: 'bar',
        height: 350,
        stacked: true,
        width: 1,
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
              speed: 350
          }
       },
      toolbar:{
        show: false
      }
      },
  
      plotOptions: {
        bar: {
          borderRadius: 0,
          columnWidth: '5%',
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
          categories: dataAndCategories.categories.slice(0, 6),
          labels: {rotate: -45}
      }
      ,
      yaxis:{
  
        min: 0,
        max: maxYVal,
        tickAmount: 2,
  
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
          formatter: (value) => { return DateService.secondsToHours(value)},
        },
      },
    
      fill: {
        colors: ['#d90368', '#f5cc00', '#00cc99', '#bcb8b1'],
        opacity: 1
        },
    }
    
    const handleLeftClick = event => {

      let newBeginInd
      if (beginInd < 6)  newBeginInd = 0
      else newBeginInd = beginInd - 6
      let newEndInd = newBeginInd + 6 <= dataAndCategories.categories.length -1 ? newBeginInd + 6 : dataAndCategories.categories.length - 1

      // let dataE, dataN, dataI, dataW
      // if (timePeriod === 2){
      //   dataE = dataEffectiveWeek
      //   dataN = dataNeutralWeek
      //   dataI = dataIneffectiveWeek
      //   dataW = dataWithoutWeek
      // }
      // else {
      //   dataE = dataEffective
      //   dataN = dataNeutral
      //   dataI = dataIneffective
      //   dataW = dataWithout
      // }
      const newOpt = computeNewOptions(newBeginInd, newEndInd, dataAndCategories)
      setBeginInd(newBeginInd)
      setEndInd(newEndInd)
      ReactApexChart.exec("efficiencyOfEmployees", 'updateOptions', newOpt, true)
    }

    const handleRightClick = event => {

        let newEndInd
        if (endInd > dataAndCategories.categories.length - 1 - 6) newEndInd = dataAndCategories.categories.length - 1
        else newEndInd = endInd + 6
        let newBeginInd = newEndInd-6 >= 0 ? newEndInd - 6 : 0
        
        // let dataE, dataN, dataI, dataW
        // if (timePeriod === 2){
        //   dataE = dataEffectiveWeek
        //   dataN = dataNeutralWeek
        //   dataI = dataIneffectiveWeek
        //   dataW = dataWithoutWeek
        // }
        // else {
        //   dataE = dataEffective
        //   dataN = dataNeutral
        //   dataI = dataIneffective
        //   dataW = dataWithout
        // }
        const newOpt = computeNewOptions(newBeginInd, newEndInd, dataAndCategories)
        setBeginInd(newBeginInd)
        setEndInd(newEndInd)
        ReactApexChart.exec("efficiencyOfEmployees", 'updateOptions', newOpt, true)
    }
    

    // React.useEffect(() => {
    //   if (timePeriod != 0 && timePeriod == props.timePeriod){}

    //   else if(props.timePeriod == 2){
    //     const newOpt = computeNewOptions(beginInd, endInd, dataEffectiveWeek, dataNeutralWeek, dataIneffectiveWeek, dataWithoutWeek)
    //     ReactApexChart.exec("efficiencyOfEmployees", 'updateOptions', newOpt, true)  
    //     setTimePeriod(props.timePeriod)
    //   }

    //   else if(props.timePeriod == 1){
    //     const newOpt = computeNewOptions(beginInd, endInd, dataEffective, dataNeutral, dataIneffective, dataWithout)
    //     ReactApexChart.exec("efficiencyOfEmployees", 'updateOptions', newOpt, true)
    //     setTimePeriod(props.timePeriod)
    //   }
    // });

    return(
      <div>
          <Chart options={options} series={series} type="bar" height={370}  width={'100%'}/>
          <div className={classes.bottomArrows}>
            {beginInd === 0 ? (<Button disabled><KeyboardArrowLeftIcon/></Button>):(<Button onClick={handleLeftClick}><KeyboardArrowLeftIcon/></Button>)}
            {endInd === dataAndCategories.categories.length ? (<Button disabled><KeyboardArrowRightIcon/></Button>) : (<Button onClick={handleRightClick}><KeyboardArrowRightIcon/></Button>)}
          </div>)
      </div>
    )
  }
