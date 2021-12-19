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
import { Dimensions } from "react-native";
const deviceWindow = Dimensions.get("window");

const index = () => {
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
          <Text style={styles.buttonText}>
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
                <Text style={styles.cardText}>{data.video_title}</Text>
              </View>
            </VStack>
          ) : (
            <VStack
              style={{
                height: deviceWindow.height * 0.2,
                backgroundColor: "#BEE6F7",
                borderRadius: 12,
                padding: deviceWindow.width * 0.035,
                marginBottom: deviceWindow.width * 0.04,
                marginRight: deviceWindow.width * 0.03,
                marginLeft: deviceWindow.width * 0.03,
              }}
              spacing={4}
              key={data._id}
            >
              <CustomScroll
                content={data.review}
                backgroundColor="transparent"
                foregroundColor="#0E78CF"
                textsize="0.021"
                contentColor="rgb(2, 36, 96)"
              />
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
