import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { db } from "../../fireBase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const router = useRouter();
  const [hotel, setHotel] = useState([]);
  const [loader, setLoader] = useState(false);
  const [activeHotelType, setActiveHotelType] = useState("Newest");
  const [hotelTypes, setHotelTypes] = useState([
    { id: "1", name: "Newest", active: true },
    { id: "2", name: "Popular", active: false },
    { id: "3", name: "5star", active: false },
    { id: "4", name: "TopRated", active: false },
  ]);

  // Update the active hotel type
  const toggleActive = (id) => {
    const selectedType = hotelTypes.find((type) => type.id === id).name;
    setActiveHotelType(selectedType);

    // Update the hotelTypes state to reflect the active status
    setHotelTypes((prevTypes) =>
      prevTypes.map((type) =>
        type.id === id ? { ...type, active: true } : { ...type, active: false }
      )
    );
  };

  const ViewSingleHotel = (itemId) => {
    router.push(`/View/${itemId}`);
  };

  const fetchHotel = async () => {
    try {
      setLoader(true);
      const HotelCollection = collection(db, "HotelDB");
      const userSnapShot = await getDocs(HotelCollection);
      const HotelList = userSnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHotel(HotelList);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.userIcon}>
              <TouchableOpacity onPress={() => router.push("admin")}>
                <AntDesign name="user" size={15} color="white" />
              </TouchableOpacity>
            </View>
            <Text>Mei Nagano</Text>
            <View style={styles.location}>
              <Ionicons name="location-sharp" size={24} color="#787def" />
              <Text style={styles.locationText}>Kyoto, Japan</Text>
            </View>
          </View>
          <EvilIcons name="bell" size={30} color="black" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Let's Find The Best Hotel</Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={24} color="black" />
              <TextInput placeholder="Search" style={styles.searchInput} />
            </View>
            <AntDesign name="wifi" size={24} color="black" />
          </View>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended Hotel</Text>
          <Text style={styles.sectionAction}>See All</Text>
        </View>
        {!loader ? (
          <FlatList
            data={hotel.filter((data) => data.category === "Newest")}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => ViewSingleHotel(item.id)}
                  style={styles.hotelCard}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.hotelImage}
                  />
                  <View style={styles.hotelDetails}>
                    <Text style={styles.hotelName}>{item.HotelName}</Text>
                    <View style={styles.hotelPriceContainer}>
                      <Text style={styles.hotelPrice}>${item.HotelPrice}</Text>
                      <Text>/day</Text>
                    </View>
                  </View>
                  <View style={styles.hotelLocationContainer}>
                    <Ionicons name="location-sharp" size={24} color="#787def" />
                    <Text style={styles.hotelLocation}>
                      {item.HotelLocation}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <ActivityIndicator />
        )}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Most Popular</Text>
          <Text style={styles.sectionAction}>View All</Text>
        </View>
        <FlatList
          data={hotelTypes}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => toggleActive(item.id)}
              style={[
                styles.hotelTypeButton,
                {
                  backgroundColor: item.active
                    ? Colors.defaultColor
                    : "#f0f0f0",
                },
              ]}
            >
              <Text style={styles.hotelTypeText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <View>
          {!loader ? (
            <FlatList
              data={hotel.filter((data) => data.category === activeHotelType)}
              style={{ padding: 20 }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => ViewSingleHotel(item.id)}
                    style={{ marginVertical: 10 }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        borderRadius: 20,
                      }}
                      height={200}
                      border
                      width="100%"
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        color: "#787878",
                        textTransform: "capitalize",
                        marginTop: 20,
                      }}
                    >
                      {item.HotelName}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  userIcon: {
    backgroundColor: "#787878",
    width: 50,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#1c1c1c20",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
  locationText: {
    fontWeight: "bold",
    color: "#787878",
  },
  titleContainer: {
    padding: 20,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 10,
    // fontFamily: "Montserrat",
  },
  searchContainer: {
    paddingHorizontal: 10,
  },
  searchBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#1c1c1c07",
  },
  searchInputContainer: {
    flexDirection: "row",
    gap: 10,
  },
  searchInput: {
    width: "70%",
  },
  sectionHeader: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 15,
  },
  sectionAction: {
    color: Colors.defaultColor,
    fontWeight: "bold",
  },
  hotelsContainer: {
    padding: 5,
    flexDirection: "row",
    gap: 10,
  },
  hotelCard: {
    width: 185,
    borderRadius: 20,
    padding: 0,
    marginLeft: 20,
    shadowColor: "#1c1c1c10",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    shadowOpacity: 2,
    backgroundColor: "white",
  },
  hotelImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  hotelDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  hotelName: {
    fontWeight: "bold",
  },
  hotelPriceContainer: {
    flexDirection: "row",
  },
  hotelPrice: {
    fontWeight: "bold",
  },
  hotelLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    padding: 10,
  },
  hotelLocation: {
    fontWeight: "bold",
    color: Colors.defaultColor,
  },
  hotelTypeButton: {
    marginLeft: 20,
    marginBottom: 30,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#1c1c1c20",
    shadowRadius: 10,
    shadowOpacity: 0.4,
    shadowOffset: { height: 5, width: 1 },
  },
  hotelTypeText: {
    fontWeight: "bold",
  },
});
