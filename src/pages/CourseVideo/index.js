import React, { useState, useEffect, useMemo } from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import { VStack, Accordion, HStack, Toast, Button } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlayCircle, faBook } from "@fortawesome/free-solid-svg-icons";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { VdoPlayerView, startVideoScreen } from "vdocipher-rn-bridge";
const deviceWindow = Dimensions.get("window");
import { getVideoDetails, changeWatchStatus } from "../../action/courses";
import NetInfo from "@react-native-community/netinfo"

const index = ({ route, navigation }) => {
  NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    !state.isConnected && navigation.navigate("No Internet Auth")
});
  const isFocused = useIsFocused();
  const [id, setId] = useState();
  const [watched, setWatched] = useState();
  const [video, setVideo] = useState({ valid: false, otp: "", playback: "" });
  const login = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [sections, setSection] = useState();
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (isFocused) {
      const getData = () => {
        const data = route.params.course;
        if (data?.modules.length !== 0) {
          let index1;
          let index2;
          let bool = false;
          data.modules.map((item, inx1) => {
            item.list.map((item2, inx2) => {
              if (!bool && item2.id === data.last_watched) {
                index1 = inx1;
                index2 = inx2;
                bool = true;
              }
              return item2;
            });
            return item;
          });
          if (bool) {
            setSection(data?.modules);
            setId(data?.modules[index1].list[index2].id);
            setLoading(false);
          } else {
            setSection(data?.modules);
            setId(data?.modules[0].list[0].id);
            Toast.show({
              title: "Your last watched video was deleted ! ",
              isClosable: true,
            });
            dispatch(
              changeWatchStatus(route.params.id, data?.modules[0].list[0].id)
            );
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      };
      getData();
    }
  }, [dispatch, route.params.id, setId, setSection, isFocused]);

  const videos = useMemo(() => {
    let tempVideo = [];
    sections?.map((obj) => {
      obj.list.map((obj2) => {
        if (obj2.type === "video") {
          tempVideo.push(obj2);
        }
        return obj2;
      });
      return obj;
    });
    return tempVideo;
  }, [sections]);

  const [last, setLast] = useState({});

  useEffect(() => {
    let tempModule;
    let tempVideo;
    let len = sections?.length;
    sections?.map((obj, index1) => {
      obj.list.map((obj2, index2) => {
        if (obj2.type === "video") {
          tempModule = index1;
          tempVideo = index2;
          if (obj2.id === id) {
            setWatched({ ...obj2, module: index1, video: index2 });
          }
        }
        return obj2;
      });
      len = len - 1;
      return obj;
    });
    if (last.module === undefined && len === 0) {
      setLast(() => {
        return { module: tempModule, video: tempVideo };
      });
    }
    setVideo({ valid: false, otp: "", playback: "" });
    setLoader(true);
  }, [setWatched, sections, id, setVideo, setLast, last, setLoader]);

  useEffect(() => {
    if (!loading && loader) {
      const getData = async () => {
        try {
          const data = await dispatch(getVideoDetails(watched.link));
          if (data.valid === true) {
            setVideo((prev) => {
              return {
                ...prev,
                valid: true,
                otp: data.otp,
                playback: data.playbackInfo,
              };
            });
            const handleWatch = () => {
              if (!watched.watched) {
                setWatched((prev) => {
                  return {
                    ...prev,
                    watched: true,
                  };
                });
                dispatch(changeWatchStatus(route.params.id, watched.id));
                let ind;
                let ind2;
                sections.map((obj, index) => {
                  obj.list.map((obj2, index2) => {
                    if (obj2.type === "video" && obj2.id === id) {
                      ind = index;
                      ind2 = index2;
                    }
                    return obj2;
                  });
                  return obj;
                });

                let newSec = sections;
                let newList = sections[ind].list;
                newList[ind2].watched = true;
                setSection(newSec);
              } else {
                dispatch(changeWatchStatus(route.params.id, watched.id));
              }
            };
            handleWatch();
          } else {
            setVideo((prev) => {
              return {
                ...prev,
                valid: false,
                otp: "",
                playback: "",
              };
            });
          }
          setLoader(false);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    }
  }, [
    watched,
    setVideo,
    loading,
    setLoader,
    dispatch,
    id,
    route.params.id,
    sections,
    loader,
  ]);

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <VStack style={{ backgroundColor: "#BEE6F7" }}>
        <View>
          {loader ? (
            <View
              style={{
                height: deviceWindow.height * 0.32,
                width: deviceWindow.width,
              }}
            >
              <Text>loading</Text>
            </View>
          ) : video.valid ? (
            <View style={{ alignItems: "center" }}>
              <VdoPlayerView
                style={{
                  height: deviceWindow.height * 0.32,
                  width: deviceWindow.width,
                }}
                embedInfo={{ otp: video.otp, playbackInfo: video.playback }}
              />
              <Button
                style={{ width: 200, marginTop: 4 }}
                onPress={() =>
                  startVideoScreen({
                    embedInfo: { otp: video.otp, playbackInfo: video.playback },
                  })
                }
              >
                Start Full Screen
              </Button>
            </View>
          ) : (
            // {otp: video.otp, playbackInfo: video.playback}
            <Text>Video not found</Text>
          )}
        </View>

        <Text
          style={{
            textAlign: "center",
            color: "#000260",
            fontFamily: "Barlow_500Medium",
            fontSize: deviceWindow.height * 0.02,
          }}
        >
          {watched?.title}
        </Text>
      </VStack>
      <ScrollView
        style={{
          marginTop: deviceWindow.width * 0.04,
          marginRight: deviceWindow.width * 0.04,
          marginLeft: deviceWindow.width * 0.04,
        }}
      >
        {!loading && (
          <Accordion
            allowMultiple
            style={{
              backgroundColor: "#7FE0F3",
            }}
          >
            {sections?.map((row, key1) => {
              return (
                <Accordion.Item key={key1 * 0.3}>
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
                        {row.name}
                      </Text>

                      <Accordion.Icon
                        style={{ width: deviceWindow.width * 0.1 }}
                      />
                    </HStack>
                  </Accordion.Summary>
                  <Accordion.Details>
                    {row?.list.map((obj, key2) => {
                      return (
                        <VStack padding={1} key={key2 * 0.15}>
                          {obj.type === "video" ? (
                            <TouchableOpacity
                              onPress={() => {
                                if (!loader) {
                                  setId(obj.id);
                                } else {
                                  Toast.show({
                                    title: "Please wait till video loads ! ",
                                    isClosable: true,
                                  });
                                }
                              }}
                            >
                              <HStack space={3} alignItems="center">
                                <FontAwesomeIcon
                                  icon={faPlayCircle}
                                  style={{
                                    width: deviceWindow.width * 0.1,
                                    color: obj.watched ? "green" : "#000260",
                                  }}
                                  size={deviceWindow.width < 560 ? 20 : 28}
                                />
                                <Text
                                  style={{
                                    width: deviceWindow.width * 0.7,
                                    color: obj.watched ? "green" : "#000260",
                                    fontFamily: "Barlow_500Medium",
                                    fontSize: deviceWindow.height * 0.02,
                                  }}
                                >
                                  {obj.title}
                                </Text>
                              </HStack>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("Quiz", {
                                  id: obj.id,
                                  course: route.params.course,
                                })
                              }
                            >
                              <HStack space={3} alignItems="center" key={key2}>
                                <FontAwesomeIcon
                                  icon={faBook}
                                  style={{
                                    width: deviceWindow.width * 0.2,
                                  }}
                                  size={deviceWindow.width < 560 ? 20 : 28}
                                />
                                <Text
                                  style={{
                                    width: deviceWindow.width * 0.5,
                                    fontFamily: "Barlow_500Medium",
                                    fontSize: deviceWindow.height * 0.02,
                                    color: "#000260",
                                  }}
                                >
                                  {obj.title}
                                </Text>
                              </HStack>
                            </TouchableOpacity>
                          )}
                        </VStack>
                      );
                    })}
                  </Accordion.Details>
                </Accordion.Item>
              );
            })}
          </Accordion>
        )}
      </ScrollView>
      <View></View>
    </ScrollView>
  );
};

export default index;
