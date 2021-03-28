import DateService from './date.service'
import axios from "axios";
import AuthService from "./auth.service"
import ManagerService from "./manager.service"
const API_URL = "http://localhost:8090/resources"


class ResourcesService{
    // getResourcesAllTeam(date, periodOfTime){

    //     const correctDate = DateService.toRightFormat(date)
    //     const correctTimePeriod = DateService.timePeriodToString(periodOfTime)
        // const user = AuthService.getCurrentUser()

        // return axios.get(API_URL + "/team", { 
        //                     params:{
        //                             userId: user.userInfo.id,
        //                             date: correctDate,
        //                             periodOfTime: correctTimePeriod
        //                         },
        //                     headers: {Authorization: "Bearer "+ user.userInfo.token}
        //                 })
    //     .then((response) => {
    //         sessionStorage.setItem("resources", JSON.stringify(response.data))
    //         return response.data
    //     },
    //          (error) => {return this.buildErrorNotification(error)}
    //     )
    // }


    getResources(employeeIdOrAllTeam, date, periodOfTime){

        const correctDate = DateService.toRightFormat(date)
        const correctTimePeriod = DateService.timePeriodToString(periodOfTime)
        const user = AuthService.getCurrentUser()

        let request;
        if (employeeIdOrAllTeam !== 'all'){
            request = axios.get(API_URL + "/employee", { 
                params:{
                        employeeId: employeeIdOrAllTeam,
                        date: correctDate,
                        periodOfTime: correctTimePeriod
                    },
                headers: {Authorization: "Bearer "+ user.userInfo.token}
            })
        }
        else{
            request = axios.get(API_URL + "/team", { 
                params:{
                        userId: user.userInfo.id,
                        date: correctDate,
                        periodOfTime: correctTimePeriod
                    },
                headers: {Authorization: "Bearer "+ user.userInfo.token}
            })
        }
        return request.then((response) => {
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
}



export default new ResourcesService()