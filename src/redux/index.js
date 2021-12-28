import auth from "./auth";
import loader from "./load";
import courses from "./courses";
import blogs from "./blogs";
import events from "./events";
import testimonials from "./testimonials";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};

const reducer = combineReducers({
  auth,
  loader,
  courses,
  testimonials,
  blogs,
  events,
});
const persist = persistReducer(persistConfig, reducer);
const store = createStore(persist, applyMiddleware(thunk));
export const persistor = persistStore(store)
export default store;
