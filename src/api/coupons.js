import axios from "axios";
import baseurl from "./url";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API = axios.create({ baseURL: `${baseurl}/coupons` });
Promise.all(
  API.interceptors.request.use(async (req) => {
    if (await AsyncStorage.getItem("token")) {
      req.headers.Authorization = await AsyncStorage.getItem("token");
    }
    return req;
  })
);

export const validatecoupons = (formdata) =>
  API.post(`/validate-coupon-razorpay`, formdata);
export const extensioncoupons = (formdata) =>
  API.post("/validate-coupon-extention", formdata);
