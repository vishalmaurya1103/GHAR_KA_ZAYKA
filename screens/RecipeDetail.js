import React, { useState, useEffect } from "react";
import { Text, Image, StyleSheet, ScrollView, View } from "react-native";
import { Colors } from "../constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import IngredientsList from "../components/IngredientsList";
import InstructionsList from "../components/InstructionsList";
import NutritionInfo from "../components/NutritionInfo";
import RecipeInfoItem from "../components/RecipeInfoItem";
import IconButton from "../components/IconButton";
import { useFavorites } from "../context/FavoriteContext";
import RecipeDescription from "../components/RecipeDescription";  

const RecipeDetail = ({ route, navigation }) => {
  const { recipe } = route.params || {};
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(recipe.id));
  }, [recipe.id, isFavorite]);

  const changeFavoriteStatusHandler = () => {
    if (isFav) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
    setIsFav(!isFav);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={changeFavoriteStatusHandler}
          icon={isFav ? "heart" : "heart-outline"}
          color="#f50909"
          size={24}
        />
      ),
    });
  }, [navigation, changeFavoriteStatusHandler, isFav]);

  if (!recipe || Object.keys(recipe).length === 0) {
    return <Text>Loading recipe...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.image || '' }} style={styles.image} />
      <Text style={styles.title}>{recipe.title || 'No Title'}</Text>

      <View style={styles.infoGrid}>
        <RecipeInfoItem icon="watch-later" text={`${recipe.readyInMinutes || 0} mins`} />
        <RecipeInfoItem icon="category" text={recipe.category || 'Unknown'} />
        <RecipeInfoItem icon="local-fire-department" text={recipe.veryPopular ? 'Easy' : 'Medium'} />
        <RecipeInfoItem icon="local-dining" text={recipe.vegetarian ? 'Vegetarian' : 'Non-Vegetarian'} />
        <RecipeInfoItem icon="people" text={`${recipe.servings || 0} servings`} />
        <RecipeInfoItem icon="fitness-center" text={`Calories: ${recipe.calories || 0} kcal`} />
      </View>

      <RecipeDescription description={recipe.summary || 'No Description Available'} />

      <IngredientsList ingredients={recipe.extendedIngredients || []} />
      <InstructionsList instructions={recipe.analyzedInstructions?.[0]?.steps || []} />
      <NutritionInfo recipe={recipe} />

      <View style={{ marginBottom: hp('5%') }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryWhite,
    padding: wp('5%'),
  },
  image: {
    width: '100%',
    height: hp('30%'),
    resizeMode: 'cover',
    borderRadius: wp('2%'),
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    marginVertical: hp('2%'),
    color: Colors.primary,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: hp('2%'),
  },
});

export default RecipeDetail;
