import React, { useState } from "react";
import { Grid, Select, MenuItem, Input, Typography } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { BarChart, Bar } from "recharts";
import classnames from "classnames";
import Widget from "./Widget";
import { makeStyles } from '@material-ui/core/styles';

const useStyles =  makeStyles((theme) => ({
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  bottomStatsContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(1) * -2,
    marginTop: theme.spacing(1),
  },
  statCell: {
    padding: theme.spacing(2),
  },
  totalValueContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  totalValue: {
    display: "flex",
    alignItems: "baseline",
  },
  profitArrow: {
    transform: "rotate(-45deg)",
    fill: theme.palette.success.main,
  },
  profitArrowDanger: {
    transform: "rotate(45deg)",
    fill: theme.palette.secondary.main,
  },
  selectInput: {
    padding: 10,
    paddingRight: 25,
    "&:focus": {
      backgroundColor: "white",
    },
  },
  bodyWidgetOverflow: {
    overflow: 'auto'
  }
}));



export default function BigStat(props) {
  var { product, total, color, registrations, bounce } = props;
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [value, setValue] = useState("daily");

  return (
    <Widget
      header={
        <div className={classes.title}>
          <Typography variant="h5">{product}</Typography>
        </div>
      }
      upperTitle
      bodyClass={classes.bodyWidgetOverflow}
    >
      <div className={classes.totalValueContainer}>
        <div className={classes.totalValue}>
          <Typography variant="h3" color="text" colorBrightness="secondary">
            {total[value]}
          </Typography>
          {total.percent.profit
          ? 
          <Typography style={{color:"#81c784"}}>
              +{total.percent.value}%
          </Typography> : 
          <Typography style={{color:"#e33371"}}>
              -{total.percent.value}%
            </Typography>}
        </div>
        <BarChart width={150} height={70} data={getRandomData()}>
          <Bar
            dataKey="value"
            fill="#f50057"
            radius={10}
            barSize={10}
          />
        </BarChart>
      </div>
      {/* <div className={classes.bottomStatsContainer}>
        <div className={classnames(classes.statCell, classes.borderRight)}>
          <Grid container alignItems="center">
            <Typography variant="h6">{registrations[value].value}</Typography>
            <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [!registrations[value].profit]: classes.profitArrowDanger,
              })}
            />
          </Grid>
          <Typography size="sm" color="text" colorBrightness="secondary">
            Registrations
          </Typography>
        </div>
        <div className={classes.statCell}>
          <Grid container alignItems="center">
            <Typography variant="h6">{bounce[value].value}%</Typography>
            <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [!registrations[value].profit]: classes.profitArrowDanger,
              })}
            />
          </Grid>
          <Typography size="sm" color="text" colorBrightness="secondary">
            Bounce Rate
          </Typography>
        </div>
        <div className={classnames(classes.statCell, classes.borderRight)}>
          <Grid container alignItems="center">
            <Typography variant="h6">
              {registrations[value].value * 10}
            </Typography>
            <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [classes.profitArrowDanger]: !registrations[value].profit,
              })}
            />
          </Grid>
          <Typography size="sm" color="text" colorBrightness="secondary">
            Views
          </Typography>
        </div>
      </div> */}
    </Widget>
  );
}

function getRandomData() {
  return Array(7)
    .fill()
    .map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
}
