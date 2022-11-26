import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

const linearColor = ["#4568dc", "#859ce8"];
const whiteColor = ["#fff", "#fff"];

export default function Button({ title, onPress, isFill }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={linearColor}
        style={styles.button}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
      >
        <LinearGradient
          colors={isFill ? linearColor : whiteColor}
          style={styles.inner}
          start={{ x: 0, y: 0.75 }}
          end={{ x: 1, y: 0.25 }}
        >
          <View style={styles.button}>
            <Text
              style={{
                color: isFill ? "#fff" : "#4568dc",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              {title}
            </Text>
            <Ionicons
              style={{ marginLeft: 10 }}
              name="add-circle-outline"
              size={24}
              color={isFill ? "#fff" : "#4568dc"}
            />
          </View>
        </LinearGradient>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
  },
  button: {
    borderRadius: 30,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    flexDirection: "row",
  },
  inner: {
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    width: 295,
  },
});
