import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Avatar, VStack, HStack, Divider, Button, Input } from "native-base";
const deviceWindow = Dimensions.get("window");
import { ScrollView } from "react-native-gesture-handler";
import css from "./styles";
const styles = StyleSheet.create(css);

const index = () => {
  return (
    <ScrollView style={styles.body}>
      <VStack space={5}>
        <VStack space={3}>
          <Text style={styles.headerText}>Purchase Information</Text>
          <Text style={styles.smallText}>Course : Master Stock Trading</Text>
          <Text style={styles.smallText}>Plan: Elite</Text>
          <Text style={styles.smallText}>Total Amount: 8794</Text>
          <Text style={styles.smallText}>Date of Purchase: 21-02-2069</Text>
        </VStack>
        <View>
          <Divider my="1" style={{ backgroundColor: "rgba(2, 36, 96, 1)" }} />
        </View>
        <VStack space={3}>
          <Text style={styles.headerText}>User Information</Text>
          <Text style={styles.smallText}>User : Ceaso Wrath</Text>
          <Text style={styles.smallText}>User Email: ceasowrath@gmail.com</Text>
          <VStack style={styles.inputBox}>
            <Input style={styles.input} placeholder="User GST" />
            <Button style={styles.button}>
              <Text style={{ color: "#F3C10C" }}>Confirm Your Gst number</Text>
            </Button>
          </VStack>
          <Text style={styles.smallText}>User TelegramID : dsakhdaksj</Text>
          <VStack style={styles.inputBox}>
            <Input style={styles.input} placeholder="TradingView" />
            <Button style={styles.button}>
              <Text style={{ color: "#F3C10C" }}>Confirm TradingView</Text>
            </Button>
          </VStack>
        </VStack>
        <View>
          <Divider my="1" style={{ backgroundColor: "rgba(2, 36, 96, 1)" }} />
        </View>
        <HStack style={styles.couponBox}>
          <Input style={styles.couponInput} placeholder="Coupon Code" />
          <Button style={styles.couponButton}>
            <Text
              style={{
                color: "#355080",
                fontSize: deviceWindow.width * 0.04,
                fontFamily: "Barlow_600SemiBold",
              }}
            >
              Apply
            </Text>
          </Button>
        </HStack>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button style={{ width: "50%", backgroundColor: "#314763" }}>
            <Text
              style={{
                color: "white",
                fontSize: deviceWindow.width * 0.04,
                fontFamily: "Barlow_600SemiBold",
              }}
            >
              Proceed to Pay
            </Text>
          </Button>
        </View>
      </VStack>
    </ScrollView>
  );
};

export default index;
