import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  KeyboardAvoidingView,
  View,
} from "react-native";
import {
  FormControl,
  VStack,
  Input,
  TextArea,
  Button,
  Select,
} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LinearGradient from 'react-native-linear-gradient';;
import css from "./styles";
import { countryCode } from "../../assets/country";
import { ScrollView } from "react-native-gesture-handler";
const styles = StyleSheet.create(css);

const index = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    country_code: "",
    phone_number: "",
    description: "",
  });

  const handleChange = (value, name) => {
    setData((state) => {
      return { ...state, [name]: value };
    });
  };

  return (
    <View style={styles.scroll}>
      <ScrollView style={styles.scroll}>
        <KeyboardAvoidingView behavior="padding" style={styles.background}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 2 }}
            colors={["#83eaf1", "#1d70f5"]}
            style={styles.background}
          >
            <VStack space={6} justifyContent="center" alignItems="center">
              <Text style={styles.header}>Contact Us</Text>
              <Input
                placeholder="Name"
                placeholderTextColor="#022460"
                style={styles.input}
                onChangeText={(text) => handleChange(text, "name")}
                isFullWidth={true}
              />
              <Input
                placeholder="Email"
                placeholderTextColor="#022460"
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
                >
                  <FlatList
                    data={countryCode}
                    renderItem={(obj, index) => {
                      return (
                        <Select.Item
                          label={`${obj.item.name} ${obj.item.dial_code}`}
                          value={obj.item.dial_code}
                        />
                      );
                    }}
                    keyExtractor={(item, index) => {
                      return index;
                    }}
                  />
                </Select>
              </FormControl>
              <Input
                placeholder="Mobile Number"
                onChangeText={(text) => handleChange(text, "phone_number")}
                placeholderTextColor="#022460"
                style={styles.input}
                isFullWidth={true}
              />
              <TextArea
                placeholderTextColor="#022460"
                onChangeText={(text) => handleChange(text, "description")}
                style={styles.input}
                h={125}
                placeholder="Description"
                w={{
                  base: "70%",
                  md: "25%",
                }}
              />
              <Button style={styles.button}>
                <Text style={styles.button_text}>Submit</Text>
              </Button>
            </VStack>
          </LinearGradient>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default index;
