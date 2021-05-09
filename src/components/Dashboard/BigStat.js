import React, { useState, Fragment  } from "react";
import { Grid, Select, MenuItem, Input, Typography, Card } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { BarChart, Bar } from "recharts";
import { makeStyles } from '@material-ui/core/styles';
import classnames from "classnames";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import EfficiencyService from '../../services/efficiency.service';
import DateService from '../../services/date.service';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';



const useStyles =  makeStyles((theme) => ({
  totalValueContainer: {
    display: "flex",
    alignItems: "baseline",
  },
  card:{
    boxShadow: "0px 7px 20px rgba(10, 1, 50, 0.3)",
    borderRadius: "20px",
    paddingBottom: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    // backgroundColor: "#ffedd8"
  },
  title:{
    paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(2),
  },
  totalValue: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  bottomTypography:{
    fontWeight: '600',
    fontSize: '12px',
    fontFamily: 'Poppins, sans-serif'
  },
  bottomStatsContainer:{
    display: "flex",
    justifyContent: "space-between",
  },
  cardAction: {
    borderRadius: "20px",
    width: '118%',
    marginLeft: "-25px",
    marginRight: "-20px",
    display: 'block',
    textAlign: 'initial'
  },
  actionArea: {
    "&:hover $focusHighlight": {
      opacity: 0
    }
  },
  focusHighlight: {}
}));


export default function BigStat(props) {
  var { category, total, percentage} = props;
  var classes = useStyles();
  var theme = useTheme();



  return (

//     <ButtonBase
//     className={classes.cardAction}
//     onClick={event => {}}
// > 
<Fragment>

<div className="icon-demo-box">

    <Card className={classes.card}>
      {/* <CardActionArea
        classes={{
          root: classes.actionArea,
          focusHighlight: classes.focusHighlight
        }}
      > */}

     
      {/* <CardContent> */}

        <div className={classes.title}>
            <Typography style={{fontFamily: 'Poppins, sans-serif', fontWeight: '600',}} variant="h6">{category}</Typography>
        </div>
        <div className={classes.totalValueContainer}>
          <div className={classes.totalValue}>
            <Typography variant="h3" style={{fontFamily: 'Poppins, sans-serif', marginRight:'12px', fontWeight: '900'}}>
              {DateService.secondsToHoursAndMinutes(total.value)}
            </Typography>
          </div>
          {(category === 'Effective' || category === 'Neutral') && 
                (total.percent.profit
                      ? 
                (isNaN(total.percent.value) ? <div></div> : <div>
                  <ArrowUpwardIcon style={{color:'#00cc65', marginTop: '-8px'}}/>
                  {isFinite(total.percent.value) && <Typography style={{color:"#00cc65", display: 'inline-block', fontSize: '14px'}}>
                      {total.percent.value}%
                  </Typography>}
                </div>) : 
                (isNaN(total.percent.value) ? <div></div> : <div>
                    <ArrowDownwardIcon style={{color: 'crimson'}}/>
                    {isFinite(total.percent.value) && <Typography style={{color:"crimson", display: 'inline-block'}}>
                        {total.percent.value}%
                      </Typography>}
                </div>))
            }
            {(category === 'Ineffective' || category === 'Without') && 
                (total.percent.profit
                      ? 
                (isNaN(total.percent.value) ? <div></div> : <div >
                  <ArrowUpwardIcon style={{color:'crimson', marginTop: '-8px'}}/>
                  {isFinite(total.percent.value) && <Typography style={{color:"crimson", display: 'inline-block', fontSize: '14px'}}>
                      {total.percent.value}%
                  </Typography>}
                </div>) : 
                (isNaN(total.percent.value) ? <div></div> :<div>
                    <ArrowDownwardIcon style={{color: '#00cc65'}}/>
                    {isFinite(total.percent.value) && <Typography style={{color:"#00cc65", display: 'inline-block'}}>
                        {total.percent.value}%
                      </Typography>}
                </div>))
            }
        </div>

        <div className={classes.totalValueContainer}>
          <Typography className="text-black-50" style={{fontSize:'20 px', marginRight:'12px'}}>{percentage.value}%</Typography>
          <div style={{marginRight: '90px'}}>
            {(category === 'Effective' || category === 'Neutral') && (percentage.percent.profit ? 
                    ( isNaN(total.percent.value) ? <div></div> : <div>
                      <ArrowUpwardIcon style={{color:'#00cc65', marginTop: '-8px'}}/>
                      {isFinite(total.percent.value) &&<Typography style={{color:"#00cc65", display: 'inline-block', fontSize: '14px'}}>
                          {percentage.percent.value}%
                      </Typography>}
                    </div>)
                     : 
                    (isNaN(total.percent.value) ? <div></div> : <div>
                      <ArrowDownwardIcon style={{color:'crimson', marginTop: '-8px'}}/>
                      {isFinite(total.percent.value) &&<Typography style={{color:"crimson", display: 'inline-block', fontSize: '14px'}}>
                        {percentage.percent.value}%
                      </Typography>}
                    </div>))
            }
            {(category === 'Ineffective' || category === 'Without') && (percentage.percent.profit ? 
                    (isNaN(total.percent.value) ? <div></div> : <div>
                      <ArrowUpwardIcon style={{color:'crimson', marginTop: '-8px'}}/>
                      {isFinite(total.percent.value) &&<Typography style={{color:"crimson", display: 'inline-block', fontSize: '14px'}}>
                        {percentage.percent.value}%
                      </Typography>}
                    </div>)
                     : 
                    (isNaN(total.percent.value)? <div></div> : <div>
                      <ArrowDownwardIcon style={{color:'#00cc65', marginTop: '-8px'}}/>
                      {isFinite(total.percent.value) &&<Typography style={{color:"#00cc65", display: 'inline-block', fontSize: '14px'}}>
                        {percentage.percent.value}%
                      </Typography>}
                    </div>))
            }
            
          </div>
        </div>

      </Card>
      </div>
          </Fragment>


  );
}
