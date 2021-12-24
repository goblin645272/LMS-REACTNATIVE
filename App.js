import { NativeBaseProvider } from "native-base";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoAuthNavigator from "./src/routes/NoAuth";
import AuthNavigator from "./src/routes/Auth";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import io from "socket.io-client"

export default function App() {
  const visible = useSelector((state) => state.loader);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const iocli = io("https://b08a-2409-4041-6ec0-f435-392e-6bc-2206-b63a.ngrok.io")
    const getToken = async () => {
      const data = await AsyncStorage.getItem("token");
      dispatch({ type: "SETTOKEN", data: data });
    };
    getToken();
  }, [dispatch]);
   
    
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
