import React from "react";
import { Image } from "react-native";
import Drawer from "../Components/Drawer";
import { NavigationContainer } from "@react-navigation/native";
import logo from "../assets/images/logo.png";
import Home from "../pages/Home";
import ContactUs from "../pages/ContactUs";
import CourseInternal from "../pages/Course Internal";
import CourseDetails from "../pages/Course Details";
import Profile from "../pages/Profile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Testimonials from "../pages/Testimonials";
import Quiz from "../pages/Quiz";
import ChangePassword from "../pages/Change Password";
import courseVideo from "../pages/CourseVideo";
import courseArchive from "../pages/CourseArchive";
import courseContent from "../pages/CourseContent";
import EventCalendar from "../pages/Event Calendar";
import Prepayment from "../pages/Prepayment";
import Blogs from "../pages/Blogs";
import BlogInternal from "../pages/BlogInternal";
import NoInternet from "../pages/NoInternet"

const index = ({navigation}) => {
  const Stack = createDrawerNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          drawerContent={(props) => <Drawer {...props} />}
          initialRouteName="Home"
          screenOptions={{
            headerTitle: "",
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
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Course Internal" component={CourseInternal} />
          <Stack.Screen name="Course Details" component={CourseDetails} />
          <Stack.Screen name="Change Password" component={ChangePassword} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen name="Blogs" component={Blogs} />
          <Stack.Screen name="Testimonials" component={Testimonials} />
          <Stack.Screen name="Course Video" component={courseVideo} />
          <Stack.Screen name="Blog Internal" component={BlogInternal} />
          <Stack.Screen name="Course Content" component={courseContent} />
          <Stack.Screen name="Course Archive" component={courseArchive} />
          <Stack.Screen name="Quiz" component={Quiz} />
          <Stack.Screen name="Event Calendar" component={EventCalendar} />
          <Stack.Screen name="Prepayment" component={Prepayment} />
          <Stack.Screen name="No Internet Auth" component={NoInternet} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default index;
