import axios from "axios";
import DateService from "../services/date.service"

const API_URL = "http://localhost:8090/auth/";

class AuthService {

  login(email, password) {

    // let correctDate = DateService.toRightFormat(date)
    // let correctTimePeriod = DateService.timePeriodToString(periodOfTime)
    // let user = AuthService.getCurrentUser()



  //   const requestOne = axios.post(API_URL + "signin", {
  //                                     email,
  //                                     password
  //                                   })

  //   const requestTwo = axios.get(API_URL + "/team", { 
  //     params:{
  //             userId: user.userInfo.id,
  //             date: correctDate,
  //             periodOfTime: correctTimePeriod
  //         },
  //     headers: {Authorization: "Bearer "+ this.getToken()}
  // })                                

  //   const requestTwo = 
  //   axios.all([requestOne, requestTwo, requestThree])
  //   .then(axios.spread((...responses) => {
  //     const responseOne = responses[0]
  //     const responseTwo = responses[1]
  //     const responesThree = responses[2]
  //     // use/access the results 
  //   }))


    return axios.post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.userInfo && response.data.userInfo.token) {
            sessionStorage.setItem("user", JSON.stringify(response.data));
            return axios.get("http://localhost:8090/efficiency/team", { 
              params:{
                      userId: response.data.userInfo.id,
                      date: DateService.toRightFormat(new Date()),
                      periodOfTime: "day"
                  },
              headers: {Authorization: "Bearer "+ response.data.userInfo.token}
            }).then((response2) => {
              sessionStorage.setItem("efficiency", JSON.stringify(response2.data))
              return response.data
            })
        }
        else{
          return response.data
        }
      });
  }


  logout() {
    sessionStorage.removeItem("user");
  }

  register(email, password, fullName, department, position, role){
    return axios.post(API_URL + "signup", {
        email,
        password,
        fullName,
        department,
        position,
        role
    })
    .then(response => {
      if (response.data.userInfo.token) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data
      // console.log("FFF",response)
    })
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }
}

export default new AuthService();