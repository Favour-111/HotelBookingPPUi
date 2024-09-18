import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";
import { Colors } from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { db, storage } from "../fireBase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { uploadBytes } from "firebase/storage";

const admin = () => {
  const [image, setImage] = useState(null);
  const [page, setPage] = useState("register");
  //form state
  const [HotelName, setHotelName] = useState("");
  const [HotelPrice, setHotelPrice] = useState("");
  const [HotelLocation, setHotelLocation] = useState("");
  const [category, setCategory] = useState();
  const [HotelDetails, setHotelDetails] = useState("");
  //loader
  const [loader, setLoader] = useState(false);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  //fire store connection
  const SubmitForm = async () => {
    setLoader(true);
    try {
      let imageURL = image;

      // Upload the image if present
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const StorageRef = ref(storage, "Hotel_images/" + Date.now() + ".jpg");
        await uploadBytes(StorageRef, blob); // Ensure the upload is awaited
        imageURL = await getDownloadURL(StorageRef); // Get the download URL after upload
        blob.close();
      }

      // Now create the Firestore document with the image URL
      const docRef = await addDoc(collection(db, "HotelDB"), {
        HotelName: HotelName,
        HotelPrice: HotelPrice,
        HotelLocation: HotelLocation,
        category: category,
        HotelDetails: HotelDetails,
        image: imageURL,
      });

      console.log("Document written with ID: ", docRef.id);
      Alert.alert("Hotel registered successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
      Alert.alert("Error creating hotel. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView>
      {page === "register" ? (
        <View>
          <View style={{ padding: 10 }}>
            <Text
              style={{
                fontSize: 25,
                marginTop: 20,
                textAlign: "center",
                fontWeight: "900",
                color: "#343131",
              }}
            >
              Register Hotel
            </Text>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView>
              <View style={{ padding: 20, marginBottom: 200 }}>
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      fontWeight: "bold",
                      color: "#343131",
                    }}
                  >
                    Hotel name
                  </Text>
                  <View
                    style={{
                      width: "100% ",
                      backgroundColor: "#1c1c1c10",
                      borderRadius: 10,
                      padding: 20,
                    }}
                  >
                    <TextInput
                      style={{ width: "100%" }}
                      placeholder="input hotel name"
                      value={HotelName}
                      onChangeText={(text) => setHotelName(text)}
                    />
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      fontWeight: "bold",
                      color: "#343131",
                    }}
                  >
                    Hotel Price
                  </Text>
                  <View
                    style={{
                      width: "100% ",
                      backgroundColor: "#1c1c1c10",
                      borderRadius: 10,
                      padding: 20,
                    }}
                  >
                    <TextInput
                      style={{ width: "100%" }}
                      placeholder="input hotel Price"
                      value={HotelPrice}
                      onChangeText={(text) => setHotelPrice(text)}
                    />
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      fontWeight: "bold",
                      color: "#343131",
                    }}
                  >
                    Hotel Location
                  </Text>
                  <View
                    style={{
                      width: "100% ",
                      backgroundColor: "#1c1c1c10",
                      borderRadius: 10,
                      padding: 20,
                    }}
                  >
                    <TextInput
                      style={{ width: "100%" }}
                      placeholder="input hotel location"
                      value={HotelLocation}
                      onChangeText={(text) => setHotelLocation(text)}
                    />
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      fontWeight: "bold",
                      color: "#343131",
                    }}
                  >
                    Hotel Details
                  </Text>
                  <View
                    style={{
                      width: "100% ",
                      backgroundColor: "#1c1c1c10",
                      borderRadius: 10,
                      height: 100,
                      padding: 20,
                    }}
                  >
                    <TextInput
                      style={{ width: "100%" }}
                      placeholder="input hotel Details"
                      value={HotelDetails}
                      onChangeText={(text) => setHotelDetails(text)}
                    />
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      marginBottom: 10,
                      fontWeight: "bold",
                      color: "#343131",
                    }}
                  >
                    Hotel category
                  </Text>
                  <Picker
                    selectedValue={category}
                    onValueChange={(itemValue, itemIndex) =>
                      setCategory(itemValue)
                    }
                  >
                    <Picker.Item label="Newest" value="Newest" />
                    <Picker.Item label="Popular" value="Popular" />
                    <Picker.Item label="5star" value="5star" />
                    <Picker.Item label="TopRated" value="TopRated" />
                  </Picker>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setPage("image");
                  }}
                  style={{
                    backgroundColor: Colors.defaultColor,
                    width: "100%",
                    borderRadius: 20,
                    paddingVertical: 20,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <Text
                    style={{ fontWeight: "900", textTransform: "capitalize" }}
                  >
                    Next
                  </Text>
                  <Feather name="arrow-right" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      ) : (
        <View>
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              onPress={() => {
                setPage("register");
              }}
            >
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ padding: 20, marginTop: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 30 }}>
              Upload Hotel room Image Here
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              pickImage();
            }}
            style={{ padding: 20, marginTop: 20 }}
          >
            {!image ? (
              <View
                style={{
                  padding: 100,
                  backgroundColor: "#1c1c1c10",
                  borderRadius: 50,
                  height: 300,
                }}
              >
                <Ionicons
                  name="bed-outline"
                  style={{ textAlign: "center" }}
                  size={70}
                  color="#787878"
                />
              </View>
            ) : (
              <View>
                <Image
                  source={{ uri: image }}
                  style={{ height: 300, width: "100%", borderRadius: 50 }}
                />
              </View>
            )}
          </TouchableOpacity>
          <View style={{ padding: 20 }}>
            <Text
              style={{
                fontWeight: "bold",
                color: "#C7253E",
              }}
            >
              If image has been uploaded click the button below
            </Text>
          </View>
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              onPress={() => {
                SubmitForm();
              }}
              style={{
                backgroundColor: Colors.defaultColor,
                width: "100%",
                borderRadius: 20,
                paddingVertical: 20,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 15,
              }}
            >
              {loader ? (
                <ActivityIndicator />
              ) : (
                <>
                  <Entypo name="add-to-list" size={24} color="black" />
                  <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                    Create
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default admin;

const styles = StyleSheet.create({});
