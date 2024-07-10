import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import getRecipesByCategory from '../Backend Api/Api';
import RecipeCard from '../components/RecipeCard';
import Userinfo from "../components/Userinfo";

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const categories = ['appetizer', 'main course', 'side dish', 'dessert', 'drink', 'Indian'];
        const allRecipes = await Promise.all(categories.map(category => getRecipesByCategory(category, 10)));
        const combinedRecipes = allRecipes.flat();
        setRecipes(combinedRecipes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#67629C" />
      </View>
    );
  }

  const renderRecipe = ({ item }) => (
    <RecipeCard 
      image={item.image}
      title={item.title}
      readyInMinutes={item.readyInMinutes}
      veryPopular={item.veryPopular}
      vegetarian={item.vegetarian}
      category={item.category}
    />
  );

  return (
    <FlatList
      data={recipes}
      renderItem={renderRecipe}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={<Userinfo />}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
