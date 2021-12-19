import { gettestimonials } from "../api/testimonials";

export const getTestimonials = async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await gettestimonials();
    console.log(data);
    dispatch({ type: "GETTESTIMONIALS", data: data.result });
    dispatch({ type: "UNLOAD" });
  } catch (error) {
    dispatch({ type: "UNLOAD" });

    console.log(error);
  }
};
