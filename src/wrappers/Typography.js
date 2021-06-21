import { Typography} from '@material-ui/core';

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { TextField } from '@material-ui/core';


const styles = makeStyles((theme) => ({
    roboto:{
        fontWeight: '400',
        fontSize: '14px',
        fontFamily: 'Roboto, sans-serif',
    },
    popins:{
        fontFamily: 'Poppins, sans-serif'
    },
    poppinsDefault:{
        fontWeight: '900',
        fontSize: '16px',
        fontFamily: 'Poppins, sans-serif'
    }
}))



export default function MuiTypography(props){
    const {value, font, weight, className, style, variant} = props
    const classes = styles()
    if (className){
        return <Typography className={className} style={style} variant={variant}>{value}</Typography>
    }
    if (font === 'poppins'){
        return (<Typography variant={variant} className={classes.popins} style={style}>{value}</Typography>)
    }
    return (<Typography className={classes.roboto} style={style} variant={variant}>{value}</Typography>)
}