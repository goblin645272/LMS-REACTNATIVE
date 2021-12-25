import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { VStack, Link, View, HStack, Image } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import css from "./styles";
import noInternet from "../../assets/images/NoInternet.png";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Dimensions } from "react-native";
const deviceWindow = Dimensions.get("window");

const styles = StyleSheet.create(css);

const index = ({ navigation, route }) => {
  const data = route.params.data;
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
          <Image
            source={{ uri: noInternet }}
            style={styles.banner}
            // resizeMode="contain"
            alt="No Internet Image"
          />
          <TouchableOpacity
            style={styles.touchable}
            // onPress={() => navigation.navigate("Blogs")}
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
              <Text style={styles.body}>{`Reload`}</Text>
            </HStack>
          </TouchableOpacity>
        </VStack>
      </LinearGradient>
    </ScrollView>
  );
};

export default index;
