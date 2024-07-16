// import React from "react";
// import { Text, Image, StyleSheet, ScrollView, View } from "react-native";
// import { Colors } from "../constants/Colors";
// import { RFValue } from "react-native-responsive-fontsize";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// const RecipeDetail = ({ route }) => {
//   const { recipe } = route.params;

//   return (
//     <ScrollView style={styles.container}>
//       <Image source={{ uri: recipe.image }} style={styles.image} />
//       <Text style={styles.title}>{recipe.title}</Text>

//       <View style={styles.infoGrid}>
//         <View style={styles.infoItem}>
//           <MaterialIcons
//             name="watch-later"
//             size={RFValue(24)}
//             color={Colors.primaryBlack}
//           />
//           <Text style={styles.infoText}>{recipe.readyInMinutes} mins</Text>
//         </View>
//         <View style={styles.infoItem}>
//           <MaterialIcons
//             name="category"
//             size={RFValue(24)}
//             color={Colors.primaryBlack}
//           />
//           <Text style={styles.infoText}>{recipe.category}</Text>
//         </View>
//         <View style={styles.infoItem}>
//           <MaterialIcons
//             name="local-fire-department"
//             size={RFValue(24)}
//             color={Colors.primaryBlack}
//           />
//           <Text style={styles.infoText}>
//             {recipe.veryPopular ? "Easy" : "Medium"}
//           </Text>
//         </View>
//         <View style={styles.infoItem}>
//           <MaterialIcons
//             name="local-dining"
//             size={RFValue(24)}
//             color={Colors.primaryBlack}
//           />
//           <Text style={styles.infoText}>
//             {recipe.vegetarian ? "Vegetarian" : "Non-Vegetarian"}
//           </Text>
//         </View>
//         <View style={styles.infoItem}>
//           <MaterialIcons
//             name="people"
//             size={RFValue(24)}
//             color={Colors.primaryBlack}
//           />
//           <Text style={styles.infoText}>{recipe.servings} servings</Text>
//         </View>
//         <View style={styles.infoItem}>
//           <MaterialIcons
//             name="health-and-safety"
//             size={RFValue(24)}
//             color={Colors.primaryBlack}
//           />
//           <Text style={styles.infoText}>
//             Health Score: {recipe.healthScore}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.sectionContainer}>
//         <View style={styles.recipeCard}>
//           <Text style={styles.subtitle}>Ingredients</Text>
//           {recipe.extendedIngredients.map((ingredient, index) => (
//             <View key={index} style={styles.ingredientContainer}>
//               <Text style={styles.bullet}>●</Text>
//               <Text style={styles.ingredient}>{ingredient.original}</Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       <View style={styles.sectionContainer}>
//         <View style={styles.recipeCard}>
//           <Text style={styles.subtitle}>Instructions</Text>
//           {recipe.analyzedInstructions[0]?.steps.map((step, index) => (
//             <View key={index} style={styles.instructionContainer}>
//               <Text style={styles.bullet}>●</Text>
//               <Text style={styles.instruction}>{step.step}</Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       <View style={styles.sectionContainer}>
//         <Text style={styles.subtitle}>Nutritional Information</Text>
//         <View style={styles.recipeCard}>
//           {recipe.calories && (
//             <View style={styles.nutritionRow}>
//               <Text style={styles.nutritionLabel}>Calories:</Text>
//               <Text style={styles.nutritionValue}>{recipe.calories}</Text>
//             </View>
//           )}
//           {recipe.protein && (
//             <View style={styles.nutritionRow}>
//               <Text style={styles.nutritionLabel}>Protein:</Text>
//               <Text style={styles.nutritionValue}>{recipe.protein}g</Text>
//             </View>
//           )}
//           {recipe.fat && (
//             <View style={styles.nutritionRow}>
//               <Text style={styles.nutritionLabel}>Fat:</Text>
//               <Text style={styles.nutritionValue}>{recipe.fat}g</Text>
//             </View>
//           )}
//           {recipe.weightWatcherSmartPoints && (
//             <View style={styles.nutritionRow}>
//               <Text style={styles.nutritionLabel}>
//                 Weight Watcher SmartPoints:
//               </Text>
//               <Text style={styles.nutritionValue}>
//                 {recipe.weightWatcherSmartPoints}
//               </Text>
//             </View>
//           )}
//           {recipe.healthScore && (
//             <View style={styles.nutritionRow}>
//               <Text style={styles.nutritionLabel}>Health Score:</Text>
//               <Text style={styles.nutritionValue}>{recipe.healthScore}</Text>
//             </View>
//           )}
//         </View>
//       </View>
//       <View style={{ marginBottom: hp("5%") }} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.primaryWhite,
//     padding: wp("5%"),
//   },
//   image: {
//     width: "100%",
//     height: hp("30%"),
//     resizeMode: "cover",
//     borderRadius: wp("2%"),
//   },
//   title: {
//     fontSize: RFValue(24),
//     fontWeight: "bold",
//     marginVertical: hp("2%"),
//     color: Colors.primary,
//   },
//   infoGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     marginVertical: hp("2%"),
//   },
//   infoItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: wp("40%"),
//     marginVertical: hp("1%"),
//     padding: wp("2%"),
//     borderWidth: 1,
//     borderColor: Colors.primary,
//     borderRadius: wp("5%"),
//     backgroundColor: "#edf2fb",
//   },
//   infoText: {
//     fontSize: RFValue(12),
//     marginLeft: wp("1%"),
//     color: Colors.primaryBlack,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: RFValue(24),
//     fontWeight: "bold",
//     marginVertical: hp("2%"),
//     color: Colors.primary,
//     textAlign: "center",
//   },
//   ingredientContainer: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginVertical: hp("0.5%"),
//   },
//   bullet: {
//     fontSize: RFValue(20),
//     marginRight: wp("2%"),
//     color: "#333",
//   },
//   ingredient: {
//     fontSize: RFValue(16),
//   },
//   instructionContainer: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginVertical: hp("0.5%"),
//   },
//   instruction: {
//     fontSize: RFValue(16),
//     marginLeft: wp("2%"),
//   },
//   sectionContainer: {
//     marginTop: hp("4%"),
//     marginBottom: hp("2%"),
//   },
//   recipeCard: {
//     backgroundColor: Colors.primaryWhite,
//     borderRadius: wp("4%"),
//     overflow: "hidden",
//     shadowColor: "#1703f3",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//     padding: wp("4%"),
//   },
//   nutritionRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: hp("1%"),
//   },
//   nutritionLabel: {
//     fontSize: RFValue(16),
//     fontWeight: "bold",
//   },
//   nutritionValue: {
//     fontSize: RFValue(16),
//   },
// });

// export default RecipeDetail;

import React from 'react';
import { Text, Image, StyleSheet, ScrollView, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IngredientsList from '../components/IngredientsList';
import InstructionsList from '../components/InstructionsList';
import NutritionInfo from '../components/NutritionInfo';
import RecipeInfoItem from '../components/RecipeInfoItem';

const RecipeDetail = ({ route }) => {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.title}>{recipe.title}</Text>

      <View style={styles.infoGrid}>
        <RecipeInfoItem icon="watch-later" text={`${recipe.readyInMinutes} mins`} />
        <RecipeInfoItem icon="category" text={recipe.category} />
        <RecipeInfoItem icon="local-fire-department" text={recipe.veryPopular ? 'Easy' : 'Medium'} />
        <RecipeInfoItem icon="local-dining" text={recipe.vegetarian ? 'Vegetarian' : 'Non-Vegetarian'} />
        <RecipeInfoItem icon="people" text={`${recipe.servings} servings`} />
        <RecipeInfoItem icon="health-and-safety" text={`Health Score: ${recipe.healthScore}`} />
      </View>

      <IngredientsList ingredients={recipe.extendedIngredients} />

      <InstructionsList instructions={recipe.analyzedInstructions[0]?.steps} />

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
