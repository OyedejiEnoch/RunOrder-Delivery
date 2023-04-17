import axios from "axios"


const newRequest = axios.create({
    baseURL: " http://127.0.0.1:4000",
    withCredentials: true
   
})


export default newRequest

// http://127.0.0.1:4000
// https://runorder.onrender.com