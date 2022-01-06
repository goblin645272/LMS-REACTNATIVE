import { NativeBaseProvider, Toast } from "native-base";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoAuthNavigator from "./src/routes/NoAuth";
import AuthNavigator from "./src/routes/Auth";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import messaging from "@react-native-firebase/messaging";
import { Alert, BackHandler } from "react-native";
import CheckVersion from "./src/pages/checkVersion";
import { check } from "./src/action/auth";
import { VdoDownload } from "vdocipher-rn-bridge";

export default function App() {
  const visible = useSelector((state) => state.loader);
  const token = useSelector((state) => state.auth.token);
  const state = useSelector((state) => state.video);
  console.log(state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body
      );
    });

    const getToken = async () => {
      const data = await AsyncStorage.getItem("token");
      const profile = await AsyncStorage.getItem("profile");
      const data2 = await check();
      if (data2 !== undefined && data2 !== "1.0.0") {
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

  const refreshDownloadList = () => {
    VdoDownload.query()
      .then((statusArray) => {
        dispatch({ type: "UPDATE_VIDEO", data: statusArray });
      })
      .catch((err) => console.log(err));
  };

  const onQueued = (mediaId, downloadStatus) => {
    refreshDownloadList();
  };

  const updateItem = (mediaId, downloadStatus) => {
    const updateIndex = state.downloadStatusArray.findIndex(
      (s) => s.mediaInfo.mediaId === mediaId
    );
    if (updateIndex > -1) {
      let newState = Object.assign({}, state);
      newState.downloadStatusArray[updateIndex] = downloadStatus;
      dispatch({ type: "UPDATE_ALL", data: newState });
    }
  };

  const onChanged = (mediaId, downloadStatus) => {
    updateItem(mediaId, downloadStatus);
  };

  const onCompleted = (mediaId, downloadStatus) => {
    Toast.show({
      title: "Downloaded Video",
      isClosable: true,
    });
    refreshDownloadList();
  };

  const onFailed = (mediaId, downloadStatus) => {
    refreshDownloadList();
  };

  const onDeleted = (mediaId) => {
    Toast.show({
      title: "Video Deleted from Downloads",
      isClosable: true,
    });
    refreshDownloadList();
  };

  useEffect(() => {
    refreshDownloadList();
    const enqueue = VdoDownload.addEventListener(
      "onQueued",
      (mediaId, status) => onQueued(mediaId, status)
    );
    const change = VdoDownload.addEventListener(
      "onChanged",
      (mediaId, status) => onChanged(mediaId, status)
    );
    const complete = VdoDownload.addEventListener(
      "onCompleted",
      (mediaId, status) => onCompleted(mediaId, status)
    );
    const fail = VdoDownload.addEventListener("onFailed", (mediaId, status) =>
      onFailed(mediaId, status)
    );
    const del = VdoDownload.addEventListener("onDeleted", (mediaId) =>
      onDeleted(mediaId)
    );
    dispatch({
      type: "UPDATE_UNREGEISTER",
      data: [enqueue, change, complete, fail, del],
    });
    return () => {
      state.unregister.map((cleanup) => cleanup());
    };
  }, []);

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
      ) : !update ? (
        <NativeBaseProvider>
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
        </NativeBaseProvider>
      ) : (
        <NativeBaseProvider>
          <CheckVersion />
        </NativeBaseProvider>
      )}
    </>
  );
}
