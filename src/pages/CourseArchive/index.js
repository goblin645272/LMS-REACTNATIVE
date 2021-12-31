import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Linking } from "react-native";
import { Accordion, VStack, HStack, Toast } from "native-base";
import moment from "moment";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Vimeo } from "react-native-vimeo-iframe";
import LinearGradient from "react-native-linear-gradient";
import { getEvents } from "../../action/events";
import { useDispatch, useSelector } from "react-redux";
import css from "./styles";
import NetInfo from "@react-native-community/netinfo"
const styles = StyleSheet.create(css);
const deviceWindow = Dimensions.get("window");

const index = ({ route, navigation }) => {
  NetInfo.fetch().then(state => {
    !state.isConnected && navigation.navigate("No Internet Auth")
});
  const [past, setPast] = useState(false);
  const events = useSelector((state) => state.events);
  const params = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      await getEvents(dispatch);
    };
    getData();
  }, [dispatch]);

  return (
    <ScrollView>
      <View>
        <VStack style={{ flex: 1, alignItems: "center" }}>
          <HStack
            style={styles.mode}
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Text
              onPress={() => setPast(false)}
              style={!past ? styles.sliderActive : styles.slider}
            >
              Upcoming
            </Text>

            <Text
              onPress={() => setPast(true)}
              style={past ? styles.sliderActive : styles.slider}
            >
              Past
            </Text>
          </HStack>
        </VStack>
      </View>
      {!past ? (
        <View>
          <VStack
            style={{
              padding: deviceWindow.width * 0.04,
            }}
            space={3}
          >
            {events
              .filter((item) => item.courseId === route.params.id)
              .map((data, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      const diff =
                        new Date(data.from).getTime() -
                        new Date().getTime() -
                        19800000;
                      if (diff < 900000) {
                        Linking.openURL(data.zoomLink);
                      } else {
                        return Toast.show({
                          title:
                            "You can join this session 15 minutes before the session starts .",
                          isClosable: true,
                        });
                      }
                    }}
                  >
                    <LinearGradient
                      colors={["#1963D5", "#77DDEC"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0.5, y: 1.5 }}
                      style={styles.content}
                    >
                      <Text allowFontScaling={false} style={styles.contentTextDate}>
                        {`${moment(data.from.slice(0, 10))
                          .format("dddd")
                          .slice(0, 3)}, ${moment(
                          data.from.slice(0, 10)
                        ).format("Do MMMM")}`}
                      </Text>
                      <Text allowFontScaling={false} style={styles.contentTextCourse}>
                        {`${data.from.slice(11, 16)} - ${data.to.slice(
                          11,
                          16
                        )}`}
                      </Text>
                      <Text allowFontScaling={false} style={styles.contentTextCourse}>{data.title}</Text>
                      <Text allowFontScaling={false} style={styles.contentTextLink}>
                        Click here to join
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
          </VStack>
        </View>
      ) : (
        <View
          style={{
            padding: deviceWindow.width * 0.04,
            minWidth: deviceWindow.width * 0.8,
            minHeight: deviceWindow.height * 0.25,
          }}
        >
          <VStack
            style={{
              padding: deviceWindow.width * 0.04,
              flex: 1,
              alignItems: "center",
            }}
            space={3}
          >
            {params?.archives?.map((data, index2) => {
              return (
                <Accordion key={index2}>
                  <Accordion.Item>
                    <Accordion.Summary>
                      <Text
                        style={{
                          width: deviceWindow.width * 0.7,
                          color: "#000260",
                          fontFamily: "Barlow_600SemiBold",
                        }}
                      >
                        {data.title}
                      </Text>
                      <Accordion.Icon
                        style={{
                          width: deviceWindow.width * 0.2,
                          color: "#000260",
                          fontFamily: "Barlow_400Regular",
                        }}
                      />
                    </Accordion.Summary>
                    <Accordion.Details style={{ padding: 0 }}>
                      <VStack
                        style={{
                          maxHeight: deviceWindow.height * 0.28,
                          flex: 1,
                          alignItems: "center",
                          padding: 0,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: deviceWindow.height * 0.02,
                            marginBottom: deviceWindow.height * 0.03,
                            color: "#000260",
                            fontFamily: "Barlow_500Medium",
                          }}
                        >
                          {data.desc}
                        </Text>
                        <Vimeo
                          videoId={data.link.slice(-9)} //Change ID here
                          loop={false}
                          autoPlay={false}
                          controls={true}
                          speed={false}
                          time={"0m0s"}
                          style={{
                            minWidth: deviceWindow.width * 0.9,
                            minHeight: deviceWindow.height * 0.2,
                          }}
                        />
                      </VStack>
                    </Accordion.Details>
                  </Accordion.Item>
                </Accordion>
              );
            })}
          </VStack>
        </View>
      )}
    </ScrollView>
  );
};

export default index;
