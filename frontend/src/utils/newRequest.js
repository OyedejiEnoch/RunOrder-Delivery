import axios from "axios"


const newRequest = axios.create({
    baseURL: " http://localhost:4000",
    withCredentials: true,
    credentials:"include"
   
})


export default newRequest
