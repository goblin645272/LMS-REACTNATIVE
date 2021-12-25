import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TnC from "../pages/TnC";
import RefundPolicy from "../pages/RefundPolicy";
import Privacy from "../pages/Privacy";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NoInternet from "../pages/NoInternet"

import AntDesign from "react-native-vector-icons/AntDesign";
const index = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{
              headerShown: false,
            }}
            component={Login}
          />
          <Stack.Screen
            options={{
              title: "",
              headerLeft: () => (
                <AntDesign
                  name="left"
                  size={30}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              ),
              headerRight: () => (
                <Image
                  style={{ width: 100, height: 40 }}
                  source={require("../assets/images/logo.png")}
                />
              ),
            }}
            name="Privacy Policy"
            component={Privacy}
          />

          <Stack.Screen
            name="RefundPolicy"
            options={{
              title: "",

              headerLeft: () => (
                <AntDesign
                  name="left"
                  size={30}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              ),
              headerRight: () => (
                <Image
                  style={{ width: 100, height: 40 }}
                  source={require("../assets/images/logo.png")}
                />
              ),
            }}
            component={RefundPolicy}
          />

          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Register"
            component={Register}
          />
          <Stack.Screen
            name="TnC"
            options={{
              title: "",
              headerLeft: () => (
                <AntDesign
                  name="left"
                  size={24}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              ),
            }}
            component={TnC}
          />
          <Stack.Screen
            name="No Internet"
            options={{
              title: "",
              headerLeft: () => (
                <AntDesign
                  name="left"
                  size={24}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              ),
            }}
            component={NoInternet}
          />
        </Stack.Navigator>
        
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default index;
