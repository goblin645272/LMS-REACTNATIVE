import axios from "axios";
import baseurl from "./url";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API = axios.create({ baseURL: `${baseurl}/auth` });
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

export const login = (formdata) => API.post("/login", formdata);
export const signup = (formData) => API.post("/register", formData);
export const getboughtcourses = () => API.get("/bought-courses");
export const changepassword = (data) => API.put("change-password", data);
export const getprofile = () => API.get("/");
export const updateprofile = (formdata) =>
  API.post("/update-profile", formdata);
export const generateverificationotp = (formdata) =>
  API.post("/email-generate-otp", formdata);
export const verifyverificationotp = (formdata) =>
  API.post("/email-verify-otp", formdata);
export const signUp = (formData) => API.post("/register", formData);
