import { validatecoupons, extensioncoupons } from "../api/coupons";
import { logout } from "./auth";
import Toast from "react-native-toast-message";

export const validateCoupons =
  (couponCode, courseId, plan, update, Error) => async (dispatch) => {
    try {
      dispatch({ type: "LOAD" });
      const { data } = await validatecoupons({
        couponCode: couponCode,
        courseId: courseId,
        plan: plan,
      });
      if (data?.result.valid) {
        dispatch({ type: "UNLOAD" });
        update(data?.result);
        Toast.show({
          text1: "Coupon applied successfully",
          type: 'success'
        });
      }
    } catch (error) {
      dispatch({ type: "UNLOAD" });
      if (error.response.status === 400) {
        Toast.show({
          text1: "Coupon is not Valid",
          type: "error",
        });
        Error();
      } else if (error.message === "Network Error") {
        Toast.show({
          type: "error",
          text1: "No internet connection found",
        });
      } else if (error.response?.status === 401) {
        logout(dispatch);
        Toast.show({
          text1:
            "You have been logged out.Your MK Trading account is in use on another device",
          type: "error",
        });
      } else if (error.response.status === 500) {
        Toast.show({
          text1: "Please Try again",
          type: "error",
        });
        Error();
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
        });
      }
    }
  };

export const extensionCoupon = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await extensioncoupons(formdata);
    if (data?.result.valid) {
      dispatch({ type: "UNLOAD" });
      Toast.show({
        text1: "Coupon applied successfully",
      });
      return data.result;
    }
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    if (error.response.status === 400) {
      Toast.show({
        text1: "Coupon Not vaild",
        type: "error",
      });
    } else if (error.response.status === 404) {
      Toast.show({
        text1: "Coupon not found",
        type: "error",
      });
    } else if (error.response?.status === 401) {
      logout(dispatch);
      Toast.show({
        text1:
          "You have been logged out.Your MK Trading account is in use on another device",
        type: "error",
      });
    } else if (error.response.status === 500) {
      Toast.show({
        text1: "please try again",
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
