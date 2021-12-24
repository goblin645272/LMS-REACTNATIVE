import axios from "axios";
import baseurl from "./url";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API = axios.create({ baseURL: `${baseurl}/testimonials` });
Promise.all(
  API.interceptors.request.use(async (req) => {
    if (await AsyncStorage.getItem("token")) {
      req.headers.Authorization = await AsyncStorage.getItem("token");
    }

    return req;
  })
);

export const gettestimonials = () => API.get("/getDedicatedTestimonialsPage");
export const updatetestimonial = (formdata) =>API.post(`/`, formdata);