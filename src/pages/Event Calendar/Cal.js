import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Agenda, LocaleConfig } from "react-native-calendars";
import css from "./styles";
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

const Cal = ({eves}) => {
  return (
      <Agenda
        items={eves.items}
        renderItem={(item, firstItemInDay) => {
          return (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 2 }}
              style={styles.item}
              colors={["#1963D5", "#77DDEC"]}
            >
              <TouchableOpacity onPress={() => console.log(item.name)}>
                <Text allowFontScaling={false} style={{ color: "white" }}>{item.name}</Text>
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
        // onRefresh={() => console.log("refreshing...")}
        selected={new Date().toString()}
        markingType={"multi-dot"}
      />
  );
};

export default Cal;
