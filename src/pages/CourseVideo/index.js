import React, { useState, useRef } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlayCircle, faBook } from "@fortawesome/free-solid-svg-icons";
import { ScrollView } from "react-native-gesture-handler";
const deviceWindow = Dimensions.get("window");

const index = () => {
  const module = [
    {
      id: "0n9ttkz4is5k",
      name: "Course Introduction",
      list: [
        {
          id: "v3xzd9b9woye",
          title: "Course Introduction",
          type: "video",
          time: 3,
        },
      ],
    },
    {
      id: "zz7hqk25t4ts",
      name: "Module 1 - Stock Market Basics",
      list: [
        {
          id: "b7k55ec9x821",
          title: "Lesson 1 - Stock Exchange & It's Functioning",
          type: "video",
          time: 8,
        },
        {
          id: "qbenu40azvvp",
          title: "Lesson 2 - Bull vs Bear Market",
          type: "video",
          time: 5,
        },
        {
          id: "gdqplpth2mj4",
          title: "Lesson 3 - Fundamental vs Technical Analysis",
          type: "video",
          time: 7,
        },
        {
          id: "t1c02sitxd9j",
          title: "Lesson 4 - Long vs Short Positions",
          type: "video",
          time: 6,
        },
        {
          id: "xrip3tunn3d0",
          title: "Lesson 5 - Key Elements Of Any Trade",
          type: "video",
          time: 9,
        },
        {
          id: "rbby58i8wh4s",
          title: "Lesson 6 - Reward To Risk Ratio",
          type: "video",
          time: 9,
        },
        {
          id: "vhfb9qc82ujr",
          title: "Quiz 1",
          type: "quiz",
        },
      ],
    },
    {
      id: "vpu33e0ntkgp",
      name: "Module 2 - Japanese Candlestick Charts",
      list: [
        {
          id: "avdts76mey5v",
          title: "Lesson 7 - How To Interpret A Candlestick Chart",
          type: "video",
          time: 15,
        },
        {
          id: "nact2jfvomg1",
          title: "Quiz 2",
          type: "quiz",
        },
      ],
    },
    {
      id: "6t709sir0nev",
      name: "Module 3 - Supply & Demand Trading Essentials",
      list: [
        {
          id: "a9mllbjlveos",
          title:
            "Lesson 8 - How To Identify Institutional Supply & Demand Footprints",
          type: "video",
          time: 14,
        },
        {
          id: "6xbi87olscea",
          title: "Lesson 9 - Leg & Base Candles",
          type: "video",
          time: 9,
        },
        {
          id: "jh4u9je4edgd",
          title: "Lesson 10 - Supply & Demand Formations",
          type: "video",
          time: 12,
        },
        {
          id: "wwjfaw4derky",
          title: "Quiz 3",
          type: "quiz",
        },
        {
          id: "12qj06s3url1",
          title: "Lesson 11 - Zone Components",
          type: "video",
          time: 6,
        },
        {
          id: "pjf9u9esgcxb",
          title: "Lesson 12 - Supply & Demand Terminology",
          type: "video",
          time: 9,
        },
        {
          id: "o44b8yqtnwfo",
          title: "Lesson 13 - Amateur Trading Mistakes",
          type: "video",
          time: 5,
        },
        {
          id: "sfbx477e3vt2",
          title: "Quiz 4",
          type: "quiz",
        },
        {
          id: "7fjep1gyxx7y",
          title: "Lesson 14 - Steps To Identify Demand Zones",
          type: "video",
          time: 10,
        },
        {
          id: "p5kdhn8li8lv",
          title:
            "Lesson 15 - How To Mark Proximal & Distal Lines For A Demand Zone",
          type: "video",
          time: 18,
        },
        {
          id: "sfapap0dkp2u",
          title: "Lesson 16 - Steps To Identify Supply Zones",
          type: "video",
          time: 5,
        },
        {
          id: "0xfw1kb2yhtr",
          title:
            "Lesson 17 - How To Mark Proximal & Distal Lines For A Supply Zone",
          type: "video",
          time: 8,
        },
        {
          id: "nu3x2gxij19s",
          title: "Quiz 5",
          type: "quiz",
        },
        {
          id: "l3hwr3jzr8yg",
          title: "Lesson 18 - Classification Of Different Trading Styles",
          type: "video",
          time: 8,
        },
        {
          id: "bpxuf54c87bc",
          title: "Lesson 19 - Multiple Time Frame Analysis",
          type: "video",
          time: 6,
        },
        {
          id: "suoqz6vi6wwn",
          title: "Quiz 6",
          type: "quiz",
        },
      ],
    },
    {
      id: "i3t1yp3vrlwz",
      name: "Module 4 - Trade Planning Process ",
      list: [
        {
          id: "ye5pfkc1ro11",
          title: "Lesson 20 - Identifying Wholesale & Retail Areas On A Chart",
          type: "video",
          time: 21,
        },
        {
          id: "d5cf3k4139hy",
          title: "Lesson 21 - Identifying Execution Zones",
          type: "video",
          time: 16,
        },
        {
          id: "h379fu3h7k92",
          title: "Quiz 7",
          type: "quiz",
        },
        {
          id: "trvzbovcl7wl",
          title: "Lesson 22 - Trend Analysis",
          type: "video",
          time: 29,
        },
        {
          id: "mjkyg4m1r816",
          title: "Lesson 23 - Decision Matrix",
          type: "video",
          time: 17,
        },
        {
          id: "1r0cmuvzc48p",
          title: "Quiz 8",
          type: "quiz",
        },
        {
          id: "mw6gm453pu6y",
          title: "Lesson 24 - Probability Enhancers",
          type: "video",
          time: 2,
        },
        {
          id: "ss1zaeucdu7v",
          title: "Lesson 24A - Probability Enhancer - Freshness",
          type: "video",
          time: 4,
        },
        {
          id: "upwvr6p7hepu",
          title: "Lesson 24B - Probability Enhancer - Reward Zone",
          type: "video",
          time: 6,
        },
        {
          id: "o9480i1yjoxo",
          title: "Lesson 24C - Probability Enhancer - Strength",
          type: "video",
          time: 4,
        },
        {
          id: "semu31art781",
          title: "Quiz 9",
          type: "quiz",
        },
        {
          id: "j484ra70gsqb",
          title: "Lesson 24D - Probability Enhancer - Time",
          type: "video",
          time: 2,
        },
        {
          id: "1y3sc4i1vi6b",
          title: "Lesson 24E - Probability Enhancer - Trend",
          type: "video",
          time: 2,
        },
        {
          id: "ci1dusadbrzc",
          title: "Lesson 24F - Probability Enhancer - Location",
          type: "video",
          time: 2,
        },
        {
          id: "cyz1g5nbnpw2",
          title: "Lesson 24G - Probability Enhancer - Zone Achievement",
          type: "video",
          time: 8,
        },
        {
          id: "cb4vd8tq44cn",
          title: "Quiz 10",
          type: "quiz",
        },
        {
          id: "eirogxieocpb",
          title: "Lesson 25 - Stop, Entry & Target",
          type: "video",
          time: 19,
        },
        {
          id: "ekifwyvutemm",
          title: "Quiz 11",
          type: "quiz",
        },
      ],
    },
    {
      id: "l6cbtzp8knka",
      name: "Module 5 - Risk Management & Position Sizing",
      list: [
        {
          id: "tds9cd2pop5w",
          title: "Lesson 26 - Position Size Rules For Intraday Trading",
          type: "video",
          time: 14,
        },
        {
          id: "vptr9m65x3cs",
          title: "Lesson 27 - Position Size Rules For Positional Trading",
          type: "video",
          time: 8,
        },
        {
          id: "68bfvdo0sgf9",
          title: "Lesson 28 - Risk Management Rules",
          type: "video",
          time: 4,
        },
        {
          id: "mf0ji4bx2zez",
          title: "Quiz 12",
          type: "quiz",
        },
      ],
    },
    {
      id: "xiam5nu41ihm",
      name: "Module 6 - Key Concepts",
      list: [
        {
          id: "qqx8tjl2tjaw",
          title: "Lesson 29 - Price Over Extension - 20 EMA",
          type: "video",
          time: 16,
        },
        {
          id: "q5h9i2jcqp6c",
          title: "Lesson 29A - Price Over Extension - Fibonacci Retracement",
          type: "video",
          time: 22,
        },
        {
          id: "7vpa3ob8df2y",
          title: "Lesson 30 - Level Over Level",
          type: "video",
          time: 8,
        },
        {
          id: "c8bluvp8b18a",
          title: "Lesson 31 - Trend Analysis - Zone Violation",
          type: "video",
          time: 14,
        },
        {
          id: "g6gtooqlpn7j",
          title: "Quiz 13",
          type: "quiz",
        },
      ],
    },
    {
      id: "onuv8hrdter5",
      name: "Module 7 - Power Patterns",
      list: [
        {
          id: "d3kbyqx66p4e",
          title: "Lesson 32 - Authentic & Non Authentic Zones",
          type: "video",
          time: 14,
        },
        {
          id: "bjsnk5nwp4q0",
          title: "Lesson 33 - Flag Limit Zones",
          type: "video",
          time: 24,
        },
        {
          id: "46hxkek33n0s",
          title: "Lesson 34 - Quasimodo Zones",
          type: "video",
          time: 22,
        },
        {
          id: "daooo3oxc7ca",
          title: "Lesson 35 - Price Caps",
          type: "video",
          time: 7,
        },
        {
          id: "di5f4r8sf33t",
          title: "Lesson 36 - Bull & Bear Market Traps",
          type: "video",
          time: 10,
        },
        {
          id: "v44wmld5c6rp",
          title: "Quiz 14",
          type: "quiz",
        },
      ],
    },
    {
      id: "l9k0j4fkkpsx",
      name: "Module 8 - Gaps",
      list: [
        {
          id: "7u4uuygfcfqv",
          title: "Lesson 37 - Inside & Outside Gaps",
          type: "video",
          time: 13,
        },
        {
          id: "k5vyldz6ehe9",
          title: "Lesson 38 - Professional & Novice Gaps",
          type: "video",
          time: 17,
        },
        {
          id: "xbfexc6yjcs0",
          title: "Quiz 15",
          type: "quiz",
        },
      ],
    },
    {
      id: "cx7wsr78zgl7",
      name: "Module 9 - Countertrend Trading",
      list: [
        {
          id: "adf0dv9k6oug",
          title: "Lesson 39 - Countertrend Trading",
          type: "video",
          time: 11,
        },
        {
          id: "chjk5a5vmfch",
          title: "Quiz 16",
          type: "quiz",
        },
      ],
    },
    {
      id: "ox65keayyqa1",
      name: "Module 10 - Arrival & Entry Types",
      list: [
        {
          id: "19neqkbwsqxl",
          title: "Lesson 40 - Arrival",
          type: "video",
          time: 22,
        },
        {
          id: "kg3vjsodqhaj",
          title: "Lesson 41 - Entry Types",
          type: "video",
          time: 6,
        },
        {
          id: "2qgrrmp6vfeu",
          title: "Lesson 42 - Limit Orders",
          type: "video",
          time: 8,
        },
        {
          id: "edcrl47j5y58",
          title: "Lesson 43 - Trigger Orders",
          type: "video",
          time: 8,
        },
        {
          id: "158p5lst0d7r",
          title: "Lesson 44 - Market Orders",
          type: "video",
          time: 4,
        },
        {
          id: "u9so02xcwf6l",
          title: "Lesson 45 - Bracket Orders",
          type: "video",
          time: 9,
        },
        {
          id: "da07rjefdu7c",
          title: "Quiz 17",
          type: "quiz",
        },
      ],
    },
    {
      id: "t02wuzw3jj80",
      name: "Module 11 - Trade Management",
      list: [
        {
          id: "3emg8yzsr11y",
          title: "Lesson 46 - Trailing Your Stops",
          type: "video",
          time: 9,
        },
      ],
    },
    {
      id: "y97uuhio35pt",
      name: "Module 12 - Stock Scanning",
      list: [
        {
          id: "kxgdonshex93",
          title: "Lesson 47 - Automated Zone Indicator & Alerts",
          type: "video",
          time: 20,
        },
      ],
    },
    {
      id: "3koey4miz649",
      name: "Module 13 - TradingView Tutorial",
      list: [
        {
          id: "17ey4xfuldk0",
          title: "Lesson 48 - Chart Settings",
          type: "video",
          time: 15,
        },
        {
          id: "ya5ppppthwii",
          title: "Lesson 49 - How To Create A Watchlist",
          type: "video",
          time: 9,
        },
        {
          id: "lau72ptdzqoo",
          title: "Lesson 50 - Tools For Supply & Demand Trading",
          type: "video",
          time: 18,
        },
      ],
    },
    {
      id: "5nc5wymsy9r7",
      name: "Module 14 - Case Studies",
      list: [
        {
          id: "wh5b1holcqm4",
          title: "Glenmark Trade Review ",
          type: "video",
          time: 5,
        },
        {
          id: "hyodcr1a9q91",
          title: "Mothersumi Trade Review",
          type: "video",
          time: 2,
        },
        {
          id: "889ttixd1o28",
          title: "Bosch Trade review ",
          type: "video",
          time: 4,
        },
      ],
    },
    {
      id: "syji5t3qidgs",
      name: "Road Map Ahead",
      list: [
        {
          id: "b7fk0hluhp3h",
          title: "Road Map Ahead",
          type: "video",
          time: 3,
        },
      ],
    },
  ];

  return (
    <ScrollView
      style={{
        padding: deviceWindow.width * 0.04,
      }}
    >
      <View></View>

      <Accordion
        allowMultiple
        style={{
          backgroundColor: "#7FE0F3",
        }}
      >
        {module.map((row, key1) => {
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

                  <Accordion.Icon style={{ width: deviceWindow.width * 0.1 }} />
                </HStack>
              </Accordion.Summary>
              <Accordion.Details>
                {row?.list.map((obj, key2) => {
                  return (
                    <VStack padding={1} key={key2 * 0.15}>
                      {obj.type === "video" ? (
                        <HStack space={3} alignItems="center">
                          <FontAwesomeIcon
                            icon={faPlayCircle}
                            style={{
                              width: deviceWindow.width * 0.1,
                            }}
                            size={deviceWindow.width < 560 ? 20 : 28}
                          />
                          <Text
                            style={{
                              width: deviceWindow.width * 0.7,
                              color: "#000260",
                              fontFamily: "Barlow_500Medium",
                              fontSize: deviceWindow.height * 0.02,
                            }}
                          >
                            {obj.title}
                          </Text>
                        </HStack>
                      ) : (
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
                      )}
                    </VStack>
                  );
                })}
              </Accordion.Details>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <View></View>
    </ScrollView>
  );
};

export default index;
