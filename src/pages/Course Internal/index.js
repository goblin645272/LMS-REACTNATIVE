import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  VStack,
  Accordion,
  HStack,
  Divider,
  Button,
} from "native-base";
const deviceWindow = Dimensions.get("window");
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from "react-native-gesture-handler";
import { useScrollToTop } from "@react-navigation/native";
import css from "./styles";
import Stars from "react-native-stars";
import starEmpty from "../../assets/images/starEmpty.png";
import starFilled from "../../assets/images/starFilled.png";
import Unorderedlist from "react-native-unordered-list";
import { useDispatch, useSelector } from "react-redux";
import starHalf from "../../assets/images/starHalf.png";
import AvatarImage from "../../assets/images/MK-Portrait.jpg";
import { Chip } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlayCircle, faBook } from "@fortawesome/free-solid-svg-icons";
const styles = StyleSheet.create(css);
import CustomScroll from "../../Components/CustomScroll";
import { getCourseById } from "../../action/courses";

function ConvertMinutes(num) {
  let d = Math.floor(num / 1440);
  let h = Math.floor((num - d * 1440) / 60);
  let m = Math.round(num % 60);

  if (d > 0) {
    return d + " days, " + h + " hours, " + m + " minutes";
  } else {
    return h + " hours, " + m + " minutes";
  }
}

