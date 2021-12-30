/**
 * @format
 */

import { AppRegistry, Text } from "react-native";
import { name as appName } from "./app.json";
import "react-native-gesture-handler";
import React from "react";
import store, { persistor } from "./src/redux";
import { Provider } from "react-redux";
import App from "./App";
import messaging from "@react-native-firebase/messaging";
import { PersistGate } from "redux-persist/integration/react";

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log(remoteMessage);
})

// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
function App12() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => App12);
