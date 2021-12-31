import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { Button, HStack, VStack } from "native-base";
import css from "./styles.js";
import banner from "../../assets/images/testimonial.jpeg";
import { ScrollView } from "react-native-gesture-handler";
import { Vimeo } from "react-native-vimeo-iframe";
import { useSelector, useDispatch } from "react-redux";
import { getTestimonials } from "../../action/testimonials.js";
import CustomScroll from "../../Components/CustomScroll";
const styles = StyleSheet.create(css);
import { courseDict } from "../../api/course constants.js";
import { Dimensions } from "react-native";
const deviceWindow = Dimensions.get("window");
import Stars from "react-native-stars";
import starEmpty from "../../assets/images/starEmpty.png";
import starFilled from "../../assets/images/starFilled.png";
import starHalf from "../../assets/images/starHalf.png";
import NetInfo from "@react-native-community/netinfo";

const index = () => {
  NetInfo.fetch().then((state) => {
    !state.isConnected && navigation.navigate("No Internet Auth");
  });
  const testimonials = useSelector((state) => state.testimonials);
  const dispatch = useDispatch();
  useEffect(() => {
    getTestimonials(dispatch);
  }, [dispatch]);
  const [type, setType] = useState("user");
  return (
    <ScrollView style={styles.scroll}>
      <Image source={banner} resizeMode="stretch" style={styles.banner} />

      <HStack
        justifyContent={"center"}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <Button
          style={styles.button}
          onPress={() => {
            setType(type === "user" ? "video" : "user");
          }}
        >
          <Text allowFontScaling={false} style={styles.buttonText}>
            {type === "user" ? "Testimonials" : "Reviews"}
          </Text>
        </Button>
      </HStack>
      {testimonials
        ?.filter((item) => item.type === type)
        .map((data) => {
          return data.type === "video" ? (
            <VStack space={3} style={styles.card} shadow="1" key={data._id}>
              <View style={styles.video}>
                <Vimeo
                  videoId={data.video.substr(data.video.length - 9)}
                  style={{ backgroundColor: "rgba(0,0,0,0)" }}
                  onReady={() => console.log("Video is ready")}
                  onPlay={() => console.log("Video is playing")}
                  onPlayProgress={(data) =>
                    console.log("Video progress data:", data)
                  }
                  onFinish={() => console.log("Video is finished")}
                  loop={false}
                  autoPlay={false}
                  controls={true}
                  speed={false}
                />
                <Text allowFontScaling={false} style={styles.cardText}>
                  {data.video_title}
                </Text>
              </View>
            </VStack>
          ) : (
            <VStack
              style={{
                height: deviceWindow.height * 0.32,
                backgroundColor: "#BEE6F7",
                borderRadius: 12,
                padding: deviceWindow.width * 0.035,
                marginBottom: deviceWindow.width * 0.04,
                marginRight: deviceWindow.width * 0.03,
                marginLeft: deviceWindow.width * 0.03,
              }}
              spacing={5}
              key={data._id}
              space={2}
            >
              <Text
                style={{
                  fontSize: deviceWindow.height * 0.0265,
                  fontFamily: "Barlow_500Medium",
                  color: "rgb(2, 36, 96)",
                }}
              >
                {`${courseDict[data.course_id]} `}
              </Text>
              <CustomScroll
                content={data.review}
                backgroundColor="transparent"
                foregroundColor="#0E78CF"
                textsize="0.021"
                contentColor="white"
                contentBackground={"#4D729D"}
              />
              <HStack space={5}>
                <Text
                  style={{
                    fontSize: deviceWindow.height * 0.023,
                    fontFamily: "Barlow_500Medium",
                    color: "rgb(2, 36, 96)",
                  }}
                >
                  {new Date(data.createdAt).toLocaleDateString("en-GB")}
                </Text>
                <Stars
                  display={data.star}
                  spacing={8}
                  count={5}
                  starSize={deviceWindow.width < 560 ? 20 : 40}
                  fullStar={starFilled}
                  emptyStar={starEmpty}
                  halfStar={starHalf}
                  half={true}
                />
              </HStack>
              <Text
                style={{
                  fontSize: deviceWindow.height * 0.023,
                  fontFamily: "Barlow_600SemiBold",
                  color: "rgb(2, 36, 96)",
                }}
              >
                ~{data.user_name}
              </Text>
            </VStack>
          );
        })}
    </ScrollView>
  );
};

export default index;
