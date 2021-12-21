import { getblogs } from "../api/blogs";
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
    console.log(error);
  }
};
