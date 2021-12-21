import { VStack, Input, Button, HStack, Toast } from "native-base";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import css from "./styles";
import { getProfile, updateProfile } from "../../action/auth";
import { ScrollView } from "react-native-gesture-handler";
import EvilIcons from "react-native-vector-icons/EvilIcons";
const index = () => {
  const styles = StyleSheet.create(css);
  const [change, setChange] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const data = useSelector((state) => state.auth.profile);
  const [state, setState] = useState({
    telegram_id: "",
    gst_number: "",
    tradingview_id: "",
  });
  console.log(data);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      await getProfile(dispatch);
    };
    getData();
  }, [dispatch]);
  useEffect(() => {
    if (
      (state.gst_number !== "" && state.gst_number.length === 15) ||
      state.telegram_id !== "" ||
      state.tradingview_id !== ""
    ) {
      return setChange(true);
    } else {
      setChange(false);
    }
  }, [setChange, state]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleChange = (name, text) => {
    setState((state) => {
      return { ...state, [name]: text };
    });
  };
  const update = () => {
    const req = {
      ...(state.gst_number.length === 15
        ? { gst_number: state.gst_number }
        : null),
      ...(state.tradingview_id !== ""
        ? { tradingview_id: state.tradingview_id }
        : null),
      ...(state.telegram_id !== "" ? { telegram_id: state.telegram_id } : null),
    };
    dispatch(updateProfile(req));
  };
  return (
    <ScrollView scrollEnabled={!isKeyboardVisible} style={styles.scroll}>
      <KeyboardAvoidingView behavior="padding" style={styles.scroll}>
        <View style={styles.container}>
          <VStack style={styles.background}>
            <View>
              <Text style={styles.header}>Your Profile</Text>
            </View>
            <View>
              <Text style={styles.label}>First Name</Text>
              <Input
                value={data?.firstName}
                placeholder="First Name"
                isDisabled={true}
                style={styles.input}
              />
            </View>
            <View>
              <Text style={styles.label}>Last Name</Text>
              <Input
                placeholder="Last Name"
                value={data?.lastName}
                isDisabled={true}
                style={styles.input}
              />
            </View>
            <View>
              <Text style={styles.label}>Email</Text>
              <Input
                placeholder="First Name"
                value={data?.email}
                isDisabled={true}
                style={styles.input}
              />
            </View>
            <View>
              <Text style={styles.label}>State</Text>
              <Input
                placeholder="State"
                value={data?.state}
                isDisabled={true}
                style={styles.input}
              />
            </View>

            <View>
              <Text style={styles.label}>Phone Number</Text>
              <Input
                placeholder="Phone Number"
                value={data?.phone_number}
                isDisabled={true}
                style={styles.input}
              />
            </View>
            <View>
              <Text style={styles.label}>GST Number</Text>
              <Input
                placeholder="GST Number"
                value={!data?.gst_number ? state.gst_number : data?.gst_number}
                onChangeText={(text) => handleChange("gst_number", text)}
                isDisabled={data?.gst_number ? true : false}
                style={styles.input}
              />
            </View>
            <View>
              <Text style={styles.label}>Telegram Username</Text>
              <Input
                value={!data?.telegramId ? state.telegram_id : data?.telegramId}
                onChangeText={(text) => handleChange("telegram_id", text)}
                isDisabled={data?.telegramId ? true : false}
                placeholder="Telegram Username"
                style={styles.input}
              />
            </View>
            <View>
              <Text style={styles.label}>Trading View Username</Text>
              <Input
                value={
                  !data?.tradingviewId
                    ? state.tradingview_id
                    : data?.tradingviewId
                }
                onChangeText={(text) => handleChange("tradingview_id", text)}
                isDisabled={data?.tradingviewId ? true : false}
                placeholder="Trading View Username"
                style={styles.input}
              />
            </View>
            <Button
              isDisabled={!change}
              onPress={() => update()}
              style={change ? styles.buttonActive : styles.button}
            >
              <HStack style={{ backgroundColor: "transparent" }}>
                <EvilIcons
                  name="lock"
                  size={30}
                  color={!change ? "black" : "#FFC00C"}
                />
                <Text
                  style={{ fontSize: 17, color: !change ? "black" : "#FFC00C" }}
                >
                  Save Changes
                </Text>
              </HStack>
            </Button>

            <Text
              style={styles.caption}
              onPress={() =>
                Linking.openURL(
                  "https://player.vimeo.com/video/620572159?title=0&byline=0&portrait=0"
                )
              }
            >
              CLICK HERE to learn how to find your TradingView & Telegram
              Username
            </Text>
          </VStack>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default index;
