import React, { useState, useEffect } from "react";
import { StyleSheet, Text, KeyboardAvoidingView, View } from "react-native";
import { useDispatch } from "react-redux";
import { VStack, Center, Input, Button, FormControl } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import css from "./styles";
import { changePassword } from "../../action/auth";
import { useIsFocused } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";

const styles = StyleSheet.create(css);

const index = () => {
  NetInfo.fetch().then((state) => {
    !state.isConnected && navigation.navigate("No Internet Auth");
  });
  const dispatch = useDispatch();
  const [data, setData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (name, value) => {
    setErrors((state) => {
      return { ...state, [name]: "" };
    });
    setData((state) => {
      return { ...state, [name]: value };
    });
  };
  const validate = () => {
    if (
      data.old_password === "" ||
      data.new_password === "" ||
      data.confirm_password === "" ||
      data.new_password.length < 8 ||
      data.confirm_password !== data.new_password
    ) {
      setErrors((state) => {
        return {
          ...state,
          ...(data.old_password === ""
            ? { old_password: "This field is Required" }
            : null),
          ...(data.new_password === ""
            ? { new_password: "This field is Required" }
            : null),
          ...(data.confirm_password === ""
            ? { confirm_password: "This field is Required" }
            : null),
          ...(data.new_password.length < 8
            ? {
                new_password:
                  "New password should be atleast 8 characters long ",
              }
            : null),
          ...(data.confirm_password !== data.new_password
            ? {
                confirm_password: "Passwords do not match ",
              }
            : null),
        };
      });
      return false;
    } else {
      return true;
    }
  };

  const submit = () => {
    if (validate()) {
      dispatch(changePassword(data));
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
      setErrors({});
    }
  }, [isFocused]);
  return (
    <KeyboardAvoidingView style={styles.scroll}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        colors={["#ffffff", "#6fbef9"]}
        style={styles.background}
      >
        <Center>
          <VStack>
            <Text allowFontScaling={false} style={styles.header}>
              Change Password
            </Text>
            <FormControl isInvalid={"old_password" in errors}>
              <Input
                type="password"
                style={{
                  ...styles.input,
                  ...(errors.old_password !== ""
                    ? { borderColor: "red", borderWidth: 1 }
                    : null),
                }}
                placeholder="Old Password"
                onChangeText={(text) => handleChange("old_password", text)}
                returnKeyType="next"
              />
              {"old_password" in errors ? (
                <FormControl.ErrorMessage
                  _text={{
                    fontSize: "xs",
                  }}
                >
                  {errors.old_password}
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={"new_password" in errors}>
              <Input
                type="password"
                style={{
                  ...styles.input,
                  ...(errors.new_password !== ""
                    ? { borderColor: "red", borderWidth: 1 }
                    : null),
                }}
                placeholder="New Password"
                onChangeText={(text) => handleChange("new_password", text)}
                returnKeyType="next"
              />
              {"new_password" in errors ? (
                <FormControl.ErrorMessage
                  _text={{
                    fontSize: "xs",
                  }}
                >
                  {errors.new_password}
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isInvalid={"confirm_password" in errors}>
              <Input
                type="password"
                style={{
                  ...styles.input,
                  ...(errors.confirm_password !== ""
                    ? { borderColor: "red", borderWidth: 1 }
                    : null),
                }}
                placeholder="Confirm Password"
                onChangeText={(text) => handleChange("confirm_password", text)}
                returnKeyType="next"
              />
              {"confirm_password" in errors ? (
                <FormControl.ErrorMessage
                  _text={{
                    fontSize: "xs",
                  }}
                >
                  {errors.confirm_password}
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>
          </VStack>
          <View style={{ alignItems: "center" }}>
            <Button onPress={() => submit()} style={styles.button}>
              <Text allowFontScaling={false} style={styles.buttonText}>
                Change Password
              </Text>
            </Button>
          </View>
        </Center>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default index;
