import { geteventswithauth } from "../api/events";

export const getEvents = async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await geteventswithauth();
    dispatch({ type: "GETEVENTS", data: data.result });
    dispatch({ type: "UNLOAD" });
    return data.result;
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
