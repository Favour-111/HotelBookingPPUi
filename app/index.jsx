import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
const index = () => {
  const route = useRouter();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-end",
            width: "100%",
            padding: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => route.push("admin")}
            style={{
              backgroundColor: "#1c1c1c",
              padding: 20,
              borderRadius: 20,
            }}
          >
            <AntDesign name="user" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontFamily: "Montserrat",
              fontSize: "30",
            }}
          >
            Snow
          </Text>
          <Text
            style={{
              fontSize: "40",
              color: Colors.defaultColor,
              fontFamily: "Montserrat",
            }}
          >
            Hotel
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            width: "100%",
            paddingHorizontal: 30,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              route.push("home");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Montserrat",
                color: "white",
              }}
            >
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    backgroundColor: Colors.defaultColor,
    padding: 30,
    width: "100%",
    borderRadius: 20,
  },
});
