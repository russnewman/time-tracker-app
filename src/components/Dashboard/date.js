import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';




export default function MaterialUIPickers() {

  // const classes = styles()
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider disableScrollLock utils={DateFnsUtils}>
        <KeyboardDatePicker style={{width:'172px'}}
        disableScrollLock
        disableToolbar
        // variant="inline"
        inputVariant="outlined"
          // margin="2px"
          id="date-picker-dialog"
          // label="Date"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          // KeyboardButtonProps={{
          //   'aria-label': 'change date',
          // }}
        />
    </MuiPickersUtilsProvider>
  );
}
