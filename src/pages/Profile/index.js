import {
  VStack,
  Input,
  Button,
  HStack,
  Divider,
  AlertDialog,
  Toast,
} from "native-base";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Keyboard, StyleSheet, Text, View, Linking } from "react-native";
import css from "./styles";
import { getProfile, updateProfile } from "../../action/auth";
import { ScrollView } from "react-native-gesture-handler";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { useIsFocused } from "@react-navigation/native";
import { getCertificate } from "../../action/courses";
import { courseDict } from "../../api/course constants";
import { extensionCoupon } from "../../action/coupons";

const index = ({ navigation }) => {
  const styles = StyleSheet.create(css);
  const [change, setChange] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const data = useSelector((state) => state.auth.profile);
  const [isOpen, setOpen] = useState({ open: false, type: "", confirm: false });
  const cancelRef = React.useRef(null);
  const isFocused = useIsFocused();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    telegram_id: "",
    gst_number: "",
    tradingview_id: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFocused) {
      const getData = async () => {
        const data = await dispatch(getProfile(navigation));
        if (data) {
          setCoupons(
            data?.courses?.map((obj) => {
              return { courseId: obj.course_id, couponCode: "" };
            })
          );
          setLoading(false);
        }
      };
      setCoupons([]);
      setLoading(true);
      getData();
    }
  }, [dispatch, isFocused, setCoupons, setLoading]);
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
      {/* <KeyboardAvoidingView behavior="padding" style={styles.scroll}> */}
      <View style={styles.container}>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen.open}
          onClose={() => {
            setOpen({ open: false, type: "", confirm: false });
          }}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>{`Set ${isOpen.type}`}</AlertDialog.Header>
            <AlertDialog.Body>
              The data you have entered cannot be changed after submission.
              Please Ensure that the GST Number is correct.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={() => {
                    setOpen({ open: false, type: "", confirm: false });
                  }}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="danger"
                  onPress={() => {
                    setOpen({ open: false, type: "", confirm: true });
                  }}
                >
                  Confirm
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
        <VStack style={styles.background}>
          <View>
            <Text allowFontScaling={false} style={styles.header}>
              Your Profile
            </Text>
          </View>
          <View>
            <Text allowFontScaling={false} style={styles.label}>
              First Name
            </Text>
            <Input
              value={data?.firstName}
              placeholder="First Name"
              isDisabled={true}
              style={styles.input}
            />
          </View>
          <View>
            <Text allowFontScaling={false} style={styles.label}>
              Last Name
            </Text>
            <Input
              placeholder="Last Name"
              value={data?.lastName}
              isDisabled={true}
              style={styles.input}
            />
          </View>
          <View>
            <Text allowFontScaling={false} style={styles.label}>
              Email
            </Text>
            <Input
              placeholder="First Name"
              value={data?.email}
              isDisabled={true}
              style={styles.input}
            />
          </View>
          <View>
            <Text allowFontScaling={false} style={styles.label}>
              State
            </Text>
            <Input
              placeholder="State"
              value={data?.state}
              isDisabled={true}
              style={styles.input}
            />
          </View>

          <View>
            <Text allowFontScaling={false} style={styles.label}>
              Phone Number
            </Text>
            <Input
              placeholder="Phone Number"
              value={data?.phone_number}
              isDisabled={true}
              style={styles.input}
            />
          </View>
          <View>
            <Text allowFontScaling={false} style={styles.label}>
              GST Number
            </Text>
            <Input
              placeholder="GST Number"
              value={!data?.gst_number ? state.gst_number : data?.gst_number}
              onChangeText={(text) => handleChange("gst_number", text)}
              isDisabled={data?.gst_number ? true : false}
              style={styles.input}
            />
          </View>
          <View>
            <Text allowFontScaling={false} style={styles.label}>
              Telegram Username
            </Text>
            <Input
              value={!data?.telegramId ? state.telegram_id : data?.telegramId}
              onChangeText={(text) => handleChange("telegram_id", text)}
              isDisabled={data?.telegramId ? true : false}
              placeholder="Telegram Username"
              style={styles.input}
            />
          </View>
          <View>
            <Text allowFontScaling={false} style={styles.label}>
              Trading View Username
            </Text>
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
            CLICK HERE to learn how to find your TradingView & Telegram Username
          </Text>

          <Divider my="6" style={{ backgroundColor: "#98B8C6" }} />

          <View style={styles.Courses}>
            <VStack style={{ alignItems: "center", justifyContent: "center" }}>
              <Text allowFontScaling={false} style={styles.CourseHeader}>
                Your Courses
              </Text>
              <VStack style={styles.CoursesContainer} space={3}>
                {!loading &&
                  data?.courses.map((item) => {
                    const handleCoupons = (text) => {
                      setCoupons((state) => {
                        const index = state.findIndex(
                          (ite) => ite.courseId === item.course_id
                        );
                        if (index !== -1) {
                          state[index].couponCode = text;
                        }
                        return [...state];
                      });
                    };
                    const applyCoupon = () => {
                      const data = coupons.find(
                        (ite) => ite.courseId === item.course_id
                      );
                      if (data.couponCode.trim() !== "") {
                        dispatch(
                          extensionCoupon({
                            courseId: data.courseId,
                            couponCode: data.couponCode.trim(),
                          })
                        );
                      } else {
                        Toast.show({
                          title: "Please enter coupon ",
                          isClosable: true,
                        });
                      }
                    };
                    return (
                      <VStack
                        style={styles.card}
                        space={2}
                        key={item.course_id}
                      >
                        <Text
                          allowFontScaling={false}
                          style={styles.CourseName}
                        >
                          Course: {courseDict[item.course_id]}
                        </Text>
                        {item?.percent_completed >= 90 && (
                          <Button
                            style={styles.CourseButton}
                            onPress={() => {
                              dispatch(getCertificate(item.course_id));
                            }}
                          >
                            <Text
                              style={{
                                color: "#022460",
                              }}
                            >
                              DOWNLOAD CERTIFICATE
                            </Text>
                          </Button>
                        )}
                        <Divider
                          my="2"
                          style={{ backgroundColor: "#98B8C6" }}
                        />
                        <Input
                          placeholder="Code"
                          style={styles.CouponInput}
                          onChangeText={handleCoupons}
                        />
                        <Button
                          style={styles.CourseButton}
                          onPress={applyCoupon}
                        >
                          <Text
                            style={{
                              color: "#022460",
                            }}
                          >
                            APPLY EXTENSION COUPON
                          </Text>
                        </Button>
                      </VStack>
                    );
                  })}
              </VStack>
            </VStack>
          </View>
        </VStack>
      </View>
      {/* </KeyboardAvoidingView> */}
    </ScrollView>
  );
};

export default index;
