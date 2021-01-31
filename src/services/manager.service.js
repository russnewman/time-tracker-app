import { AlternateEmail } from "@material-ui/icons";
import axios from "axios";
import AuthService from "./auth.service"


const API_URL = "http://localhost:8080/user"


class Manager{

    updateEmployeeInfo(employeeInfo){
        let user = JSON.parse(sessionStorage.getItem('user'))
        // employees = user.userEmployees
        for (let i=0; i< user.userEmployees.length; i++){
            if (user.userEmployees[i].id === employeeInfo.id){
                user.userEmployees[i] = employeeInfo
                break;
            }
        }
        sessionStorage.setItem("user", JSON.stringify(user))
        // console.log("$$$",user)

        return axios.post(API_URL + "/update/employee", employeeInfo, this.config())
        .then(response => {
            return response.data}
        )
    }

    deleteEmployee(employeeId){

        let user = JSON.parse(sessionStorage.getItem('user'))
        for (let i=0; i< user.userEmployees.length; i++){
            if (user.userEmployees[i].id === employeeId){
                user.userEmployees.splice(i,1)
                break;
            }
        }
        sessionStorage.setItem("user", JSON.stringify(user))

        return axios.post(API_URL + "/delete/employee", {"employeeId": employeeId}, this.config())
        .then(response => {
            return response.data}
        )
    }
    
    config(){
        return {
            headers: {Authorization: "Bearer "+ this.getToken()}
        }
    }
    getToken(){
        return  AuthService.getCurrentUser().userInfo.token
    }
}

export default new Manager()