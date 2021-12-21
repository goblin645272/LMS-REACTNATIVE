import {
  getcourses,
  getcoursebyid,
  getsingleboughtcourse,
  changewatchstatus,
  getvideodetails,
} from "../api/courses";
import { Toast } from "native-base";

export const getCourses = async (dispatch) => {
  dispatch({ type: "LOAD" });
  try {
    const { data } = await getcourses();
    console.log(data);
    dispatch({ type: "GETCOURSES", data: data.result });
    dispatch({ type: "UNLOAD" });
  } catch (error) {
    dispatch({ type: "UNLOAD" });
  }
};

export const getCourseById = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await getcoursebyid(formdata);
    dispatch({ type: "UNLOAD" });
    return data.result;
  } catch (error) {
    dispatch({ type: "UNLOAD" });
  }
};

export const getBoughtCourseById = (id) => async (dispatch) => {
  dispatch({ type: "LOAD" });
  try {
    const { data } = await getsingleboughtcourse(id);
    dispatch({ type: "UNLOAD" });
    return data.result;
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    if (error.response?.status === 401) {
      dispatch({ type: "LOGOUT" });
      Toast.show({
        title:
          "You have been logged out.Your MK Trading account is in use on another device",
        isClosable: true,
      });
    }
    if (error.response?.status === 400) {
      Toast.show({
        title:
          "This course subscription is invalid. Please consider buying it.",
        isClosable: true,
      });
    }
  }
};

export const changeWatchStatus = (courseId, videoId) => async (dispatch) => {
  try {
    await changewatchstatus(courseId, videoId);
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch({ type: "LOGOUT" });
    }
  }
};

export const getVideoDetails = (id) => async (dispatch) => {
  try {
    const { data } = await getvideodetails(id);
    return data.result;
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch({ type: "LOGOUT" });
    }
  }
};
