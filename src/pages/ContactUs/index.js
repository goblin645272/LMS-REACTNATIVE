import React, { useState } from "react";
import { StyleSheet, Text, KeyboardAvoidingView, View } from "react-native";
import {
  FormControl,
  VStack,
  Input,
  TextArea,
  Button,
  Select,
} from "native-base";
import Toast from "react-native-toast-message";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";
import css from "./styles";
import { countryCode } from "../../assets/country";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import baseurl from "../../api/url";
import { useDispatch } from "react-redux";
const styles = StyleSheet.create(css);

const index = () => {
  const dispatch = useDispatch();
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const numberRegex = /^\d+$/;
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    country: "+91",
    message: "",
  });

  const handleChange = (value, name) => {
    setData((state) => {
      return { ...state, [name]: value };
    });
  };
  const submit = () => {
    if (data.name === "") {
      Toast.show({
        text1: "Please Enter Your Name",
        type: "error",
      });
    } else {
      if (data.email === "") {
        Toast.show({
          text1: "Please enter email ",
          type: "error",
        });
      } else {
        if (!emailRegex.test(data.email)) {
          Toast.show({
            text1: "Please enter valid email",
            type: "error",
          });
        } else {
          if (data.number === "") {
            Toast.show({
              text1: "Please enter mobile number",
              type: "error",
            });
          } else {
            if (!numberRegex.test(data.number)) {
              Toast.show({
                text1: "Please enter valid mobile number",
                type: "error",
              });
            } else {
              if (data.message.trim() === "") {
                Toast.show({
                  text1: "Please add some message",
                  type: "error",
                });
              } else {
                dispatch({ type: "LOAD" });
                axios
                  .post(baseurl + "/auth/contact-us", data)
                  .then((res) => {
                    setData({
                      name: "",
                      email: "",
                      number: "",
                      country: "+91",
                      message: "",
                    });
                    Toast.show({
                      text1:
                        "Thank you for contacting us..We shall contact you",
                    });
                    dispatch({ type: "UNLOAD" });
                  })
                  .catch((error) => {
                    dispatch({ type: "UNLOAD" });
                    if (error.message === "Network Error") {
                      Toast.show({
                        type: "error",
                        text1: "No internet connection found",
                      });
                    } else {
                      Toast.show({
                        text1: "Something went wrong...Please try again",
                        type: "error",
                      });
                    }
                  });
              }
            }
          }
        }
      }
    }
  };
  return (
    // <View style={styles.scroll}>
      <ScrollView style={styles.scroll}>
        {/* <KeyboardAvoidingView behavior="padding" style={styles.background}> */}
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 2 }}
            colors={["#83eaf1", "#1d70f5"]}
            style={styles.background}
          >
            <VStack space={6} justifyContent="center" alignItems="center">
              <Text allowFontScaling={false} style={styles.header}>
                Contact Us
              </Text>
              <Input
                placeholder="Name"
                placeholderTextColor="#022460"
                style={styles.input}
                value={data.name}
                onChangeText={(text) => handleChange(text, "name")}
                isFullWidth={true}
              />
              <Input
                placeholder="Email"
                placeholderTextColor="#022460"
                value={data.email}
                onChangeText={(text) => handleChange(text, "email")}
                style={styles.input}
                isFullWidth={true}
              />
              <FormControl
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "#3F51B5",
                  borderRadius: 4,
                  width: wp("90%"),
                }}
              >
                <Select
                  minWidth={wp("70%")}
                  isFullWidth={true}
                  placeholder="Country Code"
                  placeholderTextColor="#022460"
                  variant="unstyled"
                  value={data.country}
                  onValueChange={(value) => handleChange(value, "country")}
                >
                  {countryCode.map((item, ind) => {
                    return (
                      <Select.Item
                        key={ind * 17}
                        label={`${item.name} ${item.dial_code}`}
                        value={item.dial_code}
                      />
                    );
                  })}
                </Select>
              </FormControl>
              <Input
                placeholder="Mobile Number"
                onChangeText={(text) => handleChange(text, "number")}
                placeholderTextColor="#022460"
                style={styles.input}
                isFullWidth={true}
                value={data.number}
              />
              <TextArea
                placeholderTextColor="#022460"
                onChangeText={(text) => handleChange(text, "message")}
                style={styles.input}
                value={data.message}
                h={125}
                placeholder="Message"
                w={{
                  base: "70%",
                  md: "25%",
                }}
              />
              <Button style={styles.button} onPress={submit}>
                <Text allowFontScaling={false} style={styles.button_text}>
                  Submit
                </Text>
              </Button>
            </VStack>
          </LinearGradient>
        {/* </KeyboardAvoidingView> */}
      </ScrollView>
    // </View>
  );
};

export default index;
