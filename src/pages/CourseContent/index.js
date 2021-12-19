import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { VStack } from "native-base";
import LinearGradient from 'react-native-linear-gradient';;
import { WebView } from "react-native-webview";
import css from "./styles.js";
const styles = StyleSheet.create(css);
import { ScrollView } from "react-native-gesture-handler";
const index = () => {
  return (
    <ScrollView style={styles.scroll}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        colors={["#ffffff", "#cbcbcb"]}
        style={styles.background}
      >
        <VStack style={styles.card}>
          <WebView
            source={{
              uri: "https://docs.google.com/presentation/d/e/2PACX-1vQtTul6rl3SUTAGDKTSqDv1r4Wh362P6L9UPYJDx8vivaZyAAvy-F464L1-8C-sag/embed?start=false&loop=false&delayms=60000",
            }}
            style={{ marginTop: 20, borderRadius: 10 }}
          />
        </VStack>
      </LinearGradient>
    </ScrollView>
  );
};

export default index;
