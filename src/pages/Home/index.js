import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  Dimensions,
  View,
  ImageBackground,
  Linking,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getCourses } from "../../action/courses";
import Toast from "react-native-toast-message";
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
    <TouchableOpacity
      onPress={() =>
        item.text1 === "Foundation Class on Supply & Demand Trading Strategy"
          ? Linking.openURL("https://workshop.mktradingschool.com/")
          : navigation.navigate("Course Internal", {
              id: "612ccd3c9f192c86faa26f48",
              course: course,
            })
      }
    >
      <ImageBackground
        key={index}
        source={item.source}
        resizeMode="stretch"
        style={styles.banner}
      >
        <VStack style={styles.bannerContent}>
          <Text allowFontScaling={false} style={{ ...styles.bannerText }}>
            {item.text1}
          </Text>
          <Text allowFontScaling={false} style={{ ...styles.bannerText }}>
            {item.text2}
          </Text>
        </VStack>
      </ImageBackground>
    </TouchableOpacity>
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
      const getData = async () => {
        const data = await dispatch(getBoughtCourses(navigation));
        await getCourses(dispatch);
        setBought(data);
        dispatch({ type: "UNLOAD" });
      };
      getData();
    }
  }, [setBought, isFocused]);
  const carouselitems = [
    {
      source: home1,
      text1: "Master Stock Trading with & Demand Strategy",
      text2: "Its All About Supply & Demand",
    },
    {
      source: home2,
      text1: "Foundation Class on Supply & Demand Trading Strategy",
      text2: "Its All About Supply & Demand",
    },
  ];
  return (
    <ScrollView style={styles.scroll}>
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
          renderItem={(obj) =>
            Component(
              courses?.find((item) => item._id === "612ccd3c9f192c86faa26f48"),
              obj,
              navigation
            )
          }
        />
        <Text allowFontScaling={false} style={styles.header}>
          Course & Offerings
        </Text>
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
                  <Text allowFontScaling={false} style={styles.courseName}>
                    {obj.name}{" "}
                  </Text>
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
                    <Text
                      allowFontScaling={false}
                      style={styles.courseButtonText}
                    >
                      Enroll
                    </Text>
                  </Button>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Text allowFontScaling={false} style={styles.header}>
          Your Courses
        </Text>
        {bought?.length > 0 ? (
          <ScrollView horizontal={true} style={styles.horizontal}>
            {bought?.map((obj) => {
              return (
                <TouchableOpacity
                  style={styles.courseCard}
                  key={obj._id}
                  onPress={() => {
                    if (obj.expired) {
                      navigation.navigate("CourseDetails", {
                        screen: "Course Details",
                        params: { id: obj._id },
                      }); 
                    } else {
                      Toast.show({
                        text1: "Course Expired",
                        type: "error",
                      });
                    }
                  }}
                >
                  <Image style={styles.courseImage} source={images[obj._id]} />
                  <View
                    style={
                      obj.expired
                        ? styles.courseContainerRound
                        : styles.courseContainerRoundExpired
                    }
                  >
                    <Text allowFontScaling={false} style={styles.courseName}>
                      {obj.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.horizontal_2}>
            <Text allowFontScaling={false} style={styles.noCourse}>
              No courses purchased
            </Text>
          </View>
        )}
      </LinearGradient>
    </ScrollView>
  );
};

export default index;
