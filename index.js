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
import PushNotification from "react-native-push-notification";

import { PersistGate } from "redux-persist/integration/react";
PushNotification.configure({
  // onRegister: function (token) {
  //   console.log("TOKEN:", token);
  // },
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  requestPermissions: Platform.OS === "ios",
  // onAction: function (notification) {
  //   console.log("ACTION:", notification.action);
  //   console.log("NOTIFICATION:", notification);

  // },

  // onRegistrationError: function(err) {
  //   console.error(err.message, err);
  // },

  // permissions: {
  //   alert: true,
  //   badge: true,
  //   sound: true,
  // },

  // popInitialNotification: true,

  // requestPermissions: true,
});
function App12() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
AppRegistry.registerComponent(appName, () => App12);
