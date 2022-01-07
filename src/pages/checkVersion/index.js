import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { VStack, Image } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import banner from "../../assets/images/update.png";
import LinearGradient from "react-native-linear-gradient";
import css from "./styles";
const styles = StyleSheet.create(css);

const index = () => {
  return (
    <ScrollView style={styles.body}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        colors={["#ffffff", "#6fbef9"]}
        style={styles.background}
      >
        <VStack space={2}>
          <Image
            source={banner}
            resizeMode="contain"
            alt={"banner"}
            style={styles.image}
          />
          <View>
            <Text style={styles.text_1}>UPDATE AVAILABLE</Text>
            <Text style={styles.text_2}>
              You have to update your app to use.
            </Text>
          </View>
        </VStack>
      </LinearGradient>
    </ScrollView>
  );
};

export default index;
