import { HStack, ScrollView, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Agenda, LocaleConfig } from "react-native-calendars";
import css from "./styles";
import { getEvents } from "../../action/events";
import { useDispatch, useSelector } from "react-redux";
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

const index = () => {
  const [bought, setBought] = useState([]);
  const [eves, setEves] = useState({
    items: {},
    markers: {},
  });
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  useEffect(() => {
    const getData = async () => {
      await getEvents(dispatch);
      const data = await getBoughtCourses(dispatch);
      setBought(data);
    };
    getData();
  }, [dispatch]);

  useEffect(() => {
    events.map(event => {
      const date = event.from.split('T')[0]
      const title = `${event.from.split('T')[1]} - ${event.to.split('T')[1].slice(5)} ${event.title}`
      setEves(prev => {
        const items = { ...prev.items, ...{[date]: [{name: title}]} }
        const markers = { ...prev.markers }
        console.log(items)
        
        return {
        items: items,
        markers: {}
      }})
      
    })
  }, [events, setEves])

  console.log(events)

  return (
    <View style={styles.container}>
      <Agenda
        items={{
          "2021-12-21": [{ name: "item 1 - any js object" }],
          "2021-12-23": [{ name: "item 2 - any js object" }],
          "2021-12-25": [
            { name: "item 3 - any js object" },
            { name: "item 4 - any js object" },
          ],
        }}
        renderItem={(item, firstItemInDay) => {
          return (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 2 }}
              style={styles.item}
              colors={["#1963D5", "#77DDEC"]}
            >
              <TouchableOpacity onPress={() => console.log(item.name)}>
                <Text style={{ color: "white" }}>{item.name}</Text>
              </TouchableOpacity>
            </LinearGradient>
          );
        }}
        renderEmptyData={() => {
          return (
            <View style={styles.background}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
                style={styles.courseDetails}
                colors={["#1963D5", "#77DDEC"]}
              >
                <Text style={{ color: "white" }}>No Events Today</Text>
              </LinearGradient>
            </View>
          );
        }}
        pastScrollRange={1}
        futureScrollRange={1}
        markedDates={{
          "2021-12-21": {
            marked: true,
            dots: [{ key: "item", color: "#f5b000" }],
          },
          "2021-12-23": {
            marked: true,
            dots: [{ key: "item", color: "#f5b000" }],
          },
          "2021-12-25": {
            marked: true,
            dots: [
              { key: "item", color: "#f5b000" },
              { key: "item", color: "#01489f" },
            ],
          },
        }}
        onRefresh={() => console.log(events)}
        selected={new Date()}
        markingType={"multi-dot"}
      />
    </View>
  );
};

export default index;
