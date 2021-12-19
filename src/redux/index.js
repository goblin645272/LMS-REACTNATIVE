import auth from "./auth";
import loader from "./load";
import courses from "./courses";
import blogs from "./blogs";
import testimonials from "./testimonials";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
const reducer = combineReducers({ auth, loader, courses, testimonials, blogs });

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
