import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { VStack, Image } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import banner from "../../assets/images/testimonial.jpeg";
import css from "./styles";
const styles = StyleSheet.create(css);

const index = () => {
  return (
    <ScrollView style={styles.body}>
      <VStack space={2}>
        <Image
          source={banner}
          resizeMode="stretch"
          alt={"banner"}
          style={styles.image}
        />
        <View>
          <Text style={styles.text_1}>UPDATE AVAILABLE</Text>
          <Text style={styles.text_2}>You Have to update your app to use.</Text>
          {/* <Text style={styles.text_2}>
            Update from Play store or Download latest version from website
          </Text> */}
        </View>
      </VStack>
    </ScrollView>
  );
};

export default index;