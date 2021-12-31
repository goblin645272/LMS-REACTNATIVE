import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Agenda, LocaleConfig } from "react-native-calendars";
import css from "./styles";
import { getEvents } from "../../action/events";
import { useDispatch, useSelector } from "react-redux";
import NetInfo from "@react-native-community/netinfo"

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
  NetInfo.fetch().then(state => {
    !state.isConnected && navigation.navigate("No Internet Auth")
});
  const [eves, setEves] = useState({
    items: {},
    markers: {},
  });
  const dispatch = useDispatch();

  useEffect(() => {
      const getData = async () => {
        const events = await getEvents(dispatch);
        if (events) {
          events.map((event) => {
            const diff = new Date(event.from).getTime() - new Date().getTime();
            const date = event.from.split("T")[0];
            const title = `${event.from.split("T")[1].slice(0, 5)} - ${event.to
              .split("T")[1]
              .slice(0, 5)} ${event.title}`;
            setEves((prev) => {
              return {
                items: { ...prev.items, ...{ [date]: [{ name: title, link: event.zoomLink, time: diff }] } },
                markers: {
                  ...prev.markers,
                  ...{
                    [date]: { marked: true, dots: [{ key: "item", color: "#000" }] },
                  },
                },
              };
            });
          });
        }
      };
      getData();
  }, [dispatch, setEves]);
  
  return (
    <View style={styles.container}>
      {eves.markers !== {} && <Agenda
        items={eves.items}
        renderItem={(item, firstItemInDay) => {
          return (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 2 }}
              style={styles.item}
              colors={["#1963D5", "#77DDEC"]}
            >
              <TouchableOpacity onPress={() => item.link && item.diff < 900000 && Linking.openURL(item.link)}>
                <Text allowFontScaling={false} style={{ color: "white" }}>{item.name}</Text>
                {item.link && item.diff < 900000 && <Text allowFontScaling={false} style={{ color: "white" }}>Click here to join!</Text>}
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
                <Text allowFontScaling={false} style={{ color: "white" }}>No Events Today</Text>
              </LinearGradient>
            </View>
          );
        }}
        pastScrollRange={1}
        futureScrollRange={1}
        markedDates={eves.markers}
        onRefresh={() => {
          const getData = async () => {
            const events = await getEvents(dispatch);
            if (events) {
              events.map((event) => {
                const date = event.from.split("T")[0];
                const title = `${event.from.split("T")[1].slice(0, 5)} - ${event.to
                  .split("T")[1]
                  .slice(0, 5)} ${event.title}`;
                setEves((prev) => {
                  return {
                    items: { ...prev.items, ...{ [date]: [{ name: title, link: event.zoomLink }] } },
                    markers: {
                      ...prev.markers,
                      ...{
                        [date]: { marked: true, dots: [{ key: "item", color: "#000" }] },
                      },
                    },
                  };
                });
              });
            }
          };
          getData();
        }}
        selected={new Date().toString()}
        markingType={"multi-dot"}
      />}
    </View>
  );
};

export default index;
