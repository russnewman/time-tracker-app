import { AlternateEmail } from "@material-ui/icons";
import axios from "axios";
import AuthService from "./auth.service"


const API_URL = "http://localhost:8080/user"


class EmployeeService{

    chooseManager(manager){
         let user = AuthService.getCurrentUser();
         user.userManager = manager;
         sessionStorage.setItem("user", JSON.stringify(user))
         console.log("USER", user)

         let body = {
             "userId": user.userInfo.id,
             "managerId": manager.id
         }

         return axios.post(API_URL + "/addManager", body, this.config())
         .then(response => {
             return response.data})
    }

    deleteManager(){
        let user = AuthService.getCurrentUser();
        user.userManager = null;
        sessionStorage.setItem("user", JSON.stringify(user))
        let body = {
            "userId": user.userInfo.id,
        }

        return axios.post(API_URL + "/deleteManager", body, this.config())
        .then(response => {
            return response.data})
    }

    getUserManger(){
        return JSON.parse(sessionStorage.getItem("user")).userManager
    }
    
    config(){
        const accsessToken = AuthService.getCurrentUser().userInfo.token
        return {
            headers: {Authorization: "Bearer "+ accsessToken}
        }
    }

    render(){
        return(
            <h4>HELLO</h4>
        )
    }
}

export default new EmployeeService()