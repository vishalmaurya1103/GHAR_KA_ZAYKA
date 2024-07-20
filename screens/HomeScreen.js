import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getRecipesByCategory } from '../Backend Api/Api';
import RecipeCard from '../components/RecipeCard';
import Userinfo from "../components/Userinfo";
import { Colors } from '../constants/Colors';

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const categories = ['Indian', 'breakfast', 'lunch', 'dinner', 'appetizer', 'main course', 'side dish', 'dessert', 'drink'];
        const allRecipes = await Promise.all(categories.map(category => getRecipesByCategory(category, 10)));
        const combinedRecipes = allRecipes.flat().map((recipe, index) => ({
          ...recipe,
          uniqueId: `${recipe.id}-${index}` 
        }));
        setRecipes(combinedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
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
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })} 
    />
  );

  const keyExtractor = (item) => item.uniqueId;

  return (
    <FlatList
      data={recipes}
      renderItem={renderRecipe}
      keyExtractor={keyExtractor}
      ListHeaderComponent={<Userinfo />}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.primaryWhite,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
