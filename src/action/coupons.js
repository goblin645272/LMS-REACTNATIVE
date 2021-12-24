import { validatecoupons, extensioncoupons } from "../api/coupons";
import { logout } from "./auth";
import { Toast } from "native-base";

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
          title: "Coupon applied successfully",
          isClosable: true,
        });
      }
    } catch (error) {
      dispatch({ type: "UNLOAD" });
      if (error.response.status === 400) {
        Toast.show({
          title: "Coupon is not Valid",
          isClosable: true,
        });
        Error();
      } else if (error.response?.status === 401) {
        logout(dispatch);
        return Toast.show({
          title:
            "You have been logged out.Your MK Trading account is in use on another device",
          isClosable: true,
        });
      } else if (error.response.status === 500) {
        Toast.show({
          title: "Please Try again",
          isClosable: true,
        });
        Error();
      } else {
        Toast.show({
          title: "Something went wrong",
          isClosable: true,
        });
      }
    }
  };

export const extensionCoupon = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await extensioncoupons(formdata);
    if (data?.result) {
      dispatch({ type: "UNLOAD" });
      Toast.show({
        title: "Coupon applied successfully",
        isClosable: true,
      });
    }
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    if (error.response.status === 400) {
      return Toast.show({
        title: "Coupon Not vaild",
        isClosable: true,
      });
    }
    if (error.response.status === 404) {
      return Toast.show({
        title: "Coupon not found",
        isClosable: true,
      });
    }
    if (error.response?.status === 401) {
      logout(dispatch);
      return Toast.show({
        title:
          "You have been logged out.Your MK Trading account is in use on another device",
        isClosable: true,
      });
    }
    if (error.response.status === 500) {
      return Toast.show({
        title: "please try again",
        isClosable: true,
      });
    }
  }
};
