import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "expo-router";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { db } from "../../fireBase";
import { doc, getDoc } from "firebase/firestore";
const HotelView = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [hotels, setHotels] = useState([]);
  const [Loader, setLoader] = useState(false);
  console.log(id);
  const navigation = useNavigation();
  const fetchSIngleHotel = async () => {
    try {
      setLoader(true);
      const HotelDocRef = doc(db, "HotelDB", id);
      const HotelDoc = await getDoc(HotelDocRef);
      if (HotelDoc.exists()) {
        setHotels(HotelDoc.data());
        console.log("this is the Hotel  " + HotelDoc.data());
      } else {
        console.log("Hotel not found");
      }
    } catch (error) {
      console.log("this is an err" + error.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchSIngleHotel();
  }, [id]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <ScrollView>
      {!Loader ? (
        <View>
          <View style={{ position: "relative", width: "100%" }}>
            <Image
              source={{ uri: hotels.image }}
              style={{
                width: "100%",
                height: 300,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
              }}
            />
            <View
              style={{
                position: "absolute",
                zIndex: 2,
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 60,
                paddingHorizontal: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
                style={{
                  backgroundColor: "gray",
                  padding: 10,
                  borderRadius: 100,
                }}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: "gray",
                  padding: 10,
                  borderRadius: 100,
                }}
              >
                <Ionicons name="heart-sharp" size={24} color="#B8001F" />
              </View>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 30,
              paddingTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              {hotels.HotelName}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontWeight: "bold", color: "#a3e33a", fontSize: 30 }}
              >
                ${hotels.HotelPrice}
              </Text>
              <Text style={{ color: "#787878" }}>/night</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <FontAwesome6 name="location-dot" size={24} color="#787def" />
              <Text>{hotels.HotelLocation}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <AntDesign name="star" size={24} color="#787def" />
              <Text>4.7 (3242 Reviews)</Text>
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#1c1c1c20",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Ionicons name="bed-outline" size={24} color="black" />
                <Text>2 beds</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <FontAwesome6 name="bath" size={24} color="black" />
                <Text>1 bath</Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <SimpleLineIcons
                  name="size-fullscreen"
                  size={24}
                  color="black"
                />
                <Text>2500 sqft</Text>
              </View>
            </View>
          </View>
          <View style={{ padding: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Description
            </Text>
            <Text
              style={{ marginTop: 10, color: "#787878", fontWeight: "500" }}
            >
              {hotels.HotelDetails}
              <Text style={{ color: "#a3e33a" }}>Read more</Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                backgroundColor: "#1c1c1c10",
                padding: 20,
                borderRadius: 100,
              }}
            >
              <MaterialIcons name="severe-cold" size={24} color="black" />
            </View>
            <View
              style={{
                backgroundColor: "#1c1c1c10",
                padding: 20,
                borderRadius: 100,
              }}
            >
              <FontAwesome6 name="bath" size={24} color="black" />
            </View>
            <View
              style={{
                backgroundColor: "#1c1c1c10",
                padding: 20,
                borderRadius: 100,
              }}
            >
              <MaterialCommunityIcons
                name="desk-lamp"
                size={24}
                color="black"
              />
            </View>
            <View
              style={{
                backgroundColor: "#1c1c1c10",
                padding: 20,
                borderRadius: 100,
              }}
            >
              <MaterialCommunityIcons name="swim" size={24} color="black" />
            </View>
          </View>
          <View style={{ paddingHorizontal: 30, paddingVertical: 30 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: "#181C14",
                alignItems: "center",
                justifyContent: "center",
                padding: 17,
                borderRadius: 20,
                gap: 10,
              }}
            >
              <FontAwesome6 name="calendar" size={24} color="white" />
              <Text style={{ color: "white" }}>Select Rooms -</Text>
              <Text
                style={{
                  color: Colors.defaultColor,
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {hotels.HotelPrice}
                <Text
                  style={{
                    fontWeight: "light",
                    fontSize: 15,
                  }}
                >
                  /Night
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <SafeAreaView>
          <View
            style={{
              width: "100%",
              height: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        </SafeAreaView>
      )}
    </ScrollView>
  );
};

export default HotelView;

const styles = StyleSheet.create({});
