import axios from "axios";
// import NetInfo, { NetInfoState } from "@react-native-community/netinfo";-


// (async () => {
//     const state = NetInfo.fetch().then(state => state.details);
//     const net = state.details;
    
//     console.log({ net })
// })()


export const api = axios.create({
    // baseURL: "http://192.168.0.156:8080/",
    baseURL: "http://172.20.10.2:8080/",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})