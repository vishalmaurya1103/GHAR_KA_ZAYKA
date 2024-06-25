import { Text, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

function HomeScreen() {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>Welcome to Ghar Ka Zayka</Text>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    color: Colors.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
});
