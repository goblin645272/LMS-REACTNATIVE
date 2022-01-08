import {
  changepassword,
  getprofile,
  getboughtcourses,
  generateverificationotp,
  verifyverificationotp,
  login,
  signup,
  updateprofile,
} from "../api/auth";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import axios from "axios";

async function getToken() {
  let fcmToken = await AsyncStorage.getItem("fcmToken");
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem("fcmToken", fcmToken);
    }
  }
}
export const signIn = (formData) => async (dispatch) => {
  dispatch({ type: "LOAD" });
  try {
    await getToken();
    console.log(await AsyncStorage.getItem("fcmToken"));
    const { data } = await login(formData);

    if (data.result.role === "admin" || data.result.role === "moderator") {
      dispatch({ type: "UNLOAD" });
      Toast.show({
        type: "info",
        text1: "Admin and Moderator cannot log in",
      });
    } else {
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("profile", JSON.stringify(data.result));
      dispatch({ type: "LOGIN", data: data });
      dispatch({ type: "UNLOAD" });
      Toast.show({
        type: "success",
        text1: "Logged In",
      });
    }
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    console.log(error);
    if (error.response?.status === 400) {
      Toast.show({
        type: "error",
        text1: "Invalid Credentials",
      });
    } else if (error.message === "Network Error") {
      Toast.show({
        type: "error",
        text1: "No internet connection found",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Something went Wrong! Please try again later",
      });
    }
  }
};

export const signUp = (formData) => async (dispatch) => {
  try {
    await getToken();
    const { data } = await signup(formData);
    if (data?.result) {
      await AsyncStorage.setItem("token", data.token);
      dispatch({ type: "LOGIN", data: data });
      dispatch({ type: "UNLOAD" });
      Toast.show({
        type: "success",
        text1: "Logged In",
      });
    }
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    if (error.message === "Network Error") {
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

export const generateVerifyOTP = (formdata, otp) => async (dispatch) => {
  dispatch({ type: "LOAD" });
  try {
    const { data } = await generateverificationotp(formdata);
    if (data.message) {
      dispatch({ type: "UNLOAD" });
      otp();
      await AsyncStorage.setItem("otptoken", data.token);
      Toast.show({
        type: "info",
        text1: "An OTP has been sent on your entered email.",
      });
    }
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    if (error.response.status === 409) {
      Toast.show({
        type: "error",
        text1: "Email already exists",
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

export const emailVerifyOTP = (formdata, register2) => async (dispatch) => {
  dispatch({ type: "LOAD" });
  try {
    const { data } = await verifyverificationotp(formdata);
    await AsyncStorage.clear();
    if (data.message) {
      register2();
    }
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    throw error;
  }
};
export const getBoughtCourses = (navigation) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await getboughtcourses();
    return data.result;
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    if (error.response?.status == 401) {
      logout(dispatch);
      Toast.show({
        type: "error",
        text1:
          "You have been logged out.Your MK Trading account is in use on another device",
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

export const changePassword = (formdata, navigation) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await changepassword(formdata);
    dispatch({ type: "UNLOAD" });
    Toast.show({
      type: "success",
      text1: "Password changed",
    });
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    if (error.response?.status === 400) {
      Toast.show({
        type: "error",
        text1: "Old password is incorrect",
      });
    } else if (error.response?.status == 401) {
      logout(dispatch);
      Toast.show({
        type: "error",
        text1:
          "You have been logged out.Your MK Trading account is in use on another device",
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

export const getProfile = (navigation) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await getprofile();
    dispatch({ type: "GETPROFILE", data: data.result });
    dispatch({ type: "UNLOAD" });
    return data.result;
  } catch (error) {
    if (error.response?.status == 401) {
      logout(dispatch);
      Toast.show({
        type: "error",
        text1:
          "You have been logged out.Your MK Trading account is in use on another device",
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

    dispatch({ type: "UNLOAD" });
  }
};

export const updateProfile = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await updateprofile(formdata);
    dispatch({ type: "UNLOAD" });

    dispatch({ type: "GETPROFILE", data: data.result });
    Toast.show({ type: "success", text1: "Profile Updated" });
  } catch (error) {
    if (error.response?.status == 401) {
      logout(dispatch);

      Toast.show({
        type: "error",
        text1:
          "You have been logged out.Your MK Trading account is in use on another device",
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
    dispatch({ type: "UNLOAD" });
  }
};

export const logout = async (dispatch) => {
  try {
    dispatch({ type: "LOGOUT" });
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
    Toast.show({
      type: "error",
      text1: "Something went wrong! Please try again later",
    });
  }
};

export const check = async () => {
  try {
    const { data } = await axios.get(
      "https://api.mktradingschool.com/check-app-version"
    );
    return data.result;
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Please check your internet connection",
    });
  }
};
