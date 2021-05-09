class DateService{
    toRightFormat(date){

        // let date = moment.toDate()
        console.log("DAte", date)
        let year = date.getFullYear();

        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
      
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return `${year}-${month}-${day}`
    }

    timePeriodToString(timePeriod){
        switch (timePeriod){
            case 1:
                return 'day'
            case 2:
                return 'week'
            case 3:
                return 'week'
        }
    }

    secondsToHours(seconds){
        const hours = Math.floor(seconds/3600)
        const minutes = Math.floor(seconds % 3600 / 60)
        const sec = seconds % 3600 % 60
      
        if (hours != 0){
            if (minutes != 0){
              if (sec != 0) return  hours+ 'h' + ' ' + minutes + 'm' + ' ' + sec + 's'
              return hours+ 'h' + ' ' + minutes + 'm'
            } 
            return hours+'h'
        }
        if (minutes != 0){
          if (sec != 0) return minutes + 'm' + ' ' + sec + 's'
          return  minutes + 'm'
        }
        if (sec !=0) return sec + 's'
        return 0
      }
      
      
    secondsToHoursAndMinutes(seconds){
        const hours = Math.floor(seconds/3600)
        const minutes = Math.floor(seconds % 3600 / 60)
        // const sec = seconds % 3600 % 60
      
        if (hours != 0){
            if (minutes != 0){
              return hours+ 'h' + ' ' + minutes + 'm'
            } 
            return hours+'h'
        }
        if (minutes != 0){
          return  minutes + 'm'
        }
        return 0
    }
    
    getTimeFromTimeStamp(timeStamp){

      const indT = timeStamp.indexOf("T")
      return timeStamp.substring(indT+1, indT+9) + ''
    }

    //TODO Change this
    stringToDate(date){
      // console.log("DateService", date)
      return Date.parse(date) + 3*60*60*1000
    }


    getStringMounthByNum(mounthNum){
      switch (mounthNum){
        case 0: return "Jan"
        case 1: return "Feb"
        case 2: return "Mar"
        case 3: return "Apr"
        case 4: return "May"
        case 5: return "Jun"
        case 6: return "Jul"
        case 7: return "Aug"
        case 8: return "Sep"
        case 9: return "Oct"
        case 10: return "Nov"
        case 11: return "Dec"
      }
    }

    getPeriodOfDateString(timePeriod, date){
      if (timePeriod === 1){
        return date.getDate() + " " + this.getStringMounthByNum(date.getMonth()) + " " + date.getFullYear()
      }
      else if (timePeriod === 2){
        let beginOfWeekDate = new Date(date.setDate(date.getDate() - date.getDay() + 1))
        let endOfWeekDate = new Date(date.setDate(date.getDate() + (6 - date.getDay()) + 1))
        return beginOfWeekDate.getDate() + " " + this.getStringMounthByNum(beginOfWeekDate.getMonth()) + " " + beginOfWeekDate.getFullYear()
        + " - " + endOfWeekDate.getDate() + " " + this.getStringMounthByNum(endOfWeekDate.getMonth()) + " " + endOfWeekDate.getFullYear();
      }
    }
      
}
 

export default new DateService()