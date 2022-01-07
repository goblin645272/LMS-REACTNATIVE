import { gettestimonials, updatetestimonial } from "../api/testimonials";
import Toast from "react-native-toast-message";
import { logout } from "./auth";

export const getTestimonials = (navigation) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await gettestimonials();
    dispatch({ type: "GETTESTIMONIALS", data: data.result });
    dispatch({ type: "UNLOAD" });
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

export const updateTestimonial =
  (formdata, unload, unload_02) => async (dispatch) => {
    try {
      const { data } = await updatetestimonial(formdata);
      Toast.show({
        text1: "Thanks for your valuable feedback",
      });
      unload();
      return data.result;
    } catch (error) {
      if (error.response?.status === 401) {
        logout(dispatch);
        Toast.show({
          text1:
            "You have been logged out.Your MK Trading account is in use on another device",
          type: "error",
        });
      } else if (error.message === "Network Error") {
        unload();
        Toast.show({
          type: "error",
          text1: "No internet connection found",
        });
      } else {
        Toast.show({
          text1: "Something went wrong. Please try again",
          type: "error",
        });
      }
      unload_02();
    }
  };
