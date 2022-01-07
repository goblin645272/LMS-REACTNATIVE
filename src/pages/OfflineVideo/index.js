import React, { useState, useEffect, useMemo } from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import { VStack, Accordion, HStack, Toast, Button } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useSelector } from "react-redux";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import {
  VdoPlayerView,
  startVideoScreen,
  VdoDownload,
} from "vdocipher-rn-bridge";
const deviceWindow = Dimensions.get("window");

const index = ({ route, navigation }) => {
  const profile = useSelector((state) => state.auth.profile);
  console.log(profile);
  const state = useSelector((state) => state.video);
  const filtered = useMemo(() => {
    return state.downloadStatusArray.filter((item) => item.status !== "failed");
  }, [state]);
  const [current, setCurrent] = useState({});
  const isFocused = useIsFocused();
  console.log(profile);
  useEffect(() => {
    if (!isFocused) {
      setCurrent({});
    } else {
      if (route.params) {
        route.params.toast();
      }
    }
  }, [isFocused, route]);
  const removeDownload = (mediaId) => {
    setCurrent({});
    VdoDownload.remove([mediaId]).catch((error) =>
      Toast.show({
        title: "Failed to Delete Video",
        isClosable: true,
      })
    );
  };

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <View
        style={{
          backgroundColor: "#BEE6F7",
          marginBottom: deviceWindow.height * 0.04,
        }}
      >
        {current.mediaInfo !== undefined ? (
          <VStack>
            <VdoPlayerView
              style={{
                height: deviceWindow.height * 0.32,
                width: deviceWindow.width,
              }}
              embedInfo={{
                offline: true,
                mediaId: current.mediaInfo.mediaId,
              }}
            />
            <HStack
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: deviceWindow.height * 0.01,
              }}
              space={2}
            >
              <Button
                style={{ width: deviceWindow.width * 0.4, marginTop: 4 }}
                onPress={() =>
                  startVideoScreen({
                    embedInfo: {
                      offline: true,
                      mediaId: current.mediaInfo.mediaId,
                    },
                  })
                }
              >
                Start Full Screen
              </Button>
              <Button
                style={{ width: deviceWindow.width * 0.4, marginTop: 4 }}
                onPress={() => removeDownload(current.mediaInfo.mediaId)}
              >
                Remove Video
              </Button>
            </HStack>
          </VStack>
        ) : (
          <View
            style={{
              height: deviceWindow.height * 0.32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                width: deviceWindow.width * 0.7,
                color: "rgb(2, 36, 96)",
                fontFamily: "Barlow_500Medium",
                fontSize: deviceWindow.height * 0.02,
                textAlign: "center",
              }}
            >
              Please Select Video
            </Text>
          </View>
        )}
      </View>
      {/* {!connected && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              width: deviceWindow.width * 0.7,
              color: "rgb(2, 36, 96)",
              fontFamily: "Barlow_600SemiBold",
              fontSize: deviceWindow.height * 0.025,
              textAlign: "center",
            }}
          >
            You dont have any internet.
          </Text>
        </View>
      )} */}
      {profile.courses.find(
        (item) => item.course_id === "612ccd3c9f192c86faa26f48"
      ) ? (
        <View
          style={{
            marginLeft: deviceWindow.width * 0.02,
            marginRight: deviceWindow.width * 0.02,
          }}
        >
          {filtered.length !== 0 ? (
            <Accordion
              allowMultiple
              style={{
                backgroundColor: "#7FE0F3",
              }}
            >
              <Accordion.Item>
                <Accordion.Summary>
                  <HStack space={3} alignItems="center">
                    <Text
                      style={{
                        width: deviceWindow.width * 0.7,
                        color: "rgb(2, 36, 96)",
                        fontFamily: "Barlow_500Medium",
                        fontSize: deviceWindow.height * 0.02,
                      }}
                    >
                      Master Stock Trading
                    </Text>

                    <Accordion.Icon
                      style={{ width: deviceWindow.width * 0.1 }}
                    />
                  </HStack>
                </Accordion.Summary>
                {filtered.map((item, index) => {
                  return (
                    <Accordion.Details>
                      <VStack padding={1}>
                        <TouchableOpacity
                          onPress={() => {
                            setCurrent(item);
                          }}
                        >
                          <HStack space={3} alignItems="center">
                            <FontAwesomeIcon
                              icon={faPlayCircle}
                              style={{
                                width: deviceWindow.width * 0.1,
                                color: "green",
                              }}
                              size={deviceWindow.width < 560 ? 20 : 28}
                            />
                            <Text
                              style={{
                                width: deviceWindow.width * 0.7,
                                fontFamily: "Barlow_500Medium",
                                color: "green",
                                fontSize: deviceWindow.height * 0.02,
                              }}
                            >
                              {item.mediaInfo.title}
                            </Text>
                          </HStack>
                        </TouchableOpacity>
                      </VStack>
                    </Accordion.Details>
                  );
                })}
              </Accordion.Item>
            </Accordion>
          ) : (
            <View
              style={{
                height: deviceWindow.height * 0.32,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  width: deviceWindow.width * 0.7,
                  color: "rgb(2, 36, 96)",
                  fontFamily: "Barlow_600SemiBold",
                  fontSize: deviceWindow.height * 0.025,
                  textAlign: "center",
                  marginBottom: deviceWindow.height * 0.04,
                }}
              >
                You don't have downloaded videos.
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            height: deviceWindow.height * 0.32,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              width: deviceWindow.width * 0.7,
              color: "rgb(2, 36, 96)",
              fontFamily: "Barlow_600SemiBold",
              fontSize: deviceWindow.height * 0.025,
              textAlign: "center",
              marginBottom: deviceWindow.height * 0.04,
            }}
          >
            You don't have any video course.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default index;
