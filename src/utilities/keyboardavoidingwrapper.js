import React from "react";

import { Keyboard, TouchableWithoutFeedback, ScrollView } from "react-native";

import { KeyboardAvoidingView } from "native-base";
const index = ({ children }) => {
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset="45">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>{children}</>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default index;
