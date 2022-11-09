import axios from "axios";
const HOST = process.env.REACT_APP_HOST

export const getToken = async () => {
  console.log("get token")
  let data = {
    "refresh": localStorage.getItem('refreshToken')
  }
  var config = {
    method: 'post',
    url: HOST + '/refresh-token/',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  await axios(config)
    .then(function (response) {
      localStorage.setItem("accessToken", response.data.access)
    })
    .catch(function (error) {
      localStorage.clear()
    });

}

