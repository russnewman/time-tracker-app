import DateService from './date.service'
import axios from "axios";
import AuthService from "./auth.service"
import ManagerService from "./manager.service"
const API_URL = "http://localhost:8080/resources"


class ResourcesService{

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
                        
                        date: correctDate,
                        periodOfTime: correctTimePeriod
                    },
                headers: {Authorization: "Bearer "+ user.userInfo.token}
            })
        }
        return request.then((response) => {
                console.log(response.data)
                sessionStorage.setItem("resources", JSON.stringify(response.data))
                return response.data
            },
                (error) => {return this.buildErrorNotification(error)}
            )
    }


    updateResource(employeeIdOrAllTeam, selectValue, host, category){
        let request;
        if (employeeIdOrAllTeam != 'all' && selectValue == "employee"){
            request = axios.put(API_URL + '/employee', {

                url: "",
                host: host,
                category: category
                    
                }, {
                    params: {
                        employeeId: employeeIdOrAllTeam,
                    },
                    headers: {Authorization: "Bearer "+ this.getToken()}
                })
        }
        else{
            request = axios.put(API_URL + '/team', {
                    url: "",
                    host: host,
                    category: category              
                }, {
                    params: {
                        managerId: AuthService.getCurrentUser().userInfo.id,
                    },
                    headers: {Authorization: "Bearer "+ this.getToken()}
                })
        }

        

        
        // return request.catch(
        //                     (error) => {
                                
        //                         console.log("ERROR", error)
        //                         return this.buildErrorNotification(error)}
        //         )

        return request

            // return this.buildNotification('SUCCESS')
        
        // console.log("HEREEEEEEEEEEEEEE")
        // return request.then((response) => 
        //     {   console.log("RESP", response)
        //         return this.buildNotification(response)},
        //     (error) => {
        //         console.log("ERROR", error)
        //         return this.buildErrorNotification(error)}
        // )
    }

    



    addResource(employeeIdOrAllTeam, selectValue, url, category){
        let request;
        if (employeeIdOrAllTeam != 'all' && selectValue == "employee"){
            request = axios.post(API_URL + '/employee', {

                url: url,
                host: "",
                category: category
                    
                }, {
                    params: {
                        employeeId: employeeIdOrAllTeam,
                    },
                    headers: {Authorization: "Bearer "+ this.getToken()}
                })
        }
        else{
            request = axios.post(API_URL + '/team', {
                    url: url,
                    host: "",
                    category: category              
                }, {
                    params: {
                        managerId: AuthService.getCurrentUser().userInfo.id,
                    },
                    headers: {Authorization: "Bearer "+ this.getToken()}
                })
        }
        
        return request
    }


    getResourcesWithCategoryForEmployee(employeeId){
        const request = axios.get(API_URL + "/employee/withCategory", { 
            params:{
                    employeeId: employeeId
                },
            headers: {Authorization: "Bearer "+ this.getToken()}
        })
        return request
    }


    getResourcesFromSS(){
        return JSON.parse(sessionStorage.getItem('resources'))
    }

    updateResourcesInSS(resources){
        sessionStorage.setItem("resources", JSON.stringify(resources))
    }


    buildErrorNotification(error, message){
        let errMessage = ""
        if (error.response){
            if(error.response.status == 500) errMessage = "Server error"
            else errMessage = error.response.data
        }
        else errMessage = "Server is not available. " + message
        return {
            isOpen: true,
            message: errMessage,
            type: "error"
        }
    }

    buildNotification(response){
        return {
            isOpen: true,
            message: response,
            type: "success"
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