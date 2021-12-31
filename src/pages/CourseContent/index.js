import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { VStack } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { WebView } from "react-native-webview";
import css from "./styles.js";
const styles = StyleSheet.create(css);
import { ScrollView } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo"

const index = ({ route, navigation }) => {
  NetInfo.fetch().then(state => {
    !state.isConnected && navigation.navigate("No Internet Auth")
});
  const array = route.params.array;
  return (
    <ScrollView style={styles.scroll}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        colors={["#ffffff", "#cbcbcb"]}
        colors={["#ffffff", "#ababab"]}
        style={styles.background}
      >
        {array?.map((obj, index) => {
          return (
            <VStack style={styles.card} key={index}>
              <WebView
                source={{
                  uri: obj.link,
                }}
                style={{ marginTop: 20, borderRadius: 10 }}
              />
            </VStack>
          );
        })}
      </LinearGradient>
    </ScrollView>
  );
};

export default index;
