class DateService{
    toRightFormat(date){

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
      
}
 

export default new DateService()