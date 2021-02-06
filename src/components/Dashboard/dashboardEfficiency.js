import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Grid, Card, CardContent, Button, Divider, Container, Checkbox, Typography } from '@material-ui/core';
import Table from "./table"

import EfficiencyByHoursChart from './efficiencyByHoursChart'
import EfficiencyByDayChart from './efficiencyByDayChart'


// import React, { Fragment } from 'react';

import BigStat from "./BigStat";

const mock = {
  bigStat: [
    {
      product: "Workerd today",
      total: {
        monthly: 4232,
        weekly: 1465,
        daily: 199,
        percent: { value: 3.7, profit: false }
      },
      color: "Worked week",
      registrations: {
        monthly: { value: 830, profit: false },
        weekly: { value: 215, profit: true },
        daily: { value: 33, profit: true }
      },
      bounce: {
        monthly: { value: 4.5, profit: false },
        weekly: { value: 3, profit: true },
        daily: { value: 3.25, profit: true }
      }
    },
    {
      product: "Worked week",
      total: {
        monthly: 754,
        weekly: 180,
        daily: 27,
        percent: { value: 2.5, profit: true }
      },
      color: "warning",
      registrations: {
        monthly: { value: 32, profit: true },
        weekly: { value: 8, profit: true },
        daily: { value: 2, profit: false }
      },
      bounce: {
        monthly: { value: 2.5, profit: true },
        weekly: { value: 4, profit: false },
        daily: { value: 4.5, profit: false }
      }
    },
    {
      product: "Activity",
      total: {
        monthly: 1025,
        weekly: 301,
        daily: 44,
        percent: { value: 3.1, profit: true }
      },
      color: "secondary",
      registrations: {
        monthly: { value: 230, profit: true },
        weekly: { value: 58, profit: false },
        daily: { value: 15, profit: false }
      },
      bounce: {
        monthly: { value: 21.5, profit: false },
        weekly: { value: 19.35, profit: false },
        daily: { value: 10.1, profit: true }
      }
    }
  ],
};

export default function DashboardEfficiency(props){

    return (

      <Container>
        <Grid container spacing={4}>
          {mock.bigStat.map(stat => (
            <Grid item md={4} sm={6} xs={12} key={stat.product}>
              <BigStat {...stat}/>
            </Grid>
          ))}
        </Grid>
      <Fragment>
        <Table/>
      </Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
            <EfficiencyByHoursChart/>
        </Grid>
        <Grid item xs={12} lg={4}>
          <EfficiencyByDayChart/>
        </Grid>
      </Grid>
      </Container>

    )

}