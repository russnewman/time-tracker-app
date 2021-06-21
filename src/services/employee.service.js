import { AlternateEmail } from "@material-ui/icons";
import axios from "axios";
import AuthService from "./auth.service"


const API_URL = "http://localhost:8080/user"


class EmployeeService{

    getAllManagersRest(){
        let user = AuthService.getCurrentUser()
        return axios.get(API_URL + "/getAllManagers",{headers: {Authorization: "Bearer "+ this.getToken()}})
                .then(response =>{
                        user.managers = response.data
                        sessionStorage.setItem("user", JSON.stringify(user))
                        return response.data}
                )
    }

    getManagerRest(){
        let user = AuthService.getCurrentUser()
        return axios.get(API_URL + "/getManager",{ 
                                                        headers: {Authorization: "Bearer "+ this.getToken()}
                                                    })
                .then(response =>{
                        user.userManager = response.data
                        sessionStorage.setItem("user", JSON.stringify(user))
                        return response.data}
                )
    }

    chooseManagerRest(manager){
         let user = AuthService.getCurrentUser();
         user.userManager = manager;
         sessionStorage.setItem("user", JSON.stringify(user))

         let body = {
             "managerId": manager.id
         }

         return axios.post(API_URL + "/addManager", body, this.config())
         .then((response) => {return this.buildNotification(response)},
            (error) => {return this.buildErrorNotification(error)})
    }

    deleteManagerRest(){
        let user = AuthService.getCurrentUser();
        user.userManager = null;
        sessionStorage.setItem("user", JSON.stringify(user))
        let body = {
        }

        return axios.post(API_URL + "/deleteManager", body, this.config())
        .then((response) => {return this.buildNotification(response)},
             (error) => {return this.buildErrorNotification(error)}
        )
    }

    getUserManger(){
        return JSON.parse(sessionStorage.getItem("user")).userManager
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
        return AuthService.getCurrentUser().userInfo.token
    }
}

export default new EmployeeService()