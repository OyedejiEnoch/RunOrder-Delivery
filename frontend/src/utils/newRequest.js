import axios from 'axios';
import Cookies from 'js-cookie';

const newRequest = axios.create({
  baseURL: 'https://runorder-v8qd.onrender.com',
  withCredentials: true,
  credentials: 'include',
});

// Intercept the response to retrieve the token and set it in a cookie
newRequest.interceptors.response.use(
  response => {
    const token = response.data.token;
    // console.log(token)
    // Set the token in a cookie
    Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'None' });

    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default newRequest;





// http://localhost:4000
// import axios from "axios"


// const newRequest = axios.create({
//     baseURL: " http://localhost:4000",
//     withCredentials: true,
//     credentials:"include"
   
// })


// export default newRequest
