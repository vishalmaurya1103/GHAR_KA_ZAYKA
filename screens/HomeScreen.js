import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getRecipesByCategory, fetchRecipesFromFirebase } from '../Backend Api/Api';
import RecipeCard from '../components/RecipeCard';
import Userinfo from "../components/Userinfo";
import { Colors } from '../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const isFirebaseImageUrl = (url) => url && url.startsWith('https://firebasestorage.googleapis.com/');

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const categories = ['Indian', 'breakfast', 'lunch', 'dinner', 'appetizer', 'main course', 'side dish', 'dessert', 'drink'];
        const [apiRecipes, firebaseRecipes] = await Promise.all([
          Promise.all(categories.map(category => getRecipesByCategory(category, 10))),
          fetchRecipesFromFirebase()
        ]);

        const combinedRecipes = [
          ...apiRecipes.flat(),
          ...firebaseRecipes
        ].map((recipe, index) => {
          let imageUrl = recipe.photo || recipe.image;

          if (isFirebaseImageUrl(imageUrl)) {
            imageUrl = imageUrl;
          } else if (!imageUrl) {
            imageUrl = null;
          }

          const cookTimeFromApi = parseInt(recipe.readyInMinutes, 10);
          const cookTimeFromFirebase = parseInt(recipe.cookTime, 10);

          const cookTime = (!isNaN(cookTimeFromApi) && cookTimeFromApi > 0) ? cookTimeFromApi :
            (!isNaN(cookTimeFromFirebase) && cookTimeFromFirebase > 0) ? cookTimeFromFirebase :
              0;

          return {
            ...recipe,
            image: imageUrl,
            cookTime: cookTime,
            servings: parseInt(recipe.servings, 10) || 0,
            calories: parseInt(recipe.calories, 10) || 0,
            uniqueId: `${recipe.id}-${index}`
          };
        });

        setRecipes(combinedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    loadRecipes();
  }, []);

  const handleChatPress = () => {
    navigation.navigate('Chatbot');
  };

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
      readyInMinutes={item.cookTime}
      veryPopular={item.veryPopular}
      vegetarian={item.vegetarian}
      category={item.category}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    />
  );

  const keyExtractor = (item) => item.uniqueId;

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={keyExtractor}
        ListHeaderComponent={<Userinfo />}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={handleChatPress}>
        <MaterialIcons name="fastfood" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.primaryWhite,
  },
  listContainer: {
    paddingBottom: 100, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    padding: 15,
    elevation: 4,
    zIndex: 100,
  },
});

export default HomeScreen;
