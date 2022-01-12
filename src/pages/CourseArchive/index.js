import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Linking } from "react-native";
import { VStack, HStack } from "native-base";
import moment from "moment";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Vimeo } from "react-native-vimeo-iframe";
import LinearGradient from "react-native-linear-gradient";
import { getEvents } from "../../action/events";
import { useDispatch, useSelector } from "react-redux";
import css from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import Toast from "react-native-toast-message";
const styles = StyleSheet.create(css);
const deviceWindow = Dimensions.get("window");

const index = ({ route, navigation }) => {
  const [past, setPast] = useState(false);
  const events = useSelector((state) => state.events);
  const params = route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [current, setCurrent] = useState(params.archives[0]);
  useEffect(() => {
    if (isFocused) {
      const getData = async () => {
        await dispatch(getEvents(navigation));
      };
      getData();
    } else {
      setPast(false);
    }
  }, [navigation]);
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
      {past ? (
        <View
          style={{
            padding: deviceWindow.width * 0.04,
            minWidth: deviceWindow.width * 0.8,
            minHeight: deviceWindow.height * 0.25,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {params?.archives.length > 0 ? (
            <VStack
              style={{
                padding: deviceWindow.width * 0.04,
                flex: 1,
                alignItems: "center",
              }}
              space={3}
            >
              {/* {params.archives.map((data, index2) => {
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
                })} */}

              <Vimeo
                videoId={current.link.slice(-9)}
                loop={false}
                autoPlay={false}
                controls={true}
                speed={false}
                time={"0m0s"}
                style={{
                  minWidth: deviceWindow.width * 0.9,
                  minHeight: deviceWindow.height * 0.2,
                  marginBottom: deviceWindow.height * 0.01,
                }}
              />
              <View
                style={{
                  width: deviceWindow.width * 0.9,
                  flex: 1,
                  justifyContent: "flex-start",
                  marginLeft: 10,
                }}
              >
                <View>
                  <Text
                    style={styles.content}
                  >{`Description - ${current.desc}`}</Text>
                </View>
                <VStack space={3}>
                  {params.archives.map((data, index2) => {
                    return (
                      <VStack key={index2}>
                        <TouchableOpacity
                          onPress={() => {
                            setCurrent(data);
                          }}
                        >
                          <HStack space={3} alignItems="center">
                            <FontAwesomeIcon
                              icon={faPlayCircle}
                              style={{
                                width: deviceWindow.width * 0.2,
                                color:
                                  data.link === current.link
                                    ? "green"
                                    : "rgb(2, 36, 96)",
                              }}
                              size={deviceWindow.width < 560 ? 20 : 28}
                            />
                            <Text
                              style={{
                                width: deviceWindow.width * 0.8,
                                color:
                                  data.link === current.link
                                    ? "green"
                                    : "rgb(2, 36, 96)",
                                fontFamily: "Barlow_500Medium",
                                fontSize: deviceWindow.height * 0.02,
                              }}
                            >
                              {data.title}
                            </Text>
                          </HStack>
                        </TouchableOpacity>
                      </VStack>
                    );
                  })}
                </VStack>
              </View>
            </VStack>
          ) : (
            <Text allowFontScaling={false} style={styles.noArchive}>
              No archives.
            </Text>
          )}
        </View>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {events.filter((item) => item.courseId === route.params.id).length >
          0 ? (
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
                          if (data.zoomLink) {
                            Linking.openURL(data.zoomLink);
                          } else {
                            Toast.show({
                              type: "info",
                              text1: "Please Wait for link/Contact Support",
                            });
                          }
                        } else {
                          return Toast.show({
                            type: "info",
                            text1:
                              "You can join this session 15 minutes before the session starts .",
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
                        <Text
                          allowFontScaling={false}
                          style={styles.contentTextDate}
                        >
                          {`${moment(data.from.slice(0, 10))
                            .format("dddd")
                            .slice(0, 3)}, ${moment(
                            data.from.slice(0, 10)
                          ).format("Do MMMM")}`}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={styles.contentTextCourse}
                        >
                          {`${data.from.slice(11, 16)} - ${data.to.slice(
                            11,
                            16
                          )}`}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={styles.contentTextCourse}
                        >
                          {data.title}
                        </Text>
                        <Text
                          allowFontScaling={false}
                          style={styles.contentTextLink}
                        >
                          Click here to join
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
            </VStack>
          ) : (
            <Text allowFontScaling={false} style={styles.noArchive}>
              No upcoming sessions available yet.
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default index;
