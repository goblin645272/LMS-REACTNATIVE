import { Toast } from "native-base";
import { getquizbyid } from "../api/quiz";

export const getQuizById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await getquizbyid(id);
    return data.result;
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    if (error.response?.status === 401) {
      dispatch({ type: "LOGOUT" });
      return Toast.show({
        title:
          "You have been logged out.Your MK Trading account is in use on another device",
        isClosable: true,
      });
    }
  }
};
