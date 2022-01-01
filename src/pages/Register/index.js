import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ImageBackground,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import {
  Toast,
  FormControl,
  VStack,
  Input,
  Button,
  Select,
  HStack,
} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import css from "./styles";
import { countryCode as countryList } from "../../assets/country";
import { SafeAreaView } from "react-native-safe-area-context";
import { generateVerifyOTP, signUp, emailVerifyOTP } from "../../action/auth";
import NetInfo from "@react-native-community/netinfo";

const styles = StyleSheet.create(css);
const statesIndia = [
  "Andaman and Nicobar Island",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Other",
];

const index = ({ navigation }) => {
  NetInfo.fetch().then((state) => {
    !state.isConnected && navigation.navigate("No Internet");
  });
  const dispatch = useDispatch();
  const [keyboard, setKeyboard] = useState(false);
  const [genOTP, setGenOTP] = useState(true);
  const [otp, setOtp] = useState("");
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    password: "",
    phone_number: "",
    state: "Maharashtra",
    countryCode: "+91",
  });
  const [errors, setErrors] = useState({
    first_name: false,
    last_name: false,
    email_id: false,
    password: false,
    phone_number: false,
    state: false,
    otp: false,
  });
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboard(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleOTPSubmit = () => {
    if (otp === "") {
      setErrors((prev) => {
        return { ...prev, otp: true };
      });
      return Toast.show({ title: "OTP cannot be empty" });
    } else {
    }
    dispatch(
      emailVerifyOTP({ otp: otp }, () => {
        dispatch(
          signUp({
            first_name: data.first_name,
            last_name: data.last_name,
            email_id: data.email_id,
            password: data.password,
            phone_number: `${data.countryCode}-${data.phone_number}`,
            state: data.state,
          })
        );
      })
    );
  };

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleSubmit = () => {
    if (data.first_name === "") {
      setErrors((prev) => {
        return { ...prev, first_name: true };
      });
      return Toast.show({
        title: "First Name cannot be Empty",
      });
    } else if (data.last_name === "") {
      setErrors((prev) => {
        return { ...prev, last_name: true };
      });
      return Toast.show({
        title: "Last Name cannot be Empty",
      });
    } else if (data.email_id === "") {
      setErrors((prev) => {
        return { ...prev, email_id: true };
      });
      return Toast.show({
        title: "Email ID cannot be Empty",
      });
    } else if (!emailRegex.test(data.email_id)) {
      setErrors((prev) => {
        return { ...prev, email_id: true };
      });
      return Toast.show({
        title: "Invalid Email ID. Please Enter a Valid Email ID",
      });
    } else if (data.password === "") {
      setErrors((prev) => {
        return { ...prev, password: true };
      });
      return Toast.show({
        title: "Password Cannot be Empty",
      });
    } else if (
      data.phone_number === "" ||
      isNaN(data.phone_number.toString()) ||
      data.phone_number.length !== 10
    ) {
      setErrors((prev) => {
        return { ...prev, phone_number: true };
      });
      return Toast.show({
        title: "Please Enter a Valid Phone Number",
      });
    } else if (data.state === "") {
      setErrors((prev) => {
        return { ...prev, state: true };
      });
      return Toast.show({
        title: "Please Choose a State",
      });
    } else {
      dispatch(
        generateVerifyOTP({ email: data.email_id }, () => {
          setGenOTP(false);
        })
      );
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.scroll}>
        <KeyboardAvoidingView behavior="padding" style={styles.background}>
          <ImageBackground
            source={require("../../assets/images/login-background.png")}
            style={styles.background_image}
          >
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
            />
            <View style={styles.login_box}>
              <Text allowFontScaling={false} style={styles.header}>
                {genOTP ? "Signup" : "Verify OTP"}
              </Text>
              <VStack
                space={3}
                w="100%"
                alignItems="center"
                justifyContent="center"
              >
                {genOTP && (
                  <FormControl style={styles.formControl}>
                    <Input
                      value={data.first_name}
                      onChangeText={(text) => {
                        setData((prev) => {
                          return { ...prev, first_name: text };
                        });
                        setErrors((prev) => {
                          return { ...prev, first_name: false };
                        });
                      }}
                      variant="filled"
                      isFullWidth={true}
                      placeholder="First Name"
                      style={
                        errors.first_name ? styles.inputError : styles.input
                      }
                    />
                  </FormControl>
                )}
                {genOTP && (
                  <FormControl style={styles.formControl}>
                    <Input
                      value={data.last_name}
                      style={
                        errors.last_name ? styles.inputError : styles.input
                      }
                      onChangeText={(text) => {
                        setData((prev) => {
                          return { ...prev, last_name: text };
                        });
                        setErrors((prev) => {
                          return { ...prev, last_name: false };
                        });
                      }}
                      variant="filled"
                      isFullWidth={true}
                      placeholder="Last Name"
                    />
                  </FormControl>
                )}
                {!genOTP && (
                  <FormControl style={styles.formControl}>
                    <Input
                      value={otp}
                      style={errors.otp ? styles.inputError : styles.input}
                      onChangeText={(text) => {
                        setOtp(text);
                        setErrors((prev) => {
                          return { ...prev, otp: false };
                        });
                      }}
                      variant="filled"
                      isFullWidth={true}
                      placeholder="OTP"
                    />
                  </FormControl>
                )}
                {genOTP && (
                  <FormControl style={styles.formControl}>
                    <Input
                      variant="filled"
                      isFullWidth={true}
                      placeholder="Email"
                      style={errors.email_id ? styles.inputError : styles.input}
                      onChangeText={(text) => {
                        setData((prev) => {
                          return { ...prev, email_id: text };
                        });
                        setErrors((prev) => {
                          return { ...prev, email_id: false };
                        });
                      }}
                    />
                  </FormControl>
                )}
                {genOTP && (
                  <FormControl style={styles.formControl}>
                    <Input
                      value={data.password}
                      style={errors.password ? styles.inputError : styles.input}
                      onChangeText={(text) => {
                        setData((prev) => {
                          return { ...prev, password: text };
                        });
                        setErrors((prev) => {
                          return { ...prev, password: false };
                        });
                      }}
                      variant="filled"
                      isFullWidth={true}
                      placeholder="Password"
                      type="password"
                    />
                  </FormControl>
                )}
                {genOTP && (
                  <FormControl
                    style={
                      errors.countryCode
                        ? {
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderColor: "#3F51B5",
                            borderRadius: 4,
                            width: wp("70%"),
                          }
                        : {
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderColor: "#3F51B5",
                            borderRadius: 4,
                            width: wp("70%"),
                          }
                    }
                  >
                    <Select
                      minWidth={wp("70%")}
                      placeholder="Country Code"
                      variant="unstyled"
                      onValueChange={(value) => {
                        setData((prev) => {
                          return { ...prev, countryCode: value };
                        });
                        setErrors((prev) => {
                          return { ...prev, countryCode: false };
                        });
                      }}
                      selectedValue={data.countryCode}
                    >
                      {countryList.map((item, index) => {
                        return (
                          <Select.Item
                            key={index * 0.357}
                            label={`${item.name} ${item.dial_code}`}
                            value={item.dial_code}
                          />
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
                {genOTP && (
                  <FormControl style={styles.formControl}>
                    <Input
                      style={
                        errors.phone_number ? styles.inputError : styles.input
                      }
                      onChangeText={(text) => {
                        setData((prev) => {
                          return { ...prev, phone_number: text };
                        });
                        setErrors((prev) => {
                          return { ...prev, phone_number: false };
                        });
                      }}
                      placeholder="Phone Number"
                    />
                  </FormControl>
                )}
                {genOTP && (
                  <FormControl
                    style={
                      errors.state
                        ? {
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderColor: "#3F51B5",
                            borderRadius: 4,
                            width: wp("70%"),
                          }
                        : {
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderColor: "#3F51B5",
                            borderRadius: 4,
                            width: wp("70%"),
                          }
                    }
                  >
                    <Select
                      minWidth={wp("70%")}
                      placeholder="State"
                      variant="unstyled"
                      onValueChange={(value) => {
                        setData((prev) => {
                          return { ...prev, state: value };
                        });
                        setErrors((prev) => {
                          return { ...prev, state: false };
                        });
                      }}
                      selectedValue={data.state}
                    >
                      {statesIndia.map((item, index) => {
                        return (
                          <Select.Item
                            key={index * 0.357}
                            label={item}
                            value={item}
                          />
                        );
                      })}
                    </Select>
                  </FormControl>
                )}

                {genOTP ? (
                  <Button
                    style={styles.button}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    <Text allowFontScaling={false} style={styles.button_text}>
                      Generate OTP
                    </Text>
                  </Button>
                ) : (
                  <Button
                    style={styles.button}
                    onPress={() => {
                      handleOTPSubmit();
                    }}
                  >
                    <Text allowFontScaling={false} style={styles.button_text}>
                      Verify OTP
                    </Text>
                  </Button>
                )}
              </VStack>
              <Text
                style={styles.register}
                onPress={() => navigation.navigate("Login")}
              >
                Already have an account?
              </Text>
              <HStack>
                <Text
                  style={styles.tnc}
                  onPress={() => navigation.navigate("TnC")}
                >
                  Terms & Conditions
                </Text>
                <Text
                  style={styles.tnc}
                  onPress={() => navigation.navigate("Privacy Policy")}
                >
                  Privacy Policy
                </Text>
                <Text
                  style={styles.tnc}
                  onPress={() => navigation.navigate("RefundPolicy")}
                >
                  Refund & Cancellation Policy
                </Text>
              </HStack>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
