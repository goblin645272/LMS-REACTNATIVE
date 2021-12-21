import axios from "axios";
import baseurl from "./url";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API = axios.create({ baseURL: `${baseurl}/courses` });
Promise.all(
  API.interceptors.request.use(async (req) => {
    if (await AsyncStorage.getItem("token")) {
      req.headers.Authorization = await AsyncStorage.getItem("token");
    }
    return req;
  })
);

export const getcourses = () => API.get("/");
export const getcoursebyid = (formdata) => API.get("/" + formdata);
export const getsingleboughtcourse = (id) =>
  API.get("/getUserSingleCourseInfo/" + id);
export const changewatchstatus = (courseId, videoId) =>
  API.get(`/${courseId}/${videoId}`);
export const getvideodetails = (id) => API.get(`/vdoCipher/${id}`);
