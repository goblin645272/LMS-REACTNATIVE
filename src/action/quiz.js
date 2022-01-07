import Toast from "react-native-toast-message";
import { getquizbyid } from "../api/quiz";
import { logout } from "./auth";

export const getQuizById = (id, navigation) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await getquizbyid(id);
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
