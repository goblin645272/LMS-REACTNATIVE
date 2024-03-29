import auth from "./auth";
import loader from "./load";
import courses from "./courses";
import blogs from "./blogs";
import events from "./events";
import testimonials from "./testimonials";
import video from "./video";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
const reducer = combineReducers({
  auth,
  loader,
  courses,
  testimonials,
  blogs,
  events,
  video,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
