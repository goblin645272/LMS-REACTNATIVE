import React, { useState, useEffect, useMemo } from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { VStack, Accordion, HStack, Toast, Button } from "native-base";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlayCircle,
  faBook,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { ScrollView } from "react-native-gesture-handler";
import {
  VdoPlayerView,
  startVideoScreen,
  VdoDownload,
} from "vdocipher-rn-bridge";
const deviceWindow = Dimensions.get("window");

const index = ({ route, navigation }) => {
  const state = useSelector((state) => state.video);
  const getSelection = (availableTracks) => {
    var selected = [];
    selected.push(availableTracks.findIndex((track) => track.type === "audio"));
    selected.push(availableTracks.findIndex((track) => track.type === "video"));
    return selected;
  };

  const enqueueDownload = (otp, playbackInfo) => {
    VdoDownload.getDownloadOptions({ otp, playbackInfo })
      .then(({ downloadOptions, enqueue }) => {
        const selections = getSelection(downloadOptions.availableTracks);
        return enqueue({ selections });
      })
      .then(() =>
        Toast.show({
          title: "Started Downloading Video",
          isClosable: true,
        })
      )
      .catch((errorDescription) => {
        Toast.show({
          title: "Failed to download a Video",
          isClosable: true,
        });
      });
  };

  const removeDownload = (mediaId) => {
    VdoDownload.remove([mediaId]).catch((error) =>
      Toast.show({
        title: "Failed to Delete Video",
        isClosable: true,
      })
    );
  };

  return <ScrollView stickyHeaderIndices={[0]}></ScrollView>;
};

export default index;
