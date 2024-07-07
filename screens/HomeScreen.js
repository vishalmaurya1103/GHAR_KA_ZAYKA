import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import fetchRecipes from '../Backend Api/Api';
import RecipeCard from '../components/RecipeCard';

const HomeScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data.recipes); 
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
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderRecipe = ({ item }) => (
    <RecipeCard 
      image={item.image}
      title={item.title}
      readyInMinutes={item.readyInMinutes}
      veryPopular={item.veryPopular}
    />
  );

  return (
    <FlatList
      data={recipes}
      renderItem={renderRecipe}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    padding: 10,
  },
});

export default HomeScreen;
