import { AlternateEmail } from "@material-ui/icons";
import axios from "axios";
import AuthService from "./auth.service"


const API_URL = "http://localhost:8090/user"
class User{


    getUserInfo(userId){
        return axios.get(API_URL + "/getUserInfo",{ 
                                                    params:{userId:userId},
                                                    headers: {Authorization: "Bearer "+ this.getToken()}
                                                  })
        .then(response =>{
            if (response.data.id){
                let user = JSON.parse(sessionStorage.getItem('user'))
                response.data.token = user.userInfo.token;
                user.userInfo = response.data
                sessionStorage.setItem("user", JSON.stringify(user))
            }
            return response.data
        })
    }

    updateUserInfo(newUserInfo) {
        let user = JSON.parse(sessionStorage.getItem('user'))
        user.userInfo = newUserInfo
        sessionStorage.setItem("user", JSON.stringify(user))
        console.log("USER",user)

        return axios.post(API_URL + "/update/info", newUserInfo, this.config())
        .then(response => {
            return response.data})
    }

    updateUserPassword(body){
        return axios.post(API_URL + "/update/password", body, this.config())
        .then(response => {
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
        return axios.post(API_URL + "/update/employee", employeeInfo, this.config())
        .then(response => {
            return response.data}
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

export default new User()