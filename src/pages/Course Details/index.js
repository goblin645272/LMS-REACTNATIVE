import { HStack, ScrollView, VStack } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';;
import css from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
const styles = StyleSheet.create(css);

const index = ({ navigation }) => {
  return (
    <ScrollView style={styles.background}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        style={styles.courseDetails}
        colors={["#E2F500", "#FFB803"]}
      >
        <VStack space={1}>
          <Text style={styles.courseText}>Plan: Platinum</Text>
          <Text style={styles.courseText}>Expires On: 31/12/2021</Text>
          <Text style={styles.courseText}>Sessions Available: 2</Text>
        </VStack>
      </LinearGradient>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        style={styles.progress}
      >
        <Text style={styles.progressText}>Course Progress</Text>
        <Text style={styles.progressPercent}>98%</Text>
      </HStack>
      <View
        style={{
          width: "98%",
          borderRadius: 10,
          height: 10,
          backgroundColor: "#FFC00C",
        }}
      />
      <LinearGradient
        colors={["#1963D5", "#77DDEC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1.5 }}
        style={styles.content}
      >
        <Text style={styles.contentText}>Course Video</Text>
      </LinearGradient>
      <TouchableOpacity onPress={() => navigation.navigate("Course Archive")}>
        <LinearGradient
          colors={["#1963D5", "#77DDEC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 1.5 }}
          style={styles.content}
        >
          <Text style={styles.contentText}>Course Archives & Sessions</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Course Content")}>
        <LinearGradient
          colors={["#1963D5", "#77DDEC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 1.5 }}
          style={styles.content}
        >
          <Text style={styles.contentText}>Course Content</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default index;