const index = ({ route }) => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loader);
  useEffect(() => {
    const getData = async () => {
      const res = await dispatch(getCourseById(route.params.id));
      setData(res);
    };
    getData();
  }, [setData, dispatch, route]);

  const cardColor =
    data?.price?.length === 3
      ? [
          ["#e8ac85", "#f9f5d3", "#e8ac85"],
          ["#b0b0b0", "#d8d8d8", "#b0b0b0"],
          ["#bf9640", "#f7efb1", "#bf9640"],
        ]
      : [
          ["#bf9640", "#f7efb1", "#bf9640"],
          ["#b0b0b0", "#d8d8d8", "#b0b0b0"],
        ];

  if (data?._id !== route.params.id) {
    return <View></View>;
  } else {
    return (
      <ScrollView style={styles.screen} stickyHeaderIndices={[1]}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 2 }}
          style={styles.banner}
          colors={["#081c80", "#01d1fb"]}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
            }}
          >
            <Text style={styles.header}>{data?.name}</Text>
            <View
              style={
                deviceWindow.width < 560
                  ? {
                      flex: 1,
                      flexDirection: "row",
                      maxHeight: 22,
                    }
                  : {
                      flex: 1,
                      flexDirection: "row",
                      maxHeight: 33,
                    }
              }
            >
              <Stars
                display={data?.stars}
                spacing={8}
                count={5}
                starSize={deviceWindow.width < 560 ? 20 : 40}
                fullStar={starFilled}
                emptyStar={starEmpty}
                halfStar={starHalf}
                half={true}
              />
            </View>
            {/* <Text style={styles.reviewText}>{`${data?.stars} stars`}</Text> */}

            <Text style={styles.reviewText}>{`${data?.rating} reviews`}</Text>
            <Avatar
              size={deviceWindow.width < 560 ? "md" : "92"}
              source={AvatarImage}
            >
              MK
            </Avatar>
            <Text
              style={styles.reviewText}
            >{`Instructor Name: ${data?.instructor?.name}`}</Text>
          </View>
        </LinearGradient>
        <ScrollView horizontal={true} style={styles.tabContainer}>
          <TouchableOpacity>
            <Text style={styles.tabs}> BUY NOW </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.tabs}>ABOUT</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.tabs}> INSTUCTOR </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.tabs}> SYLLABUS</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.tabs}> TESTIMONIALS </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.tabs}> FAQ</Text>
          </TouchableOpacity>
        </ScrollView>

        <VStack
          style={{
            marginTop: deviceWindow.height * 0.004,
            marginRight: deviceWindow.width * 0.03,
            marginLeft: deviceWindow.width * 0.03,
          }}
        >
          <VStack space={3}>
            <Text style={styles.pricing}>Pricing</Text>
            {data?.price?.map((item, index4) => {
              return (
                <LinearGradient
                  key={index4 * 0.25}
                  location={[0.2, 0.8]}
                  colors={cardColor[index4]}
                  style={styles.background}
                >
                  <VStack alignItems="center">
                    <Text style={styles.priceCardsHeader}>{item.tier}</Text>
                    <Text
                      style={styles.priceCardsPriceCancelled}
                    >{`₹ ${item.listAmount}`}</Text>
                    <Text
                      style={styles.priceCardsPrice}
                    >{`₹ ${item.amount}`}</Text>
                    <VStack
                      style={{
                        width: deviceWindow.width * 0.8,
                        marginBottom: 10,
                      }}
                    >
                      {item.qualities.map((quality, index6) => {
                        return (
                          <Unorderedlist key={index6 * 0.08}>
                            <Text style={styles.priceQualities}>{quality}</Text>
                          </Unorderedlist>
                        );
                      })}
                    </VStack>
                    <Button style={styles.cardButton}>
                      <Text style={styles.cardButtonText}>Enroll</Text>
                    </Button>
                  </VStack>
                </LinearGradient>
              );
            })}
          </VStack>
          <View>
            <Text style={styles.aboutHeader}>About This Program</Text>
            <Text style={styles.aboutContent}>{data?.About}</Text>
          </View>
          <View style={styles.skills}>
            <Text style={styles.skillsHeader}>Skills You'll Gain</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {data?.skills?.map((item, ind) => {
                return (
                  <View
                    style={{
                      alignSelf: "flex-start",
                      marginRight: 2,
                      marginLeft: 2,
                      padding: 4,
                      marginBottom: 2,
                    }}
                    key={ind * 0.064}
                  >
                    <Chip title={item} />
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.features}>
            {data?.features?.map((item, index2) => {
              return (
                <View style={styles.featureContainer} key={index2 * 0.782}>
                  <Text style={styles.featureHeader}>{item.feature_title}</Text>
                  <Text style={styles.featureContent}>{item.feature_desc}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.instructor}>
            <Avatar size={32} source={AvatarImage}>
              MK
            </Avatar>
            <Text
              style={{
                color: "rgb(2, 36, 96)",
                fontFamily: "Barlow_500Medium",
                fontSize: deviceWindow.height * 0.028,
                marginTop: deviceWindow.height * 0.018,
              }}
            >
              {data?.instructor?.name}
            </Text>
            <Text
              style={{
                color: "rgb(2, 36, 96)",
                fontFamily: "Barlow_500Medium",
                fontSize: deviceWindow.height * 0.025,
                marginTop: deviceWindow.height * 0.018,
              }}
            >
              {data?.instructor?.title}
            </Text>
            <Text
              style={{
                color: "rgb(2, 36, 96)",
                fontFamily: "Barlow_500Medium",
                fontSize: deviceWindow.height * 0.018,
                marginTop: deviceWindow.height * 0.018,
              }}
            >
              {data?.instructor?.profession}
            </Text>
          </View>
          {data?.modules?.length > 0 && (
            <View style={{ marginTop: deviceWindow.width * 0.03 }}>
              <View
                style={{
                  alignItems: "center",
                  marginBottom: deviceWindow.height * 0.005,
                }}
              >
                <Text
                  style={{
                    color: "rgb(2, 36, 96)",
                    fontFamily: "Barlow_600SemiBold",
                    fontSize: deviceWindow.width * 0.06,
                  }}
                >
                  Course Syllabus
                </Text>
              </View>
              <Accordion
                allowMultiple
                style={{
                  backgroundColor: "#7FE0F3",
                }}
              >
                {data?.modules?.map((row, key1) => {
                  const videos = row?.list.filter(
                    (item) => item.type === "video"
                  );
                  let time = 0;
                  if (videos.length > 1) {
                    videos.map((item) => {
                      time = time + parseInt(item.time);
                      return item;
                    });
                  } else if (videos.length === 0) {
                    time = 0;
                  } else {
                    time = parseInt(videos[0].time);
                  }
                  return (
                    <Accordion.Item key={key1*23}>
                      <Accordion.Summary>
                        <HStack space={3} alignItems="center">
                          <Text
                            style={{
                              width: deviceWindow.width * 0.5,
                              color: "rgb(2, 36, 96)",
                              fontFamily: "Barlow_500Medium",
                              fontSize: deviceWindow.height * 0.02,
                            }}
                          >
                            {row.name}
                          </Text>
                          <Text
                            style={{
                              width: deviceWindow.width * 0.2,
                              color: "rgb(2, 36, 96)",
                              fontFamily: "Barlow_500Medium",
                              fontSize: deviceWindow.height * 0.02,
                            }}
                          >
                            {ConvertMinutes(time)}
                          </Text>
                          <Accordion.Icon
                            style={{ width: deviceWindow.width * 0.1 }}
                          />
                        </HStack>
                      </Accordion.Summary>
                      <Accordion.Details>
                        {row?.list.map((obj, key2) => {
                          return (
                            <VStack padding={1} key={key2 * 0.364}>
                              {obj.type === "video" ? (
                                <HStack space={3} alignItems="center">
                                  <FontAwesomeIcon
                                    icon={faPlayCircle}
                                    style={{
                                      width: deviceWindow.width * 0.2,
                                      color: "rgb(2, 36, 96)",
                                    }}
                                    size={deviceWindow.width < 560 ? 20 : 28}
                                  />
                                  <Text
                                    style={{
                                      width: deviceWindow.width * 0.5,
                                      color: "rgb(2, 36, 96)",
                                      fontFamily: "Barlow_500Medium",
                                      fontSize: deviceWindow.height * 0.02,
                                    }}
                                  >
                                    {obj.title}
                                  </Text>
                                  <Text
                                    style={{
                                      width: deviceWindow.width * 0.2,
                                      color: "rgb(2, 36, 96)",
                                      fontFamily: "Barlow_500Medium",
                                      fontSize: deviceWindow.height * 0.02,
                                    }}
                                  >
                                    {ConvertMinutes(obj.time)}
                                  </Text>
                                </HStack>
                              ) : (
                                <HStack
                                  space={3}
                                  alignItems="center"
                                  key={key2}
                                >
                                  <FontAwesomeIcon
                                    icon={faBook}
                                    style={{
                                      width: deviceWindow.width * 0.2,
                                      color: "rgb(2, 36, 96)",
                                    }}
                                    size={deviceWindow.width < 560 ? 20 : 28}
                                  />
                                  <Text
                                    style={{
                                      width: deviceWindow.width * 0.5,
                                      color: "rgb(2, 36, 96)",
                                      fontFamily: "Barlow_500Medium",
                                      fontSize: deviceWindow.height * 0.02,
                                    }}
                                  >
                                    {obj.title}
                                  </Text>
                                </HStack>
                              )}
                            </VStack>
                          );
                        })}
                      </Accordion.Details>
                    </Accordion.Item>
                  );
                })}
              </Accordion>
            </View>
          )}

          <View
            style={{
              marginTop: deviceWindow.width * 0.03,
            }}
          >
            <View
              style={{
                alignItems: "center",
                marginBottom: deviceWindow.height * 0.005,
              }}
            >
              <Text
                style={{
                  color: "rgb(2, 36, 96)",
                  fontFamily: "Barlow_600SemiBold",
                  fontSize: deviceWindow.width * 0.06,
                }}
              >
                Testimonials
              </Text>
            </View>
            {data?.testimonial?.map((obj, index) => {
              return (
                <VStack
                  style={{
                    height: deviceWindow.height * 0.2,
                    backgroundColor: "#BEE6F7",
                    borderRadius: 12,
                    padding: deviceWindow.width * 0.035,
                    marginBottom: deviceWindow.width * 0.02,
                  }}
                  spacing={4}
                  key={index * 0.457}
                >
                  <CustomScroll
                    content={obj.review}
                    backgroundColor="transparent"
                    foregroundColor="#0E78CF"
                    textsize="0.021"
                    contentColor="rgb(2, 36, 96)"
                    contentBackground="transparent"
                  />
                  <Text
                    style={{
                      fontSize: deviceWindow.height * 0.023,
                      fontFamily: "Barlow_600SemiBold",
                      color: "rgb(2, 36, 96)",
                    }}
                  >
                    ~{obj.user_name}
                  </Text>
                </VStack>
              );
            })}
          </View>
          <View>
            <Divider my="1" style={{ backgroundColor: "rgba(2, 36, 96, 1)" }} />
          </View>

          <VStack space={2} style={{ marginTop: deviceWindow.height * 0.015 }}>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "rgb(2, 36, 96)",
                  fontFamily: "Barlow_600SemiBold",
                  fontSize: deviceWindow.width * 0.06,
                }}
              >
                FAQs
              </Text>
            </View>
            {data?.faq?.map((qna, index5) => {
              return (
                <Accordion key={index5 * 0.36782}>
                  <Accordion.Item>
                    <Accordion.Summary>
                      <Text
                        style={{
                          width: deviceWindow.width * 0.7,
                          color: "#000260",
                          fontFamily: "Barlow_500Medium",
                        }}
                      >
                        {qna.question}
                      </Text>
                      <Accordion.Icon
                        style={{
                          width: deviceWindow.width * 0.2,
                          color: "#000260",
                          fontFamily: "Barlow_400Regular",
                        }}
                      />
                    </Accordion.Summary>
                    <Accordion.Details>{qna.answer}</Accordion.Details>
                  </Accordion.Item>
                </Accordion>
              );
            })}
          </VStack>
        </VStack>
        <View></View>
      </ScrollView>
    );
  }
};

export default index;