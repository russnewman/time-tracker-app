import axios from "axios";
const API_URL = "http://localhost:8080"


class Rest{




    updateUserInfo(userInfo) {

        localStorage.setItem("user", JSON.stringify(userInfo))
        const config = {
            headers: {Authorization: "Bearer "+ userInfo.token}
        }

        return axios.post(API_URL + "/user/update", userInfo, config)
        .then(console.log).catch(console.log)
   
    }
}

export default new Rest()