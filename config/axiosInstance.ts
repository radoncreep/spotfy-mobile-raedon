import axios from "axios";

export const api = axios.create({
    // baseURL: "http://192.168.0.140:8080/",
    baseURL: "http://172.20.10.12:8080/",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})
