import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Linking,
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
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import css from "./styles";
import Stars from "react-native-stars";
import starEmpty from "../../assets/images/starEmpty.png";
import starFilled from "../../assets/images/starFilled.png";
import starHalf from "../../assets/images/starHalf.png";
import { useSelector } from "react-redux";
import Unorderedlist from "react-native-unordered-list";
import NetInfo from "@react-native-community/netinfo";
import AvatarImage from "../../assets/images/MK-Portrait.jpg";
import { Chip } from "react-native-elements";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlayCircle, faBook } from "@fortawesome/free-solid-svg-icons";
const styles = StyleSheet.create(css);
import CustomScroll from "../../Components/CustomScroll";
import HTMLView from "react-native-htmlview";

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

const index = ({ route, navigation }) => {
  NetInfo.fetch().then((state) => {
    !state.isConnected && navigation.navigate("No Internet Auth");
  });
  const data = route.params.course;
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

  const [ref, setRef] = useState(null);

  const [dataSourceCords, setDataSourceCords] = useState([]);
  const handleRef = (ref_name) => {
    if(ref_name === "about"){
      ref.scrollTo({
        x: 0,
        y: dataSourceCords[1]
      })
    } else if(ref_name === "instructor"){
      ref.scrollTo({
        x: 0,
        y: dataSourceCords[2]
      })
    } else if(ref_name === "testimonial"){
      ref.scrollTo({
        x: 0,
        y: dataSourceCords[4]
      })
    } else if(ref_name === "enroll"){
      ref.scrollTo({
        x: 0,
        y: dataSourceCords[0]
      })
    } else if(ref_name === "syllabus"){
      ref.scrollTo({
        x: 0,
        y: dataSourceCords[3]
      })
    } else if(ref_name === "faq"){
      ref.scrollTo({
        x: 0,
        y: dataSourceCords[5]
      })
    }else{
      console.log('not found')
    }
  }
  
  // const scrollHandler = () => {
  //     ref.scrollTo({
  //       x: 0,
  //       y: ,
  //       animated: true,
  //     });
    
  // };

  return (
    <ScrollView style={styles.screen} ref={(ref)=>{setRef(ref)}} stickyHeaderIndices={[1]}>
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
          <Text allowFontScaling={false} style={styles.header}>
            {data?.name}
          </Text>
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
          {/* <Text allowFontScaling={false} style={styles.reviewText}>{`${data?.stars} stars`}</Text> */}

          <Text
            allowFontScaling={false}
            style={styles.reviewText}
          >{`${data?.rating} reviews`}</Text>
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
        <TouchableOpacity onPress={()=>{handleRef("enroll")}}>
          <Text allowFontScaling={false} style={styles.tabs} 
          >
            BUY NOW{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{handleRef("about")}}>
          <Text allowFontScaling={false} style={styles.tabs}
          >
            ABOUT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{handleRef("instructor")}}>
          <Text allowFontScaling={false} style={styles.tabs}
          >
            INSTUCTOR{" "}
          </Text>
        </TouchableOpacity>
        {data?.modules?.length > 0 && (<TouchableOpacity onPress={()=>{handleRef("syllabus")}}>
          <Text allowFontScaling={false} style={styles.tabs}
          >
            SYLLABUS
          </Text>
        </TouchableOpacity>)}
        <TouchableOpacity onPress={()=>{handleRef("testimonial")}}>
          <Text allowFontScaling={false} style={styles.tabs}
          >
            TESTIMONIALS{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{handleRef("faq")}}>
          <Text allowFontScaling={false} style={styles.tabs}
          >
            FAQ
          </Text>
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
          <Text allowFontScaling={false} style={styles.pricing}
          onLayout={(event)=> {
            const layout = event.nativeEvent.layout;
            dataSourceCords[0] = layout.y;
            setDataSourceCords(dataSourceCords);
          }}>
            Pricing
          </Text>
          {data?.price?.map((item, index4) => {
            return (
              <LinearGradient
                key={index4 * 0.25}
                location={[0.2, 0.8]}
                colors={cardColor[index4]}
                style={styles.background}
              >
                <VStack alignItems="center">
                  <Text
                    allowFontScaling={false}
                    style={styles.priceCardsHeader}
                  >
                    {item.tier}
                  </Text>
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
                          <Text
                            allowFontScaling={false}
                            style={styles.priceQualities}
                          >
                            {quality}
                          </Text>
                        </Unorderedlist>
                      );
                    })}
                  </VStack>
                  <Button
                    style={styles.cardButton}
                    onPress={() =>
                      navigation.navigate("Prepayment", {
                        courseID: route.params.id,
                        plan: item,
                      })
                    }
                  >
                    <Text
                      allowFontScaling={false}
                      style={styles.cardButtonText}
                    >
                      Enroll
                    </Text>
                  </Button>
                </VStack>
              </LinearGradient>
            );
          })}
        </VStack>
        
        <View
        onLayout={(event)=> {
          const layout = event.nativeEvent.layout;
          dataSourceCords[1] = layout.y;
          setDataSourceCords(dataSourceCords);
        }}>
          <Text allowFontScaling={false} style={styles.aboutHeader}
          >
            About This Program
          </Text>
          <HTMLView
            value={data?.About}
            stylesheet={styles}
            onLinkPress={(url) => Linking.openURL(url)}
          />
        </View>
        <View style={styles.skills}>
          <Text allowFontScaling={false} style={styles.skillsHeader}>
            Skills You'll Gain
          </Text>
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
                <Text allowFontScaling={false} style={styles.featureHeader}>
                  {item.feature_title}
                </Text>
                <Text allowFontScaling={false} style={styles.featureContent}>
                  {item.feature_desc}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.instructor}
        onLayout={(event)=> {
          const layout = event.nativeEvent.layout;
          dataSourceCords[2] = layout.y;
          setDataSourceCords(dataSourceCords);
        }}>
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
          <View
            style={{ marginTop: deviceWindow.width * 0.03 }}
            onLayout={(event)=> {
              const layout = event.nativeEvent.layout;
              dataSourceCords[3] = layout.y;
              setDataSourceCords(dataSourceCords);
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
                  <Accordion.Item key={key1 * 23}>
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
                              <HStack space={3} alignItems="center" key={key2}>
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
          onLayout={(event)=> {
            const layout = event.nativeEvent.layout;
            dataSourceCords[4] = layout.y;
            setDataSourceCords(dataSourceCords);
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
        <View 
          onLayout={(event)=> {
          const layout = event.nativeEvent.layout;
          dataSourceCords[5] = layout.y;
          setDataSourceCords(dataSourceCords);
        }}>
          <Divider my="1" style={{ backgroundColor: "rgba(2, 36, 96, 1)" }} />
        </View>
        <VStack
          space={2}
          style={{ marginTop: deviceWindow.height * 0.015 }}
        >
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
};

export default index;
