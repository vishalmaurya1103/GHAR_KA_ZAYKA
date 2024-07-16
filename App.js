import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { firebase } from "./config/firebase";
import StartScreen from "./screens/StartScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import AddRecipe from "./screens/AddRecipe";
import FavouriteScreen from "./screens/FavouriteScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RecipeDetail from "./screens/RecipeDetail"; 
import { StatusBar } from "expo-status-bar";
import { Colors } from "./constants/Colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="RecipeDetail" component={RecipeDetail} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        {user ? (
          <BottomTab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let iconSize = focused ? RFValue(size + 5) : RFValue(size);

                if (route.name === "Recipes") {
                  iconName = "local-dining";
                } else if (route.name === "Search") {
                  iconName = "search";
                } else if (route.name === "Add Recipe") {
                  iconName = "add-circle";
                } else if (route.name === "Favourite Recipe") {
                  iconName = "favorite";
                } else if (route.name === "Profile") {
                  iconName = "person";
                }

                return (
                  <Text
                    style={[
                      styles.tabLabel,
                      { fontWeight: focused ? "bold" : "normal" },
                    ]}
                  >
                    <MaterialIcons
                      name={iconName}
                      size={iconSize}
                      color={color}
                    />
                  </Text>
                );
              },
              tabBarStyle: {
                backgroundColor: Colors.primaryWhite,
                fontWeight: "bold",
                fontSize: RFValue(20),
              },
              tabBarActiveTintColor: Colors.primary,
              tabBarInactiveTintColor: Colors.primarylight,
            })}
          >
            <BottomTab.Screen
              name="Recipes"
              component={HomeStackNavigator}
              options={{
                headerStyle: {
                  backgroundColor: Colors.primaryWhite,
                },
                headerTintColor: Colors.primary,
                headerTitleStyle: {
                  fontWeight: "bold",
                  fontSize: RFValue(24),
                },
                headerTitleAlign: "center",
              }}
            />
            <BottomTab.Screen name="Search" component={SearchScreen} />
            <BottomTab.Screen name="Add Recipe" component={AddRecipe} />
            <BottomTab.Screen
              name="Favourite Recipe"
              component={FavouriteScreen}
            />
            <BottomTab.Screen name="Profile" component={ProfileScreen} />
          </BottomTab.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="StartScreen">
            <Stack.Screen
              name="StartScreen"
              component={StartScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignupScreen"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: RFValue(14),
    textAlign: "center",
    marginBottom: 3,
  },
});
