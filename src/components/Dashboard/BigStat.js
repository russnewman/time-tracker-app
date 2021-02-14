import React, { useState } from "react";
import { Grid, Select, MenuItem, Input, Typography, Card } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { BarChart, Bar } from "recharts";
import { makeStyles } from '@material-ui/core/styles';
import classnames from "classnames";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';



const useStyles =  makeStyles((theme) => ({
  totalValueContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  card:{
    boxShadow: "0px 7px 20px rgba(10, 1, 50, 0.3)",
    borderRadius: "20px",
    paddingBottom: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
  title:{
    paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(2),
  },
  profitEffectiveArrow: {
    transform: "rotate(-45deg)",
    fill: theme.palette.success.main,
  },
  profitEffectiveArrowDanger: {
    transform: "rotate(45deg)",
    fill: theme.palette.secondary.main,
  },
  profitArrowIneffectiveDanger: {
    transform: "rotate(-45deg)",
    fill: theme.palette.secondary.main,
  },
  profitArrowIneffective: {
    transform: "rotate(45deg)",
    fill: theme.palette.success.main,
  },

  totalValue: {
    display: "flex",
    alignItems: "baseline",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  bottomTypography:{
    fontWeight: '600',
    fontSize: '12px',
    fontFamily: 'Poppins, sans-serif'
  },
  bottomStatsContainer:{
    display: "flex",
    justifyContent: "space-between",
  }
}));



export default function BigStat(props) {
  var { product, total, color, registrations, bounce } = props;
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [value, setValue] = useState("daily");

  return (
    <Card className={classes.card}>
          <div className={classes.title}>
            <Typography style={{fontFamily: 'Poppins, sans-serif', fontWeight: '600',}} variant="h5">{product}</Typography>
          </div>
        <div className={classes.totalValueContainer}>
          <div className={classes.totalValue}>
            <Typography variant="h3" style={{fontFamily: 'Poppins, sans-serif', marginRight:'12px', fontWeight: '900'}}>
              {total[value]}h 
            </Typography>
            <Typography> </Typography>
              {total.percent.profit
            ? 
            <Typography style={{color:"#00cc65"}}>
                +{total.percent.value}%
            </Typography> : 
            <Typography style={{color:"crimson"}}>
                -{total.percent.value}%
              </Typography>}
          </div>
          {/* <BarChart width={150} height={70} data={getRandomData()}>
            <Bar
              dataKey="value"
              fill="#f50057"
              radius={10}
              barSize={10}
            />
          </BarChart> */}
        </div>

        <div className={classes.bottomStatsContainer}>
          <div>
            <Grid container alignItems="center">
              <Typography variant="h6" style={{marginRight: '2px'}}>{registrations[value].value}%</Typography>
              <ArrowUpwardIcon style={{color:'#00cc65'}}
              />
            </Grid>
            <Typography className={classes.bottomTypography}>
              Effective
            </Typography>
          </div>
          <div>
            <Grid container alignItems="center">
                <Typography variant="h6" style={{marginRight: '2px'}}>{registrations[value].value * 1.2}%</Typography>
                <ArrowUpwardIcon 
                />
              </Grid>
              <Typography className={classes.bottomTypography}>
                Neutral
              </Typography>
            </div>
            <div>
            <Grid container alignItems="center">
                <Typography variant="h6" style={{marginRight: '2px'}}>{registrations[value].value * 0.3}%</Typography>
                <ArrowUpwardIcon style={{color:'crimson'}}
                />
              </Grid>
              <Typography className={classes.bottomTypography}>
                Inneffective
              </Typography>
            </div>
        </div>

      </Card>
  );
}

function getRandomData() {
  return Array(7)
    .fill()
    .map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
}