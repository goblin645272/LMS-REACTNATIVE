import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  AlertDialog,
  VStack,
  HStack,
  Divider,
  Button,
  Input,
  Toast,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
const deviceWindow = Dimensions.get("window");
import { ScrollView } from "react-native-gesture-handler";
import { updateProfile } from "../../action/auth";
import css from "./styles";
const styles = StyleSheet.create(css);
import { courseDict, IGST, CGST, SGST } from "../../api/course constants.js";
import { validateCoupons } from "../../action/coupons";
import { useIsFocused } from "@react-navigation/native";
import RazorpayCheckout from "react-native-razorpay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import axios from "axios";
import url from "../../api/url";
import { getProfile, logout } from "../../action/auth";

const index = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const { courseID, plan } = route.params;
  const user = useSelector((state) => state.auth.profile);
  const loading = useSelector((state) => state.auth.loader);
  console.log(user);
  const [gst, setGST] = useState("");
  const [tele, setTele] = useState("");
  const [trading, setTrading] = useState("");
  const [isOpen, setOpen] = useState({ open: false, type: "", confirm: false });
  const dispatch = useDispatch();
  const cancelRef = React.useRef(null);

  const updateGST = () => {
    if (gst.length !== 15) {
      return Toast.show({ title: "Please Enter a Valid GST number" });
    }
    setOpen({ open: true, type: "GST Number", confirm: false });
  };
  const updateTele = () => {
    if (tele.length === 0) {
      return Toast.show({ title: "Please Enter a Valid Telegram ID" });
    }
    setOpen({ open: true, type: "Telegram ID", confirm: false });
  };
  const updateTrading = () => {
    if (trading.length === 0) {
      return Toast.show({ title: "Please Enter a  Valid TradingView ID" });
    }
    setOpen({ open: true, type: "Trading View ID", confirm: false });
  };
  useEffect(() => {
    if (isOpen.confirm) {
      if (isOpen.type === "GST Number") {
        dispatch(updateProfile({ gst_number: gst }));
        setGST("");
        setOpen({ open: false, type: "", confirm: false });
      } else if (isOpen.type === "Telegram ID") {
        dispatch(updateProfile({ telegram_id: tele }));
        setTele("");
        setOpen({ open: false, type: "", confirm: false });
      } else {
        dispatch(updateProfile({ tradingview_id: trading }));
        setTrading("");
        setOpen({ open: false, type: "", confirm: false });
      }
    }
  }, [isOpen, dispatch, setGST, setTele, setOpen]);
  const [coupon, setCoupon] = useState({
    valid: false,
    code: "",
    discount_percent: "",
    discount_amount: "",
    CGST: "",
    SGST: "",
    IGST: "",
    final_amount: "",
  });
  useEffect(() => {
    if (isFocused) {
      setCoupon({
        valid: false,
        code: "",
        discount_percent: "",
        discount_amount: "",
        CGST: "",
        SGST: "",
        IGST: "",
        final_amount: "",
      });
      setOpen({ open: false, type: "", confirm: false });
      setTele("");
      setGST("");
      setTrading("");
    }
  }, [setCoupon, setTele, setOpen, setTrading, isFocused]);

