import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  View,
  ImageBackground,
  Linking,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getCourses } from "../../action/courses";
import { useDispatch, useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import home1 from "../../assets/images/home-banner1.jpg";
import home2 from "../../assets/images/home-banner2.jpg";
import css from "./styles";
import { courseDictImages as images } from "../../api/course constants";
import { Button, VStack, HStack } from "native-base";
const styles = StyleSheet.create(css);
import Carousel from "react-native-snap-carousel";
import { getBoughtCourses } from "../../action/auth";
import { useIsFocused } from "@react-navigation/native";

const Component = (course, { index, item }, navigation) => {
  return (
    <ImageBackground
      key={index}
      source={item.source}
      resizeMode="stretch"
      style={styles.banner}
    >
      <VStack style={styles.bannerContent}>
        <Text style={{ ...styles.bannerText }}>{item.text1}</Text>
        <Button
          onPress={() =>
            item.text1 === "Foundtion Class on Supply & Demand Trading Strategy"
              ? Linking.openURL("https://workshop.mktradingschool.com/")
              : navigation.navigate("Course Internal", {
                id: "612ccd3c9f192c86faa26f48",
                course: course,
              })
          }
          style={styles.bannerButton}
        >
          <Text style={styles.bannerButtonText}>Enroll Now</Text>
        </Button>
        <Text style={{ ...styles.bannerText }}>{item.text2}</Text>
      </VStack>
    </ImageBackground>
  );
};
const index = ({ navigation }) => {
  const [bought, setBought] = useState([]);
  const deviceWindow = Dimensions.get("window");
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getCourses(dispatch);
      const getData = async () => {
        const data = await getBoughtCourses(dispatch);
        setBought(data);
      };
      getData();
    }
  }, [dispatch, setBought, isFocused]);

  const carouselitems = [
    {
      source: home1,
      text1: "Master Stock Trading with & Demand Strategy",
      text2: "Its All About Supply & Demand",
    },
    {
      source: home2,
      text1: "Foundtion Class on Supply & Demand Trading Strategy",
      text2: "Its All About Supply & Demand",
    },
  ];
  return (
    <ScrollView style={styles.scroll}>
      <KeyboardAvoidingView behavior="padding" style={styles.scroll}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 2 }}
          c
          colors={["#ffffff", "#6fbef9"]}
          style={styles.background}
          resizeMode="cover"
        >
          <Carousel
            style={styles.banner}
            layout={"default"}
            data={carouselitems}
            autoplay={true}
            enableSnap={true}
            loop={true}
            autoplayDelay={3000}
            sliderWidth={deviceWindow.width}
            itemWidth={deviceWindow.width}
            renderItem={(obj) => Component(courses?.[0] ,obj, navigation)}
          />
          <Text style={styles.header}>Course & Offerings</Text>
          <ScrollView horizontal={true} style={styles.horizontal}>
            {courses.map((obj) => {
              return (
                <TouchableOpacity
                  key={obj._id}
                  style={styles.courseCard}
                  onPress={() =>
                    navigation.navigate("Course Internal", {
                      id: obj._id,
                      course: obj,
                    })
                  }
                >
                  <Image style={styles.courseImage} source={images[obj._id]} />
                  <View style={styles.courseContainer}>
                    <Text style={styles.courseName}>{obj.name} </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      backgroundColor: "white",
                      paddingLeft: 10,
                      paddingRight: 10,
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                      height: deviceWindow.height * 0.06,
                    }}
                  >
                    <Button
                      style={styles.courseButton}
                      onPress={() =>
                        navigation.navigate("Course Internal", {
                          id: obj._id,
                          course: obj,
                        })
                      }
                    >
                      <Text style={styles.courseButtonText}>Enroll</Text>
                    </Button>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <Text style={styles.header}>Your Courses</Text>
          <ScrollView horizontal={true} style={styles.horizontal}>
            {bought?.map((obj) => {
              return (
                <TouchableOpacity
                  style={styles.courseCard}
                  key={obj._id}
                  onPress={() => {
                    navigation.navigate("Course Details", { id: obj._id });
                  }}
                >
                  <Image style={styles.courseImage} source={images[obj._id]} />
                  <View style={styles.courseContainerRound}>
                    <Text style={styles.courseName}>{obj.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default index;
