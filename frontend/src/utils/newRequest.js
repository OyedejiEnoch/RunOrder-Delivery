import axios from "axios";
import Cookies from "js-cookie";

const newRequest = axios.create({
  baseURL: "https://runorder-v8qd.onrender.com",
  withCredentials: true,
  credentials: "include",
});

// Intercept the response to retrieve the token and set it in a cookie
newRequest.interceptors.response.use(
  (response) => {
    const token = response.data.token;

    // Set the token in a cookie
    Cookies.set("token", token, {
      expires: 7,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Retrieve the token from the cookie for subsequent requests
newRequest.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    // Set the token in the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default newRequest;

// https://runorder-v8qd.onrender.com

// http://localhost:4000
// import axios from "axios"

// const newRequest = axios.create({
//     baseURL: " http://localhost:4000",
//     withCredentials: true,
//     credentials:"include"

// })

// export default newRequest
