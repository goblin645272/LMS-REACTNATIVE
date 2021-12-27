import React from "react";
import { TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { VStack, Link, View, HStack, Toast } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import css from "./styles";
import noInternet from "../../assets/images/NoInternet.png";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {  faRedo } from "@fortawesome/free-solid-svg-icons";
import { Dimensions } from "react-native";
import NetInfo from "@react-native-community/netinfo"
const deviceWindow = Dimensions.get("window");

const styles = StyleSheet.create(css);

const index = ({ navigation, route }) => {

  
  return (
    <ScrollView>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        colors={["#ffffff", "#6fbef9"]}
        style={styles.background}
      >
        <VStack
          space={1}
          justifyContent="center"
          alignItems="center"
          style={styles.Vstack}
        >
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => NetInfo.fetch().then(state => {
              console.log("Connection type", state.type);
              console.log("Is connected?", state.isConnected);
              state.isConnected ? navigation.navigate("Home") : Toast.show("Please connect to internet")
          })}
          >
            <HStack style={styles.hstack}>
              <FontAwesomeIcon
                icon={faRedo}
                style={{
                  width: deviceWindow.width * 0.2,
                  color: "rgb(2, 36, 96)",
                  margin: 2,
                }}
                size={deviceWindow.width < 560 ? 20 : 28}
              />
              <Text style={styles.body}>{`No Internet Please reload`}</Text>
            </HStack>
          </TouchableOpacity>
          <Image
            source={noInternet}
            style={styles.banner}
            resizeMode="contain"
            alt="No Internet Image"
          />
          
        </VStack>
      </LinearGradient>
    </ScrollView>
  );
};

export default index;
