import { getblogs } from "../api/blogs";
import { logout } from "./auth";
import Toast from "react-native-toast-message";

export const getBlogs = (navigation) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await getblogs();
    dispatch({ type: "GETBLOGS", data: data.result });
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