const _displayRazorpay = async() => {
  axios
      .post(
        `${url}/razorpay/payment`,
        {
          courseId: courseID,
          couponCode: coupon.valid ? coupon.code : undefined,
          plan: plan.tier,
        },
        { headers: { Authorization: await AsyncStorage.getItem("token") } }
      )
      .then(function (response) {
        const options = {
          key: "rzp_test_4LrpORafEOFNKL",
          order_id: response.data.id,
          name: "MK Trading School",
          description: courseDict[courseID],
          prefill: {
            email: user.email,
          },
          
        };
        RazorpayCheckout.open(options).then(async (resp)=>{
          setCoupon({
            valid: false,
            code: "",
            discount_percent: "",
            discount_amount: "",
            CGST: "",
            SGST: "",
            IGST: "",
            final_amount: "",
          });
          Toast.show({title: "Please wait for confirmation"});
            if (resp.status?.status === 202) {
              Toast.show(
                {title: "You have successfully enrolled for the course for free"}
              );
              await getProfile(dispatch);
            } else {
              setTimeout( async function() {
                axios
                  .get(
                    `${url}/razorpay/downloadInvoice/${await AsyncStorage.getItem("token")}/${resp.razorpay_order_id}`
                  )
                  .then(async (response) => {
                    Toast.show(
                      {title: "You have successfully enrolled for the course. Please check email for invoice"}
                    );
                    await getProfile(dispatch);
                  })
                  .catch((error) => {
                    alert(
                      `Please wait. If you do not recieve your course within 10 minutes please contact support. Your order Id is ${resp.razorpay_order_id}`
                    );
                  });
              } ,6500)
                
            }
        }).catch((err)=> alert("Payment failed. Please try again"))
      })
      .catch(async function (error) {
        alert(error)
        if (error.response?.status === 401) {
          logout(dispatch);
          Toast.show(
            {title: "You have been logged out.Your MK Trading account is in use on another device"}
          );
        } else if (error.response?.status === 409) {
          Toast.show({title:"You have successfully enrolled for the course"});
        } else {
          Toast.show({title: "Something went wrong.Please try again"});
        }
      });
}

  return (
    <ScrollView style={styles.body}>
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
          {isOpen.type === "GST Number" ? (
            <AlertDialog.Body>
              {`The data you have entered cannot be changed after submission. Please Ensure that the GST Number ${gst} is correct.`}
            </AlertDialog.Body>
          ) : isOpen.type === "Telegram ID" ? (
            <AlertDialog.Body>
              {`The data you have entered cannot be changed after submission. Please Ensure that the Telegram ID ${tele} is correct.`}
            </AlertDialog.Body>
          ) : (
            <AlertDialog.Body>
              {`The data you have entered cannot be changed after submission. Please Ensure that the Trading View ID ${trading} is correct.`}
            </AlertDialog.Body>
          )}
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
                  setOpen((prev) => {
                    return { ...prev, open: false, confirm: true };
                  });
                }}
              >
                Confirm
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <VStack space={5}>
        <VStack space={3}>
          <Text allowFontScaling={false} style={styles.headerText}>Purchase Information</Text>
          <Text allowFontScaling={false} style={styles.smallText}>
            Course : {`${courseDict[courseID]} `}
          </Text>
          <Text allowFontScaling={false} style={styles.smallText}>Plan: {plan.tier}</Text>
          {!coupon.valid ? (
            <>
              {user.state === "Maharashtra" || user.state === "Other" ? (
                <Text allowFontScaling={false} style={styles.smallText}>
                  Total Amount: ₹{plan?.amount}+{" "}
                  {`${(plan?.amount * CGST).toFixed(2)} (CGST ${CGST * 100}%) `}{" "}
                  +{" "}
                  {`${(plan?.amount * SGST).toFixed(2)} (SGST ${SGST * 100}%) `}{" "}
                  = ₹{(plan?.amount + plan?.amount * (CGST + SGST)).toFixed(2)}
                </Text>
              ) : (
                <Text allowFontScaling={false} style={styles.smallText}>
                  Total Amount: ₹{plan?.amount} +{" "}
                  {`${(plan?.amount * IGST).toFixed(2)} (IGST ${IGST * 100}%) `}{" "}
                  = ₹{(plan?.amount + plan?.amount * IGST).toFixed(2)}
                </Text>
              )}
            </>
          ) : coupon.IGST !== "" ? (
            <Text allowFontScaling={false} style={styles.smallText}>
              Total Amount: ₹{plan?.amount} -{" "}
              {`${coupon.discount_amount} ( ${coupon.discount_percent}% )`} +{" "}
              {`${coupon?.IGST} (IGST ${IGST * 100}%) `} = ₹
              {coupon.final_amount}
            </Text>
          ) : (
            <Text allowFontScaling={false} style={styles.smallText}>
              Total Amount: ₹{plan?.amount} -{" "}
              {`${coupon.discount_amount} ( ${coupon.discount_percent}% )`} +{" "}
              {`${coupon?.CGST} (CGST ${CGST * 100}%) `} +
              {`${coupon?.SGST} (SGST ${SGST * 100}%) `} = ₹
              {coupon.final_amount}
            </Text>
          )}
          <Text allowFontScaling={false} style={styles.smallText}>{`Date of Purchase: ${moment(new Date())
                    .format("dddd")
                    .slice(0, 3)}, ${moment(new Date()).format(
                    "Do MMMM YYYY"
                  )}`}</Text>
        </VStack>
        <View>
          <Divider my="1" style={{ backgroundColor: "rgba(2, 36, 96, 1)" }} />
        </View>
        <VStack space={3}>
          <Text allowFontScaling={false} style={styles.headerText}>User Information</Text>
          <Text
            style={styles.smallText}
          >{`User : ${user.firstName} ${user.lastName}`}</Text>
          <Text allowFontScaling={false} style={styles.smallText}>{`User Email: ${user.email}`}</Text>

          {!user?.gst_number ? (
            <>
              <VStack style={styles.inputBox}>
                <Input
                  style={styles.input}
                  value={gst}
                  onChangeText={(text) => {
                    setGST(text);
                  }}
                  placeholder="User GST"
                />
                <Button style={styles.button} onPress={updateGST}>
                  <Text allowFontScaling={false} style={{ color: "#F3C10C" }}>
                    Confirm Your GST number
                  </Text>
                </Button>
              </VStack>
            </>
          ) : (
            <Text
              style={styles.smallText}
            >{`User GST: ${user.gst_number}`}</Text>
          )}

          {!user?.telegramId ? (
            <>
              <VStack style={styles.inputBox}>
                <Input
                  style={styles.input}
                  value={tele}
                  onChangeText={(text) => {
                    setTele(text);
                  }}
                  placeholder="User Telegram"
                />
                <Button style={styles.button} onPress={updateTele}>
                  <Text allowFontScaling={false} style={{ color: "#F3C10C" }}>
                    Confirm Your Telegram ID
                  </Text>
                </Button>
              </VStack>
            </>
          ) : (
            <Text
              style={styles.smallText}
            >{`User Telegram ID: ${user.telegramId}`}</Text>
          )}
          {!user?.tradingviewId ? (
            <>
              <VStack style={styles.inputBox}>
                <Input
                  style={styles.input}
                  placeholder="User Trading View ID"
                  onChangeText={(text) => {
                    setTrading(text);
                  }}
                />
                <Button style={styles.button} onPress={updateTrading}>
                  <Text allowFontScaling={false} style={{ color: "#F3C10C" }}>
                    Confirm Your Trading View ID
                  </Text>
                </Button>
              </VStack>
            </>
          ) : (
            <Text
              style={styles.smallText}
            >{`User Trading View ID: ${user.tradingviewId}`}</Text>
          )}
        </VStack>
        <View>
          <Divider my="1" style={{ backgroundColor: "rgba(2, 36, 96, 1)" }} />
        </View>
        <HStack style={styles.couponBox}>
          <Input
            style={styles.couponInput}
            placeholder="Coupon Code"
            onChangeText={(text) => {
              setCoupon((prev) => {
                return {
                  ...prev,
                  code: text,
                };
              });
            }}
            isDisabled={coupon.valid}
            value={coupon.code}
          />
          {coupon.valid ? (
            <Button
              style={styles.couponValidButton}
              onPress={() => {
                setCoupon((prev) => {
                  return {
                    valid: false,
                    code: "",
                    discount_percent: "",
                    discount_amount: "",
                    CGST: "",
                    SGST: "",
                    IGST: "",
                    final_amount: "",
                  };
                });
              }}
            >
              <Text
                style={{
                  color: "#355080",
                  fontSize: deviceWindow.width * 0.04,
                  fontFamily: "Barlow_600SemiBold",
                }}
              >
                Edit Coupon
              </Text>
            </Button>
          ) : (
            <Button
              style={styles.couponButton}
              onPress={() => {
                if (coupon.code !== "") {
                  dispatch(
                    validateCoupons(
                      coupon.code,
                      courseID,
                      plan.tier,
                      (discount) => {
                        setCoupon((prev) => {
                          return {
                            ...prev,
                            valid: true,
                            discount_percent: discount.discount_percent,
                            discount_amount: discount.discount_amount,
                            CGST: discount.CGST,
                            SGST: discount.SGST,
                            IGST: discount.IGST,
                            final_amount: discount.final_amount,
                          };
                        });
                      },
                      () => {
                        setCoupon(() => {
                          return {
                            valid: false,
                            discount_percent: "",
                            discount_amount: "",
                            CGST: "",
                            SGST: "",
                            IGST: "",
                            final_amount: "",
                            code: "",
                          };
                        });
                      }
                    )
                  );
                }
              }}
            >
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
          )}
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
              onPress={() => {
                if (
                  courseID === "612ccdb59f192c86faa26f4a" &&
                  (!user.telegramId || !user.tradingviewId)
                ) {
                  return Toast.show({
                    title: "This Course Needs a Telegram and TradingView ID",
                    isClosable: true,
                  });
                } else {
                  if (coupon.code !== "" && coupon.valid === false) {
                    Toast.show({
                      title: "Click Apply to validate",
                      isClosable: true,
                    });
                  } else if (gst !== "") {
                    Toast.show({
                      title: "Click Confirm GST to Update GST",
                      isClosable: true,
                    });
                  } else {
                    _displayRazorpay();
                  }
                }
              }}
            >
              Proceed to Pay
            </Text>
          </Button>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10%",
          }}
        ></View>
      </VStack>
    </ScrollView>
  );
};

export default index;
