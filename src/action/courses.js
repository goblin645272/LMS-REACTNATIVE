import { getcourses, getcoursebyid } from "../api/courses";
export const getCourses = async (dispatch) => {
  dispatch({ type: "LOAD" });
  try {
    const { data } = await getcourses();
    dispatch({ type: "GETCOURSES", data: data.result });
    dispatch({ type: "UNLOAD" });
  } catch (error) {
    dispatch({ type: "UNLOAD" });
  }
};

export const getCourseById = (formdata) => async (dispatch) => {
  try {
    const { data } = await getcoursebyid(formdata);
    dispatch({ type: "UNLOAD" });
    return data.result;
  } catch (error) {
    dispatch({ type: "UNLOAD" });
  }
};
