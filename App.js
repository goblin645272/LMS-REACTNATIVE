import { NativeBaseProvider } from "native-base";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoAuthNavigator from "./src/routes/NoAuth";
import AuthNavigator from "./src/routes/Auth";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import io from "socket.io-client"
import NetInfo from "@react-native-community/netinfo";


export default function App() {
  const visible = useSelector((state) => state.loader);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const iocli = io("https://efd3-2405-201-200d-9062-9dd1-2e22-a9a3-7fa4.ngrok.io")
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
    return (
      <NativeBaseProvider>
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
