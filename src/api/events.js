import axios from "axios";
import baseurl from "./url";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API = axios.create({ baseURL: `${baseurl}/events` });
Promise.all(
  API.interceptors.request.use(async (req) => {
    if (await AsyncStorage.getItem("otptoken")) {
      req.headers.Authorization = await AsyncStorage.getItem("otptoken");
    } else if (await AsyncStorage.getItem("token")) {
      req.headers.Authorization = await AsyncStorage.getItem("token");
    }
    return req;
  })
);
export const geteventswithauth = () => API.get("/eventsWithAuth");
