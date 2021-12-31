import { gettestimonials, updatetestimonial } from "../api/testimonials";
import { Toast } from "native-base";

export const getTestimonials = async (dispatch) => {
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
        title:
          "You have been logged out.Your MK Trading account is in use on another device",
        isClosable: true,
      });
    }
  }
};

export const updateTestimonial =
  (formdata, unload, unload_02) => async (dispatch) => {
    try {
      const { data } = await updatetestimonial(formdata);
      Toast.show({
        title: "Thanks for your valuable feedback",
        isClosable: true,
      });
      unload();
      return data.result;
    } catch (error) {
      if (error.response?.status === 401) {
        logout(dispatch);
        return Toast.show({
          title:
            "You have been logged out.Your MK Trading account is in use on another device",
          isClosable: true,
        });
      }
      Toast.show({
        title: "Something went wrong. Please try again",
        isClosable: true,
      });
      unload_02();
    }
  };
