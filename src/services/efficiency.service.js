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
                let employeeInfo =  ManagerService.getEmployeeInfoFromSessionStorage(employeeId)

                return  {
                            employeeInfo: employeeInfo,
                            efficiency: efficiency
                        }

            }
        }
    }
}



export default new EfficiencyService()