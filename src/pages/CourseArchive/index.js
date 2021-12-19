import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Accordion, VStack, HStack } from "native-base";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import { Vimeo } from "react-native-vimeo-iframe";
import LinearGradient from 'react-native-linear-gradient';;

import css from "./styles";
const styles = StyleSheet.create(css);
const deviceWindow = Dimensions.get("window");

const upcomingData = [
  {
    _id: "6198c33339668598789a8f49",
    courseId: "612ccd6b9f192c86faa26f49",
    sessionType: "live",
    from: "2021-12-14T19:00:00.000Z",
    to: "2021-12-14T20:30:00.000Z",
    title: "Skill UP Session",
    __v: 0,
  },
  {
    _id: "6194d73139668598789a7f13",
    courseId: "612ccd3c9f192c86faa26f48",
    sessionType: "qna",
    from: "2021-12-15T19:00:00.000Z",
    to: "2021-12-15T20:00:00.000Z",
    title: "Q&A Session",
    __v: 0,
  },
  {
    _id: "6198f0dc39668598789a901b",
    courseId: "612ccd6b9f192c86faa26f49",
    sessionType: "live",
    from: "2021-12-16T19:00:00.000Z",
    to: "2021-12-16T20:30:00.000Z",
    title: "Skill UP Session",
    __v: 0,
  },
  {
    _id: "6199dde839668598789a91f8",
    courseId: "612ccd3c9f192c86faa26f48",
    sessionType: "qna",
    from: "2021-12-20T19:00:00.000Z",
    to: "2021-12-20T20:00:00.000Z",
    title: "Q&A Session",
    __v: 0,
  },
  {
    _id: "619a046239668598789a9303",
    courseId: "612ccd6b9f192c86faa26f49",
    sessionType: "live",
    from: "2021-12-21T19:00:00.000Z",
    to: "2021-12-21T20:30:00.000Z",
    title: "Skill UP Session",
    __v: 0,
  },
  {
    _id: "619a6ece39668598789a9484",
    courseId: "612ccd6b9f192c86faa26f49",
    sessionType: "live",
    from: "2021-12-23T19:00:00.000Z",
    to: "2021-12-23T20:30:00.000Z",
    title: "Skill UP Session",
    __v: 0,
  },
  {
    _id: "619a6f0239668598789a948a",
    courseId: "612ccd6b9f192c86faa26f49",
    sessionType: "live",
    from: "2021-12-29T19:00:00.000Z",
    to: "2021-12-29T20:30:00.000Z",
    title: "Skill UP Session",
    __v: 0,
  },
];

const pastData = [
  {
    title: "Skill Up Session 21st Oct 2021",
    link: "hekki",
    date: "2021-10-21",
    desc: "Educational Trading Ideas Discussed : Escorts , Heromotocorp , Hdfcbank, Ubl,Tcs ",
  },
  {
    title: "Skill Up Session 27st Oct 2021",
    link: "https://vimeo.com/639228272",
    date: "2021-10-27",
    desc: "Educational Ideas : Glenmark , Nestleind, Ambujacem, Bergerpaints, Gujratgas",
  },
  {
    title: "Skill Up Session 28st Oct 2021",
    link: "https://vimeo.com/640058404",
    date: "2021-10-28",
    desc: "Educational Trading Ideas :NIFTY , BANKNIFTY , EXIDEIND , ITC",
  },
  {
    title: "Skill Up Session 2nd Nov 2021",
    link: "https://vimeo.com/641623967",
    date: "2021-11-02",
    desc: "Educational Trading Ideas : pneumonoultramicroscopicsilicovolcanoconiosis",
  },
  {
    title: "Skill Up Session 9th Nov 2021",
    link: "https://vimeo.com/644032400",
    date: "2021-11-09",
    desc: "Educational Trading Ideas : Colpal ,Colgate ,Hinduilvr,Tcs ",
  },
  {
    title: "Skill Up Session 11th Nov 2021",
    link: "https://vimeo.com/644888694",
    date: "2021-11-11",
    desc: "Educational Trading Ideas: Jindalsteel , lt , mcdowelln , cholafin , coforce , mothersonsumi",
  },
];

const index = () => {
  const [past, setPast] = useState(false);

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
              Upcoming{" "}
            </Text>

            <Text
              onPress={() => setPast(true)}
              style={past ? styles.sliderActive : styles.slider}
            >
              Past{" "}
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
            {upcomingData.map((data, index) => {
              return (
                <LinearGradient
                  key={index}
                  colors={["#1963D5", "#77DDEC"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.5, y: 1.5 }}
                  style={styles.content}
                >
                  <Text style={styles.contentTextDate}>
                    {`${moment(data.from).format("dddd").slice(0, 3)}, ${moment(
                      data.from
                    ).format("Do MMMM")}`}
                  </Text>
                  <Text style={styles.contentTextCourse}>{data.title}</Text>
                  <Text style={styles.contentTextLink}>Click here to join</Text>
                </LinearGradient>
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
            {pastData.map((data, index2) => {
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
                            font: deviceWindow.width * 0.08,
                            color: "#000260",
                            fontFamily: "Barlow_500Medium",
                          }}
                        >
                          {data.title}
                        </Text>
                        <Vimeo
                          videoId={data.link.slice(-9)} //Change ID here
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

          {/* <Vimeo
            videoId={"605513128"} //Change ID here
            onReady={() => console.log("Video is ready")}
            onPlay={() => console.log("Video is playing")}
            onPlayProgress={(data) => console.log("Video progress data:", data)}
            onFinish={() => console.log("Video is finished")}
            loop={false}
            autoPlay={false}
            controls={true}
            speed={false}
            time={"0m0s"}
          /> */}
        </View>
      )}
    </ScrollView>
  );
};

export default index;
