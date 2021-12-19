import { getblogs } from "../api/blogs";

export const getBlogs = async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await getblogs();
    dispatch({ type: "GETBLOGS", data: data.result });
    dispatch({ type: "UNLOAD" });
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    console.log(error);
  }
};
