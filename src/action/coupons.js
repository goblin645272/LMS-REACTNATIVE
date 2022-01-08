import { validatecoupons, extensioncoupons } from "../api/coupons";
import { logout } from "./auth";
import Toast from "react-native-toast-message";

export const validateCoupons =
  (couponCode, courseId, plan, update) => async (dispatch) => {
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
          type: "success",
        });
      }
    } catch (error) {
      dispatch({ type: "UNLOAD" });
      throw error;
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
    throw error;
  }
};
