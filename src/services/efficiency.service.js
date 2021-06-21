import DateService from './date.service'
import axios from "axios";
import AuthService from "./auth.service"
const EFFICIENCY_URL = "http://localhost:8080/efficiency"
const RESOURCES_URL = "http://localhost:8080/resources"



class EfficiencyService{
    getEfficiencyAllTeam(date, periodOfTime){

        const correctDate = DateService.toRightFormat(date)
        const correctTimePeriod = DateService.timePeriodToString(periodOfTime)
        const user = AuthService.getCurrentUser()

        return axios.get(EFFICIENCY_URL + "/team", { 
                            params:{
                                    date: correctDate,
                                    periodOfTime: correctTimePeriod
                                },
                            headers: {Authorization: "Bearer "+ this.getToken()}
                        })
        .then((response) => {
            sessionStorage.setItem("efficiency", JSON.stringify(response.data))
            return response.data
        },
             (error) => {return this.buildErrorNotification(error)}
        )
    }



    getEfficiencyAllTeamAndResources(date, periodOfTime, employeeIdOrAllTeam){

        const  user = AuthService.getCurrentUser()
        const correctDate = DateService.toRightFormat(date)
        const correctTimePeriod = DateService.timePeriodToString(periodOfTime)

        const requestOne = axios.get(EFFICIENCY_URL + "/team", { 
                                        params:{
                                                date: correctDate,
                                                periodOfTime: correctTimePeriod
                                            },
                                        headers: {Authorization: "Bearer "+ this.getToken()}
                                    })
        let requestTwo;
        if (employeeIdOrAllTeam !== 'all'){
            requestTwo = axios.get(RESOURCES_URL + "/employee", { 
                params:{
                        employeeId: employeeIdOrAllTeam,
                        date: correctDate,
                        periodOfTime: correctTimePeriod
                    },
                headers: {Authorization: "Bearer "+ user.userInfo.token}
            })
        }
        else{
            requestTwo = axios.get(RESOURCES_URL + "/team", { 
                params:{
                        date: correctDate,
                        periodOfTime: correctTimePeriod
                    },
                headers: {Authorization: "Bearer "+ user.userInfo.token}
            })
        }
        

        return axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]
            console.log(responseOne)

            sessionStorage.setItem("efficiency", JSON.stringify(responseOne.data))
            sessionStorage.setItem("resources", JSON.stringify(responseTwo.data))

            console.log("Resp", responseTwo)
            
            return responseTwo.data


            // use/access the results 
          }, (error) => {return this.buildErrorNotification(error)}))
    }


    getResourcesAllTeam(date, periodOfTime){

        const correctDate = DateService.toRightFormat(date)
        const correctTimePeriod = DateService.timePeriodToString(periodOfTime)
        const user = AuthService.getCurrentUser()

        return axios.get(EFFICIENCY_URL + "/team", { 
                            params:{
                                    date: correctDate,
                                    periodOfTime: correctTimePeriod
                                },
                            headers: {Authorization: "Bearer "+ user.userInfo.token}
                        })
        .then((response) => {
            sessionStorage.setItem("resources", JSON.stringify(response.data))
            return response.data
        },
             (error) => {return this.buildErrorNotification(error)}
        )
    }


    getResourcesForEmployee(employeeId, date, periodOfTime){

        const correctDate = DateService.toRightFormat(date)
        const correctTimePeriod = DateService.timePeriodToString(periodOfTime)

        return axios.get(EFFICIENCY_URL + "/employee", { 
            params:{
                    date: correctDate,
                    periodOfTime: correctTimePeriod
                },
            headers: {Authorization: "Bearer "+ this.getToken()}
        })
        .then((response) => {
                sessionStorage.setItem("resources", JSON.stringify(response.data))
                return response.data
            },
                (error) => {return this.buildErrorNotification(error)}
            )
    }


    getResourcesFromSS(){
        return JSON.parse(sessionStorage.getItem('resources'))
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
                'effective': (efficiency.effective/denominator * 100).toFixed(1),
                'neutral': (efficiency.neutral/denominator * 100).toFixed(1),
                'ineffective': (efficiency.ineffective/denominator* 100).toFixed(1) ,
                'without': (efficiency.without/denominator* 100).toFixed(1),
                'total': total
            }
    }

    getEfficiencyRateWithCategories(effective, neutral, ineffective, without){

        const total = effective + neutral + ineffective + without
        const denominator = total == 0 ? 1 : total  
        return {
                    'effective': (effective/denominator * 100).toFixed(1) ,
                    'neutral': (neutral/denominator* 100).toFixed(1) ,
                    'ineffective': (ineffective/denominator* 100).toFixed(1) ,
                    'without': (without/denominator* 100).toFixed(1),
                    'total': total
                }
        }
}



export default new EfficiencyService()