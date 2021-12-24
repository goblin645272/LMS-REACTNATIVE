import { getblogs } from "../api/blogs";
import { logout } from "./auth";
export const getBlogs = async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await getblogs();
    console.log(data.result);
    dispatch({ type: "GETBLOGS", data: data.result });
    dispatch({ type: "UNLOAD" });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UNLOAD" });
    if (error.response?.status == 401) {
      logout(dispatch);
      Toast.show({
        title:
          "You have been logged out.Your MK Trading account is in use on another device",
        isClosable: true,
      });
    }
    console.log(error);
  }
};
