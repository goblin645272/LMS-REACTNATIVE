import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  Text,
  Image,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { FormControl, Button, Center, Input, VStack } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { signIn } from "../../action/auth";
import css from "./styles";
import { Dimensions } from "react-native";
const deviceWindow = Dimensions.get("window");

const styles = StyleSheet.create(css);
const index = ({ navigation }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const refs = {
    email: useRef(null),
    password: useRef(null),
    button: useRef(null),
  };
  const handleChange = (id, text) => {
    if (errors[id] !== "") {
      setErrors((state) => {
        return { ...state, [id]: undefined };
      });
    }
    setData((state) => {
      return { ...state, [id]: text };
    });
  };
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validate = () => {
    if ( 
      data.email === "" ||
      data.password === "" ||
      !emailRegex.test(data.email)
    ) {
      setErrors((state) => {
        return {
          ...state,
          ...(data.email === "" ? { email: "Email is Required" } : null),
          ...(data.email !== "" && !emailRegex.test(data.email)
            ? { email: "Enter a Valid Email" }
            : null),
          ...(data.password === ""
            ? { password: "Password is Required" }
            : null),
        };
      });
      return true;
    } else {
      return false;
    }
  };
  const submit = async () => {
    setErrors({});   
    const valid = validate();
    if (valid) {
      return;
    }
    dispatch({ type: "LOAD" });
    dispatch(signIn(data));
  };
  const [show, setShow] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView style={styles.scroll}>
        <KeyboardAvoidingView behavior="padding" style={styles.scroll}>
          <ImageBackground
            source={require("../../assets/images/login-background.png")}
            style={styles.background_image}
          >
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
            />
            <View style={styles.login_box}>
              <Text allowFontScaling={false} style={styles.header}>Login</Text>
              <Center flex={1} px="3">
                <VStack space={6} justifyContent="center" alignItems="center">
                  <FormControl isInvalid={"email" in errors}>
                    <Input
                      style={{
                        ...styles.input,
                        ...(errors.email
                          ? { borderColor: "red", borderWidth: 1 }
                          : null),
                      }}
                      placeholder="Email"
                      onChangeText={(text) => handleChange("email", text)}
                      returnKeyType="next"
                      ref={refs.email}
                      onSubmitEditing={() => refs.password.current.focus()}
                    />
                    {"email" in errors ? (
                      <FormControl.ErrorMessage
                        _text={{
                          fontSize: "xs",
                        }}
                      >
                        {errors.email}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>
                  <FormControl
                    isRequired
                    style={
                      errors.password !== undefined
                        ? styles.inputError
                        : styles.input
                    }
                  >
                    <Input
                      type={show ? "text" : "password"}
                      onChangeText={(text) => {
                        handleChange("password", text);
                      }}
                      ref={refs.password}
                      onSubmitEditing={() => submit()}
                      InputRightElement={
                        <Button
                          size="xs"
                          rounded="none"
                          w="1/5"
                          h="full"
                          onPress={() => setShow(!show)}
                          style={{
                            borderColor: "rgba(2,36, 96, 0)",
                            backgroundColor: "rgba(2,36, 96, 0)",
                            borderWidth: 1,
                          }}
                        >
                          {!show ? (
                            <FontAwesomeIcon
                              icon={faEye}
                              style={{
                                width: deviceWindow.width * 0.2,
                                color: "rgb(2, 36, 96)",
                              }}
                              size={deviceWindow.width < 560 ? 20 : 28}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faEyeSlash}
                              style={{
                                width: deviceWindow.width * 0.2,
                                color: "rgb(2, 36, 96)",
                              }}
                              size={deviceWindow.width < 560 ? 20 : 28}
                            />
                          )}
                        </Button>
                      }
                      placeholder="Password"
                    />
                    {"password" in errors ? (
                      <FormControl.ErrorMessage
                        _text={{
                          fontSize: "xs",
                        }}
                      >
                        {errors.password}
                      </FormControl.ErrorMessage>
                    ) : null}
                  </FormControl>
                  <Button
                    onPress={submit}
                    ref={refs.button}
                    style={styles.button}
                  >
                    <Text allowFontScaling={false} style={styles.button_text}>Login</Text>
                  </Button>
                </VStack>
              </Center>
              <Text
                style={styles.register}
                onPress={() => navigation.navigate("Register")}
              >
                Don't have an account?
              </Text>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default index;
