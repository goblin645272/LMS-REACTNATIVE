import { geteventswithauth } from "../api/events";

export const getEvents = async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await geteventswithauth();
    dispatch({ type: "GETEVENTS", data: data.result });
    dispatch({ type: "UNLOAD" });
  } catch (error) {
    dispatch({ type: "UNLOAD" });
  }
};
