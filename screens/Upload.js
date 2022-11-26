import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import Button from "../components/Button";
import { uploadReq } from "../api";
import LottieView from "lottie-react-native";

export default function UploadScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [loading, onLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      onLoading(true);
      const image = result?.assets[0];
      const res = await uploadReq(image);

      onLoading(false);
      navigation.navigate("Result", {
        isCamera: false,
        uri: result.uri,
        res,
      });
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      onLoading(true);
      const image = result?.assets[0];
      const res = await uploadReq(image);
      onLoading(false);

      navigation.navigate("Result", {
        isCamera: false,
        uri: result.uri,
        res,
      });
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Camera />
      <Button title="Upload photo" onPress={pickImage} />
      <Button title="Take photo" onPress={openCamera} isFill={true} />
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
        source={
          loading
            ? require("../assets/loading.json")
            : require("../assets/traffic.json")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column-reverse",
    paddingBottom: 200,
  },
  modalBg: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    flex: 1,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
});
