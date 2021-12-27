import { HStack, ScrollView, VStack } from "native-base";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Agenda, LocaleConfig } from "react-native-calendars";
import css from "./styles";
import { getEvents } from "../../action/events";
import { useDispatch, useSelector } from "react-redux";
import Cal from "./Cal";
const styles = StyleSheet.create(css);

LocaleConfig.locales["en"] = {
  formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"],
  // numbers: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] // number localization example
};
LocaleConfig.defaultLocale = "en";

// const events = [
//   {
//     _id: "6199dde839668598789a91f8",
//     courseId: "612ccd3c9f192c86faa26f48",
//     sessionType: "qna",
//     from: "2021-12-20T19:00:00.000Z",
//     to: "2021-12-20T20:00:00.000Z",
//     title: "Q&A Session",
//     v: 0,
//   },
//   {
//     _id: "619a046239668598789a9303",
//     courseId: "612ccd6b9f192c86faa26f49",
//     sessionType: "live",
//     from: "2021-12-21T19:00:00.000Z",
//     to: "2021-12-21T20:30:00.000Z",
//     title: "Skill UP Session",
//     v: 0,
//   },
//   {
//     _id: "619a6ece39668598789a9484",
//     courseId: "612ccd6b9f192c86faa26f49",
//     sessionType: "live",
//     from: "2021-12-23T19:00:00.000Z",
//     to: "2021-12-23T20:30:00.000Z",
//     title: "Skill UP Session",
//     v: 0,
//   },
//   {
//     _id: "619a6f0239668598789a948a",
//     courseId: "612ccd6b9f192c86faa26f49",
//     sessionType: "live",
//     from: "2021-12-29T19:00:00.000Z",
//     to: "2021-12-29T20:30:00.000Z",
//     title: "Skill UP Session",
//     v: 0,
//   },
// ];

const index = () => {
  const [eves, setEves] = useState({
    items: {},
    markers: {},
  });
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  useLayoutEffect(() => {
    const getData = async () => {
      await getEvents(dispatch);
    };
    getData();
  }, [dispatch]);

  useLayoutEffect(() => {
    events.map((event) => {
      const date = event.from.split("T")[0];
      const title = `${event.from.split("T")[1].slice(0, 5)} - ${event.to
        .split("T")[1]
        .slice(0, 5)} ${event.title}`;
      setEves((prev) => {
        const items = { ...prev.items, ...{ [date]: [{ name: title }] } };
        const markers = {
          ...prev.markers,
          ...{
            [date]: { marked: true, dots: [{ key: "item", color: "#000" }] },
          },
        };
        return {
          items: items,
          markers: markers,
        };
      });
    });
  }, [setEves]);

  return (
    <View style={styles.container}>
      <Cal eves={eves} />
    </View>
  );
};

export default index;
