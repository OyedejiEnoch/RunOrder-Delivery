import axios from "axios"


const newRequest = axios.create({
    baseURL: " https://runorder-v8qd.onrender.com",
    withCredentials: true
   
})


export default newRequest
