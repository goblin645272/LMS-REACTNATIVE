import { Button, NativeBaseProvider } from "native-base";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoAuthNavigator from "./src/routes/NoAuth";
import AuthNavigator from "./src/routes/Auth";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import io from "socket.io-client"
import NetInfo from "@react-native-community/netinfo";
import PushNotification from "react-native-push-notification";
export default function App() {
  const visible = useSelector((state) => state.loader);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const iocli = io("https://991c-2409-4041-6ec0-f435-f1e1-a51-9147-712.ngrok.io")
    iocli.emit("Add User to Server","ceasowrath@gmail.com")
    const getToken = async () => {
      const data = await AsyncStorage.getItem("token");
      dispatch({ type: "SETTOKEN", data: data });
    };
    getToken();
  }, [dispatch]);

const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    !state.isConnected && navigation.navigate("No Internet")
});
// Unsubscribe
// unsubscribe();


const test = ()=>{
  PushNotification.createChannel(
    {
        channelId: "test-channel",
        channelName: "Test Channel"
    }
)
  PushNotification.localNotification({
    channelId: "test-channel",
  id: 0, 
  title: "My Notification Title", // (optional)
  message: "My Notification Message", // (required)
  picture: "https://www.example.tld/picture.jpg",

});
PushNotification.localNotificationSchedule({
  channelId: "test-channel",
  title: "Alarm",
  message: "You clicked on + 20 seconds ago",
  date: new Date(Date.now() + 20 * 1000),
  allowWhileIdle: true,
});
}
// test();
    return (
      <NativeBaseProvider>
        <Button onPress={test}>Click me</Button>
        <Spinner
          visible={visible}
          textContent={"Loading..."}
          textStyle={{
            color: "#fecd03",
          }}
          animation="fade"
          overlayColor="rgba(2,36,96,0.5)"
        />
        {!token ? <NoAuthNavigator /> : <AuthNavigator />}
      </NativeBaseProvider>
    );
}
