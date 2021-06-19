import React from 'react';
import Chart from 'react-apexcharts';
import { makeStyles } from '@material-ui/core/styles';

import ResourcesService from '../../../services/resources.service'
import DateService from '../../../services/date.service'
import { Container, Input, Select, Button, DialogContent, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Resources from '../resources'

// import Typography from '../../wrappers/Typography';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const ERadio = withStyles({
  root: {
    '&$checked': {
      color: '#00cc99',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const NRadio = withStyles({
  root: {
    '&$checked': {
      color: '#f5cc00',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);



const useStyles = makeStyles((theme) => ({
  bottomArrows:{
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1)*-2
  },
  dialogTitle: {
    textAlign: 'center',
    fontWeight: '900',
    backgroundColor: '#38023b',
    color: 'white',
    fontWeight: '600'
  },
}))


const getSeries = () => {

  const resourcesDto = ResourcesService.getResourcesFromSS()
  let res = []

  for (let resource of resourcesDto){

    const now=new Date();

    const category = resource.category
    const startTime = new Date(DateService.stringToDate(resource.startTime))
    const endTime = new Date(DateService.stringToDate(resource.endTime))

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

  function processUrl(url){
    if(url) return url.replace('https://','').replace('http://', '')
    return
  }

  export default function ByHoursChart(props){

    const series = getSeries()
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
          events: {
            dataPointSelection: function(event, chartContext, config) {
              processClick(event, chartContext, config)
            }
          }
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
    const [open, setOpen] = React.useState(false);
    const [host, setHost] = React.useState("")
    const setParentRender = props.setRender
    const render = props.render

    const handleClose = () => {
      setOpen(false);
    };

    const openDialog = (host) => {
      setHost(host)
      setOpen(true)
    }

    const processClick = (event, chartContext, config) => {
      openDialog(config.w.globals.seriesNames[config.seriesIndex])
    }

    if (series.length > 0) {
      return(
        <div style={{paddingTop: '16px'}}>
            <Chart options={options} series={series} type="rangeBar" height={150} width={'100%'}/>
            <ChangeResourseType host={host} open={open} onClose={handleClose} render={render} setParentRender={setParentRender}></ChangeResourseType>
            
        </div>
      )
    }
    else return (<div></div>)
  }



  
function ChangeResourseType(props) {
  const classes = useStyles()
  const render = props.render
  const setParentRender = props.setParentRender
  let host = props.host
  const onClose = props.onClose
  const open = props.open
  const resources = ResourcesService.getResourcesFromSS()

  let resource = {
    host: "",
    category: ""
  }
  for (let res of resources){
    if (res.host == host){
      resource = {
        host: res.host,
        category: res.category
      }
    }
  }
  
  const [category, setCategory] = React.useState(resource.category)
  const [selectValue, setSelectValue] = React.useState('employee')

  const handleClose = () => {
    onClose();
    setCategory(resource.category)
    setSelectValue('team')
  };

  const handleSave = () =>{
    if (category == "effective" || category == "ineffective" || category == "neutral"){
      handleClose()

      const employeeId = resources[0].employeeId
      resources.map(item => {
        if (item.host === resource.host) item.category = category
      })
      ResourcesService.updateResourcesInSS(resources)
      ResourcesService.updateResource(employeeId, selectValue, resource.host, category)

      console.log(render)
      if (render === "render1") setParentRender("render2")
      else setParentRender("render1")

    }
  }

  const handleChange = (event) => {
    setCategory(event.target.value);
  };


  React.useEffect(() => {
    setCategory(resource.category);
  }, [resource.category])

  return (
    
  <div>
    <Dialog onClose={handleClose} fullWidth maxWidth='sm' aria-labelledby="simple-dialog-title" open={open} className={classes.dialog}>
      <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}><h5 style={{fontWeight: '700'}}>{processUrl(resource.host)}</h5></DialogTitle>
      <DialogContent className={classes.dialogContent}>

            <Container style={{ display: 'flex', flexDirection:'row', justifyContent: 'center'}}>

                <div style={{width: '56px', marginRight: '96px', marginTop:'6px'}}>
                  <Select
                        value={selectValue}
                        onChange={e => setSelectValue(e.target.value)}
                        input={
                          <Input
                            disableUnderline
                            classes={{ input: classes.selectInput }}
                          />
                        }
                      >
                    <MenuItem value="team">Команда</MenuItem>
                    <MenuItem value="employee">Данный сотр.</MenuItem>
                  </Select>
                </div>
              
                <RadioGroup  row aria-label="position" value={category} onChange={handleChange}>
                  <FormControlLabel value="effective" control={<ERadio/>} label="Эффективно" />
                  <FormControlLabel value="neutral" control={<NRadio/>} label="Нейтрально" />
                  <FormControlLabel value="ineffective" control={<Radio/>} label="Неэффективно" />
                </RadioGroup>
            </Container>
            <div style={{justifyContent: 'center', display: 'flex'}}>
                <Button 
                        // type="submit"
                        variant="outlined"
                        // color="secondary" 
                        style={{width:"96px", marginTop: "24px", marginBottom: '8px'}} 
                        onClick={handleSave}>
                        Сохранить
                </Button>
            </div>
      </DialogContent>
    </Dialog>
    </div>
    );
  }
