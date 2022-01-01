import { NativeBaseProvider ,Toast} from "native-base";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoAuthNavigator from "./src/routes/NoAuth";
import AuthNavigator from "./src/routes/Auth";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import messaging from "@react-native-firebase/messaging";
import { Alert, BackHandler } from "react-native";
import CheckVersion from './src/pages/checkVersion';
import { check } from './src/action/auth';

export default function App() {
  const visible = useSelector((state) => state.loader);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [update,setUpdate]=useState(false);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(remoteMessage.notification.title,remoteMessage.notification.body);
    });
    
    const getToken = async () => {
      const data = await AsyncStorage.getItem("token");
      const profile = await AsyncStorage.getItem("profile");
      const data2 = await check();
      if(data2 !== "1.0.0"){
        setUpdate(true);
      }
      dispatch({
        type: "LOGIN",
        data: { result: JSON.parse(profile), token: data },
      });
      setLoading(false);
    };
    getToken();
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Spinner
          visible={true}
          textContent={"Loading..."}
          textStyle={{
            color: "#fecd03",
          }}
          animation="fade"
          overlayColor="rgba(2,36,96,1)"
        />
      ) : (
        !update ? (<NativeBaseProvider>
          <Spinner
            visible={visible}
            textContent={"Loading..."}
            textStyle={{
              color: "#fecd03",
            }}
            animation="fade"
            overlayColor="rgba(2,36,96,1)"
          />
          {!token ? <NoAuthNavigator /> : <AuthNavigator />}
        </NativeBaseProvider>) : (<NativeBaseProvider><CheckVersion /></NativeBaseProvider>)
      )}
    </>
  );
}
