import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Colors } from "../constants/Colors"; 
import { searchRecipes, getRecipesByCategory } from "../Backend Api/Api";
import SearchBarComponent from "../components/SearchBarComponent";
import RecipeListComponent from "../components/RecipeListComponent";
import CategoryButtons from "../components/CategoryButtons";

const categories = [
  "Indian", "Beef", "Breakfast", "Lunch", "Italian", "Mexican", "Thai",
  "Chinese", "Dinner", "Vegan", "Starter", "Vegetarian"
];

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(categories[0]); 

  useEffect(() => {
    if (search === "") {
      fetchCategoryRecipes(activeCategory);
    }
  }, [activeCategory, search]);

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

  const fetchCategoryRecipes = async (category) => {
    setActiveCategory(category);
    setLoading(true);
    setError(null);

    try {
      const results = await getRecipesByCategory(category.toLowerCase());
      setRecipes(results);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const navigateToRecipeDetail = (item) => {
    navigation.navigate("RecipeDetail", { recipe: item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>Search</Text>
      <SearchBarComponent search={search} updateSearch={updateSearch} />
      {search === "" && (
        <>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <CategoryButtons
            categories={categories}
            onPressCategory={fetchCategoryRecipes}
            activeCategory={activeCategory}
          />
        </>
      )}
      <RecipeListComponent
        recipes={recipes}
        loading={loading}
        error={error}
        search={search}
        activeCategory={activeCategory}
        navigateToRecipeDetail={navigateToRecipeDetail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryWhite,
    paddingTop: hp("8%"),  
    paddingHorizontal: wp("4%"),  
  },
  searchText: {
    fontSize: RFPercentage(4),
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: hp("2%"),  
  },
  categoriesTitle: {
    fontSize: RFPercentage(3.5),
    fontWeight: "bold",
    color: Colors.primary,
    marginTop: hp("2%"),
    marginBottom: hp("2%"),
  },
});

export default SearchScreen;
