import React from "react";
import { TouchableOpacity, StyleSheet, Text, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { VStack, Link, View, HStack, Image } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import css from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import HTMLView from "react-native-htmlview";
import { Dimensions } from "react-native";
import NetInfo from "@react-native-community/netinfo"


    

const deviceWindow = Dimensions.get("window");

const styles = StyleSheet.create(css);

const index = ({ navigation, route }) => {
  const data = route.params.data;
  NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    !state.isConnected && navigation.navigate("No Internet Auth")
});
  return (
    <ScrollView>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        colors={["#ffffff", "#6fbef9"]}
        style={styles.background}
      >
        <VStack
          space={6}
          justifyContent="center"
          alignItems="center"
          style={styles.Vstack}
        >
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => navigation.navigate("Blogs")}
          >
            <HStack style={styles.hstack}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{
                  width: deviceWindow.width * 0.2,
                  color: "rgb(2, 36, 96)",
                  margin: 2,
                }}
                size={deviceWindow.width < 560 ? 20 : 28}
              />
              <Text allowFontScaling={false} style={styles.body}>{`Go Back`}</Text>
            </HStack>
          </TouchableOpacity>
          <Text allowFontScaling={false} style={styles.head}>{data.title.replace(/-/g, " ")}</Text>
          <Image
            source={{ uri: data.image_link }}
            style={styles.banner}
            resizeMode="contain"
            alt="Blog Image"
          />
          <View>
            <HTMLView
              value={data.content}
              stylesheet={styles}
              onLinkPress={(url) => Linking.openURL(url)}
            />
          </View>
          <Text allowFontScaling={false} style={styles.body}>{`~ ${data.author}`}</Text>
        </VStack>
      </LinearGradient>
    </ScrollView>
  );
};

export default index;
