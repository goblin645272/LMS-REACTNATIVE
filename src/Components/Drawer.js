import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import css from "./styles";
import { Button, Center } from "native-base";
import { logout } from "../action/auth";
const styles = StyleSheet.create(css);

const Drawer = (props) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#BEE6F7", flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <DrawerItem
            style={styles.item}
            labelStyle={styles.label}
            label="Home"
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          />
          <DrawerItem
            style={styles.item}
            labelStyle={styles.label}
            label="Profile"
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
          />
          <DrawerItem
            style={styles.item}
            labelStyle={styles.label}
            label="Blog"
            onPress={() => {
              props.navigation.navigate("Blog");
            }}
          />
          <DrawerItem
            style={styles.item}
            labelStyle={styles.label}
            label="Testimonials"
            onPress={() => {
              props.navigation.navigate("Testimonials");
            }}
          />
          <DrawerItem
            style={styles.item}
            labelStyle={styles.label}
            label="Contact Us"
            onPress={() => props.navigation.navigate("ContactUs")}
          />
          <DrawerItem
            style={styles.item}
            labelStyle={styles.label}
            label="Event Calendar"
            onPress={() => {
              props.navigation.navigate("Event Calendar");
            }}
          />
          <DrawerItem
            style={styles.item}
            labelStyle={styles.label}
            label="Change Password"
            onPress={() => {
              props.navigation.navigate("Change Password");
            }}
          />
          <DrawerItem
            style={styles.item}
            labelStyle={styles.label}
            label="Offline Video"
            onPress={() => {
              props.navigation.navigate("OfflineVideo");
            }}
          />
          <Center>
            <Button
              onPress={async () => {
                await logout(dispatch);
              }}
              style={styles.button}
            >
              <Text allowFontScaling={false} style={styles.buttonText}>
                Log out
              </Text>
            </Button>
          </Center>
        </DrawerContentScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Drawer;
