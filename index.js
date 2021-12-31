/**
 * @format
 */

import { AppRegistry, Text } from "react-native";
import { name as appName } from "./app.json";
import "react-native-gesture-handler";
import React from "react";
import store from "./src/redux";
import { Provider } from "react-redux";
import App from "./App";
import messaging from "@react-native-firebase/messaging";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log(remoteMessage);
});

function App12() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => App12);
