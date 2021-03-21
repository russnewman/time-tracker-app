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
}
 

export default new DateService()