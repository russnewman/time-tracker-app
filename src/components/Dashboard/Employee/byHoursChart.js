import React from 'react';
import Chart from 'react-apexcharts';
import { makeStyles } from '@material-ui/core/styles';

import ResourcesService from '../../../services/resources.service'
import DateService from '../../../services/date.service'


const styles = makeStyles((theme) => ({
  bottomArrows:{
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1)*-2
    // marginLeft: theme.spacing(5)
  }
}))


function createData(resource, type, startTime, endTime){
  return {
    resource: resource,
    type: type,
    startTime: startTime,
    endTime: endTime
  }
}


// const resourses = [
//   createData("music.yandex.ru/home", 'neutral', new Date(2021, 2, 25, 3, 10), new Date(2021, 2, 25, 3, 23)),
//   createData('spring.io/', 'effective', new Date(2021, 2, 25, 12, 10), new Date(2021, 2, 25, 12, 17)),
//   createData('www.youtube.com/', 'ineffective', new Date(2021, 2, 25, 12, 17), new Date(2021, 2, 25, 12, 20)),
//   createData('spring.io/', 'effective', new Date(2021, 2, 25, 12, 25), new Date(2021, 2, 25, 12, 31)),
//   createData('ru.reactjs.org/', 'effective', new Date(2021, 2, 25, 12, 40), new Date(2021, 2, 25, 13, 53)),
//   createData('vk.com/feed', 'ineffective', new Date(2021, 2, 25, 14, 10), new Date(2021, 2, 25, 16, 23)),
//   createData('https://www.google.com/', 'neutral', new Date(2021, 2, 25, 16, 23), new Date(2021, 2, 25, 16, 25))
// ]

const getSeries = () => {

  const resourcesDto = ResourcesService.getResourcesFromSS()
  let res = []

  for (let resource of resourcesDto){
    // const resourceLink = +resource.host

    const now=new Date();
    const localtime=now.toString();
    const utctime=now.toGMTString();

    console.log("U",utctime)
    console.log("L", localtime - utctime)

    const category = resource.category
    const startTime = new Date(DateService.stringToDate(resource.startTime))
    const endTime = new Date(DateService.stringToDate(resource.endTime))

    // '#d90368', '#f5cc00', '#00cc99', '#bcb8b1'
    let color = ""
    if (category === 'effective') color = '#00cc99'
    else if(category === 'neutral') color = '#f5cc00'
    else if(category === 'ineffective') color = '#d90368'
    else color = '#bcb8b1'

    res.push(
      {
        name: resource.host,
        data: [
          {
            x: 'T',
            y: [
              startTime.getTime(),
              endTime.getTime()
            ],
            fillColor: color
          }
        ]
      }
    )
  }
  return res
}



 const options = {
    chart: {
      height: 350,
      type: 'rangeBar',
      toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
            download: false,
            selection: false,
            zoom: true,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: true | '<img src="/static/icons/reset.png" width="20">',
            customIcons: []
            },
        },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
        rangeBarGroupRows: true
      }
    },
    colors:['#000000'],
    xaxis: {
      type: 'datetime'
    },
    legend: {
      position: 'right'
    },
    toolbar:{
        show: false
      },
    legend: {
        show: false
    },
    tooltip: {
        enabled: true,
        fillSeriesColor: false,
        shared: true,
        onDatasetHover: {
            highlightDataSeries: false,
            followCursor: true,
        },
        x: {
            show: true,
            format: 'HH:mm',
        },
        y: {
            formatter: function(value, series) {
              return ''
            }
        }
    },
    yaxis: {
        show: false,
    }
  }

  export default function ByHoursChart(props){

    const series = getSeries()
    console.log("Ser", series)

    if (series.length > 0) {
      return(
        <div style={{paddingTop: '16px'}}>
            <Chart options={options} series={series} type="rangeBar" height={150} width={'100%'}/>
        </div>
      )
    }
    else return (<div></div>)
  }
