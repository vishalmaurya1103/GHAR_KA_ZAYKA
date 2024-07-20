import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Colors } from "../constants/Colors"; 
import { searchRecipes } from "../Backend Api/Api";
import RecipeCard from "../components/RecipeCard"; 

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateSearch = async (searchText) => {
    setSearch(searchText);
    if (searchText.length > 2) {
      setLoading(true);
      setError(null);

      try {
        const results = await searchRecipes(searchText);
        setRecipes(results);
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    } else {
      setRecipes([]);
    }
  };

  const navigateToRecipeDetail = (item) => {
    navigation.navigate("RecipeDetail", { recipe: item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>Search</Text>
      <SearchBar
        placeholder="Explore delicious recipes here..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        searchIcon={
          <Ionicons name={"search"} size={20} color={Colors.primaryBlack} />
        }
      />
      {loading && <ActivityIndicator size="large" color={Colors.primary} />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard
            image={item.image}
            title={item.title}
            category="Search Result"
            onPress={() => navigateToRecipeDetail(item)} 
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryWhite,
    paddingTop: hp("6%"),  
    paddingHorizontal: wp("4%"),  
  },
  searchText: {
    fontSize: RFPercentage(4),
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: hp("2%"),  
  },
  searchBarContainer: {
    backgroundColor: Colors.primaryWhite,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: wp("2%"),
    borderTopColor: Colors.primary,
    borderBottomColor: Colors.primary,
    borderLeftColor: Colors.primary,
    borderRightColor: Colors.primary,
    padding: 0,
    margin: 0,
  },
  searchBarInputContainer: {
    backgroundColor: Colors.primaryWhite,
    borderRadius: wp("2%"),
  },
  searchBarInput: {
    fontSize: RFPercentage(2),
    color: Colors.primaryBlack,
  },
  errorText: {
    color: Colors.error,
    fontSize: RFPercentage(2),
    textAlign: "center",
    marginVertical: hp("2%"),  
  },
});

export default SearchScreen;
