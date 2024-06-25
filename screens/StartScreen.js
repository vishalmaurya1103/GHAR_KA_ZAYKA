import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../constants/Colors";

function StartScreen({navigation}) {

  function onPressHandler(){
    navigation.navigate("LoginScreen");
  }
  return (
    <ImageBackground
      source={require("../assets/images/bgimg1.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.containerFirst}>
        <View style={styles.Textcontainer} >
          <Text style={styles.textFirst}>Let's</Text>
          <Text style={styles.textFirst}>Cooking</Text>
        </View>
        <Text style={styles.textSecond}>Find Best Recipes For Cooking</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={onPressHandler}
        >
          <Text style={styles.buttonText}>Start Cooking</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default StartScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: wp("100%"),
    height: hp("100%"),
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: wp("100%"),
    height: hp("100%"),
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  containerFirst: {
    justifyContent: "center",
    alignItems: "center",
  },
  Textcontainer:{
    marginTop: hp("20%"),
    alignItems: "center",
  },
  textFirst: {
    color: Colors.primaryWhite,
    fontSize: wp("10%"),
    fontWeight: "bold",
  },
  textSecond: {
    color: Colors.primaryWhite,
    color: Colors.primaryWhite,
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginTop: hp("10%"),
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("10%"),
    borderRadius: 25,
    marginTop: hp("10%"),
  },
  buttonText: {
    color: Colors.primaryWhite,
    fontSize: wp("6%"),
    fontWeight: "bold",
  },
});
