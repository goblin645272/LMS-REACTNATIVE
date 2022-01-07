import {
  getcourses,
  getcoursebyid,
  getsingleboughtcourse,
  changewatchstatus,
  getvideodetails,
  getcertificate,
  getofflinevideodetails,
} from "../api/courses";
import { logout } from "./auth";
import Toast from "react-native-toast-message";

export const getCourses = async (dispatch) => {
  try {
    const { data } = await getcourses();
    dispatch({ type: "GETCOURSES", data: data.result });
    dispatch({ type: "UNLOAD" });
  } catch (error) {
    if (error.response?.status == 401) {
      logout(dispatch);
      Toast.show({
        text1:
          "You have been logged out.Your MK Trading account is in use on another device",
        type: "error",
      });
    }
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
    if (error.response?.status == 401) {
      logout(dispatch);
      Toast.show({
        text1:
          "You have been logged out.Your MK Trading account is in use on another device",
        type: "error",
      });
    }
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
    if (error.response?.status == 401) {
      logout(dispatch);
      Toast.show({
        text1:
          "You have been logged out.Your MK Trading account is in use on another device",
        type: "error",
      });
    }
    if (error.response?.status === 400) {
      Toast.show({
        text1:
          "This course subscription is invalid. Please consider buying it.",
        type: "error",
      });
    }
  }
};

export const changeWatchStatus =
  (courseId, videoId, navigation) => async (dispatch) => {
    try {
      await changewatchstatus(courseId, videoId);
    } catch (error) {
      if (error.response?.status == 401) {
        logout(dispatch);
        Toast.show({
          text1:
            "You have been logged out.Your MK Trading account is in use on another device",
          type: "error",
        });
      } else if (error.message === "Network Error") {
        navigation.navigate("OfflineVideo", {
          toast: () =>
            Toast.show({
              type: "error",
              text1: "No internet connection found",
            }),
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
        });
      }
    }
  };

export const getVideoDetails = (id, navigation) => async (dispatch) => {
  try {
    const { data } = await getvideodetails(id);
    return data.result;
  } catch (error) {
    if (error.response?.status == 401) {
      logout(dispatch);
      Toast.show({
        text1:
          "You have been logged out.Your MK Trading account is in use on another device",
        type: "error",
      });
    } else if (error.message === "Network Error") {
      navigation.navigate("OfflineVideo", {
        toast: () =>
          Toast.show({
            type: "error",
            text1: "No internet connection found",
          }),
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    }
  }
};

export const getCertificate = (id) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    await getcertificate(id);
    dispatch({ type: "UNLOAD" });
    Toast.show({
      text1: "Please check your email for certificate",
    });
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    if (error.response?.status === 401) {
      logout(dispatch);
      Toast.show({
        text1:
          "You have been logged out.Your MK Trading account is in use on another device",
        type: "error",
      });
    } else if (error.message === "Network Error") {
      Toast.show({
        type: "error",
        text1: "No internet connection found",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    }
  }
};

export const getOfflineVideoDetails =
  (id, courseID, navigation) => async (dispatch) => {
    try {
      dispatch({ type: "LOAD" });
      const { data } = await getofflinevideodetails(id, courseID);
      return data.result;
    } catch (error) {
      dispatch({ type: "UNLOAD" });
      if (error.response?.status == 401) {
        logout(dispatch);
        Toast.show({
          text1:
            "You have been logged out.Your MK Trading account is in use on another device",
          type: "error",
        });
      } else if (error.message === "Network Error") {
        navigation.navigate("OfflineVideo", {
          toast: () =>
            Toast.show({
              type: "error",
              text1: "No internet connection found",
            }),
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
        });
      }
    }
  };
