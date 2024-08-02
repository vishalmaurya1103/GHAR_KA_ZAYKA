import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StartScreen from "./screens/StartScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import AddRecipe from "./screens/AddRecipe";
import FavouriteScreen from "./screens/FavouriteScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RecipeDetail from "./screens/RecipeDetail";
import SettingsScreen from "./screens/profile screens/settings";
import { StatusBar } from "expo-status-bar";
import { Colors } from "./constants/Colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { FavoriteProvider } from "./context/FavoriteContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ 
        headerShown: true,
        headerTitle: 'Recipes',
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
    <Stack.Screen 
      name="RecipeDetail" 
      component={RecipeDetail}
      options={{
        headerShown: true,
        headerTitle: 'Recipe Details',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: RFValue(24),
        },
        headerTitleAlign: "center",
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen 
      name="Settings" 
      component={SettingsScreen}  
      options={{ 
        headerTitle: 'Settings',
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
  </Stack.Navigator>
);

const SearchStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="SearchScreen" 
      component={SearchScreen}
      options={{ 
        headerShown: false
      }} 
    />
    <Stack.Screen 
      name="RecipeDetail" 
      component={RecipeDetail}
      options={{
        headerTitle: 'Recipe Details',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: RFValue(24),
        },
        headerTitleAlign: "center",
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const FavouriteStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="FavouriteScreen" 
      component={FavouriteScreen} 
      options={{ 
        headerShown: true,
        headerTitle: 'Favourite Recipes',
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
    <Stack.Screen 
      name="RecipeDetail" 
      component={RecipeDetail}
      options={{
        headerTitle: 'Recipe Details',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: RFValue(24),
        },
        headerTitleAlign: "center",
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const ProfileStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ProfileScreen" 
      component={ProfileScreen}
      options={{ 
        headerShown: false,
      }} 
    />
    <Stack.Screen 
      name="Settings" 
      component={SettingsScreen}
      options={{
        headerTitle: 'Settings',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: RFValue(24),
        },
        headerTitleAlign: "center",
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const BottomTabNavigator = () => (
  <BottomTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        const iconSize = focused ? RFValue(size + 12) : RFValue(size + 3);
        const iconVariant = focused ? "" : "-outline";

        switch (route.name) {
          case "Recipes":
            iconName = "local-dining";
            break;
          case "Search":
            iconName = "search";
            break;
          case "Add Recipe":
            iconName = `add-circle${iconVariant}`;
            break;
          case "Favourite Recipe":
            iconName = `favorite${iconVariant}`;
            break;
          case "Profile":
            iconName = `person${iconVariant}`;
            break;
        }

        return <MaterialIcons name={iconName} size={iconSize} color={color} />;
      },
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: Colors.primaryWhite,
      },
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.primarylight,
    })}
  >
    <BottomTab.Screen
      name="Recipes"
      component={HomeStackNavigator}
      options={{ headerShown: false }}
    />
    <BottomTab.Screen 
      name="Search" 
      component={SearchStackNavigator} 
      options={{ headerShown: false }} 
    />
    <BottomTab.Screen 
      name="Add Recipe" 
      component={AddRecipe} 
    />
    <BottomTab.Screen
      name="Favourite Recipe"
      component={FavouriteStackNavigator}
      options={{ headerShown: false }}
    />
    <BottomTab.Screen 
      name="Profile" 
      component={ProfileStackNavigator} 
      options={{ headerShown: false }}
    />
  </BottomTab.Navigator>
);

const MainAppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="MainApp"
      component={BottomTabNavigator}
      options={{ headerShown: false }}
    />
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
);

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  if (isLoading) {
    return null; 
  }

  return (
    <FavoriteProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <MainAppNavigator />
      </NavigationContainer>
    </FavoriteProvider>
  );
}
