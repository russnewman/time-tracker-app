// import { AlternateEmail } from "@material-ui/icons";
import axios from "axios";
import AuthService from "./auth.service"


const API_URL = "http://localhost:8080/user"


class Manager{

    getEmployeesRest(){
        let user = AuthService.getCurrentUser()
        return axios.get(API_URL + "/getEmployees",{ 
                                                    params:{userId:user.userInfo.id},
                                                    headers: {Authorization: "Bearer "+ this.getToken()}
                                                    })
            .then(response =>{
                    user.employees = response.data
                    sessionStorage.setItem("user", JSON.stringify(user))
                    return response.data}
            )
    }

    updateEmployeeInfo(employeeInfo){
        let user = JSON.parse(sessionStorage.getItem('user'))
        for (let i=0; i< user.employees.length; i++){
            if (user.employees[i].id === employeeInfo.id){
                user.employees[i] = employeeInfo
                break;
            }
        }
        sessionStorage.setItem("user", JSON.stringify(user))
        return user.employees
    }

    updateEmployeeInfoRest(employeeInfo){    
        return axios.post(API_URL + "/update/employee", employeeInfo, this.config())
        .then((response) => {return this.buildNotification(response)},
             (error) => {return this.buildErrorNotification(error)}
        )
    }

    deleteEmployee(employeeId){
        let user = JSON.parse(sessionStorage.getItem('user'))
        for (let i=0; i< user.employees.length; i++){
            if (user.employees[i].id === employeeId){
                user.employees.splice(i,1)
                break;
            }
        }
        sessionStorage.setItem("user", JSON.stringify(user))
        return user.employees
    }
    
    deleteEmployeeRest(employeeId){
        return axios.post(API_URL + "/delete/employee", {"employeeId": employeeId}, this.config())
        .then((response) => {return this.buildNotification(response)},
             (error) => {return this.buildErrorNotification(error)}
        )
    }

    buildNotification(response){
        return {
            isOpen: true,
            message: response.data,
            type: "success"
        }
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
        return  AuthService.getCurrentUser().userInfo.token
    }


    getEmployeeInfoFromSessionStorage(employeeId){
        
        let user = JSON.parse(sessionStorage.getItem('user'))
        for (let employee of user.employees){
            if (employee.id == employeeId) {
                return employee
            }
        }
    }

}

export default new Manager()