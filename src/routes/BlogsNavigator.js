import React from "react";
import Blogs from "../pages/Blogs";
import BlogsInternal from "../pages/BlogInternal";
import { Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import logo from "../assets/images/logo.png";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const index = ({ navigation, route }) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Blogs"
    >
      <Stack.Screen name="Blogs" component={Blogs} />
      <Stack.Screen name="Blog Internal" component={BlogsInternal} />
    </Stack.Navigator>
  );
};

export default index;
