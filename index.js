/**
 * @format
 */

import { AppRegistry, Text } from 'react-native';
import { name as appName } from './app.json';
import "react-native-gesture-handler";
import React from "react";
import store from "./src/redux";
import { Provider } from "react-redux";
import App from "./App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// <Provider store={store}>

 function App12() {
 
      return (
        <Provider store={store}>
            <App/>
        </Provider>
      );
  }
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
AppRegistry.registerComponent(appName, ()=>App12);
