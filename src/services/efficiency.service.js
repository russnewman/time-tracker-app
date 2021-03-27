import DateService from './date.service'
import axios from "axios";
import AuthService from "./auth.service"
import ManagerService from "./manager.service"
const API_URL = "http://localhost:8090/efficiency"


class EfficiencyService{
    getEfficiencyAllTeam(date, periodOfTime){

        let correctDate = DateService.toRightFormat(date)
        let correctTimePeriod = DateService.timePeriodToString(periodOfTime)
        let user = AuthService.getCurrentUser()

        return axios.get(API_URL + "/team", { 
                            params:{
                                    userId: user.userInfo.id,
                                    date: correctDate,
                                    periodOfTime: correctTimePeriod
                                },
                            headers: {Authorization: "Bearer "+ this.getToken()}
                        })
        .then((response) => {
            // console.log('sfs', JSON.stringify(response.data))
            sessionStorage.setItem("efficiency", JSON.stringify(response.data))
            // console.log('sfs', sessionStorage)


            return response.data
        },
             (error) => {return this.buildErrorNotification(error)}
        )
    }


    buildErrorNotification(error){
        let errMessage = ""
        if (error.response){
            if(error.response.status == 500) errMessage = "Server error"
            else errMessage = error.response.data
        }
        else errMessage = "Server is not available"
        return {
            isOpen: true,
            message: errMessage,
            type: "error"
        }
    }
        
    config(){
        return {
            headers: {Authorization: "Bearer "+ this.getToken()}
        }
    }

    getToken(){
        return AuthService.getCurrentUser().userInfo.token
    }

    getEfficiencyFromSessionStorage(employeeId){
        
        let efficiencyAllTeam =  JSON.parse(sessionStorage.getItem('efficiency'))
        for (let id in efficiencyAllTeam){

            if (id == employeeId){
                let efficiency = efficiencyAllTeam[id]
                // let employeeInfo =  ManagerService.getEmployeeInfoFromSessionStorage(employeeId)
                return  efficiency
            }
        }
    }

    getEfficiencyFromSSAllTeam(){
        return JSON.parse(sessionStorage.getItem('efficiency'))
    }

    computeEfficiencyForPeriodOfTime(efficiencyList){

        //day.Compute total
        if (efficiencyList.EFFECTIVE.length == 24){
          return {
            'effective': efficiencyList.EFFECTIVE.reduce((a, b) => a + b),
            'neutral': efficiencyList.NEUTRAL.reduce((a, b) => a + b),
            'ineffective': efficiencyList.INEFFECTIVE.reduce((a, b) => a + b),
            'without': efficiencyList.WITHOUT.reduce((a, b) => a + b)
          }
        }
        //Compute average
        let numberOfWorkingDays = 5
        return {
          'effective': Math.floor(efficiencyList.EFFECTIVE.reduce((a, b) => (a + b)) / numberOfWorkingDays),
          'neutral':  Math.floor(efficiencyList.NEUTRAL.reduce((a, b) => (a + b)) / numberOfWorkingDays),
          'ineffective': Math.floor(efficiencyList.INEFFECTIVE.reduce((a, b) => (a + b)) / numberOfWorkingDays),
          'without': Math.floor(efficiencyList.WITHOUT.reduce((a, b) => (a + b)) / numberOfWorkingDays)
        }
        //Compute average
      }


    getEfficiencyRate(efficiency){

    const total = efficiency.effective + efficiency.ineffective + efficiency.neutral + efficiency.without
    const denominator = total == 0 ? 1 : total  
    return {
                'effective': Math.round(efficiency.effective/denominator) * 100 ,
                'neutral': Math.round(efficiency.neutral/denominator)* 100 ,
                'ineffective': Math.round(efficiency.ineffective/denominator)* 100 ,
                'without': Math.round(efficiency.without/denominator)* 100,
                'total': total
            }
    }

    getEfficiencyRateWithCategories(effective, neutral, ineffective, without){

        const total = effective + neutral + ineffective + without
        const denominator = total == 0 ? 1 : total  
        return {
                    'effective': Math.round(effective/denominator) * 100 ,
                    'neutral': Math.round(neutral/denominator)* 100 ,
                    'ineffective': Math.round(ineffective/denominator)* 100 ,
                    'without': Math.round(without/denominator)* 100,
                    'total': total
                }
        }


}



export default new EfficiencyService()