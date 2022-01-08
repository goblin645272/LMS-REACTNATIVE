import React from "react";
import CourseArchive from "../pages/CourseArchive";
import CourseVideo from "../pages/CourseVideo";
import CourseContent from "../pages/CourseContent";
import CourseDetails from "../pages/Course Details";
import { Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import logo from "../assets/images/logo.png";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Quiz from "../pages/Quiz";
const index = ({ navigation, route }) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="CourseDetails"
    >
      <Stack.Screen
        name="Course Details"
        component={CourseDetails}
        initialParams={route.params}
      />
      <Stack.Screen name="Course Content" component={CourseContent} />
      <Stack.Screen name="Course Video" component={CourseVideo} />
      <Stack.Screen name="Course Archive" component={CourseArchive} />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={({ route, navigation }) => ({
          title: "",
          headerLeft: () => (
            <AntDesign
              name="left"
              size={30}
              color="black"
              onPress={() =>
                navigation.navigate("Course Video", {
                  course: route.params.course,
                  video: route.params.video,
                  id: route.params._id,
                })
              }
            />
          ),
          headerRight: () => (
            <Image
              source={logo}
              style={{
                height: 35,
                width: 120,
                resizeMode: "cover",
              }}
            ></Image>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default index;
