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
import NoInternet from "../pages/NoInternet";
import AntDesign from "react-native-vector-icons/AntDesign";

const index = () => {
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
          <Stack.Screen
            name="Course Internal"
            component={CourseInternal}
            options={({ navigation }) => ({
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
            })}
          />
          <Stack.Screen
            name="Course Details"
            component={CourseDetails}
            options={({ navigation }) => ({
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
            })}
          />
          <Stack.Screen name="Change Password" component={ChangePassword} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen name="Blogs" component={Blogs} />
          <Stack.Screen name="Testimonials" component={Testimonials} />
          <Stack.Screen
            name="Course Video"
            component={courseVideo}
            options={({ route, navigation }) => ({
              title: "",
              headerLeft: () => (
                <AntDesign
                  name="left"
                  size={30}
                  color="black"
                  onPress={() =>
                    navigation.navigate("Course Details", {
                      id: route.params.id,
                    })
                  }
                />
              ),
              headerRight: () => (
                <Image
                  style={{ width: 100, height: 40 }}
                  source={require("../assets/images/logo.png")}
                />
              ),
            })}
          />
          <Stack.Screen name="Blog Internal" component={BlogInternal} />
          <Stack.Screen
            name="Course Content"
            component={courseContent}
            options={({ route, navigation }) => ({
              title: "",
              headerLeft: () => (
                <AntDesign
                  name="left"
                  size={30}
                  color="black"
                  onPress={() =>
                    navigation.navigate("Course Details", {
                      id: route.params.id,
                    })
                  }
                />
              ),
              headerRight: () => (
                <Image
                  style={{ width: 100, height: 40 }}
                  source={require("../assets/images/logo.png")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Course Archive"
            component={courseArchive}
            options={({ route, navigation }) => ({
              title: "",
              headerLeft: () => (
                <AntDesign
                  name="left"
                  size={30}
                  color="black"
                  onPress={() =>
                    navigation.navigate("Course Details", {
                      id: route.params.id,
                    })
                  }
                />
              ),
              headerRight: () => (
                <Image
                  style={{ width: 100, height: 40 }}
                  source={require("../assets/images/logo.png")}
                />
              ),
            })}
          />
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
                    })
                  }
                />
              ),
              headerRight: () => (
                <Image
                  style={{ width: 100, height: 40 }}
                  source={require("../assets/images/logo.png")}
                />
              ),
            })}
          />
          <Stack.Screen name="Event Calendar" component={EventCalendar} />
          <Stack.Screen
            name="Prepayment"
            component={Prepayment}
            options={({ navigation }) => ({
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
            })}
          />
          <Stack.Screen name="No Internet Auth" component={NoInternet} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default index;
