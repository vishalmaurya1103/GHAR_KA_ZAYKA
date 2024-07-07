import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Colors } from '../constants/Colors';

const RecipeCard = ({ image, title, readyInMinutes, veryPopular }) => (
  <View style={styles.recipeCard}>
    <Image source={{ uri: image }} style={styles.recipeImage} />
    <View style={styles.recipeInfo}>
      <Text style={styles.recipeTitle}>{title}</Text>
      <View style={styles.recipeDetails}>
        <Text style={styles.recipeDetail}>Time: {readyInMinutes} mins</Text>
        <Text style={styles.recipeDetail}>Difficulty: {veryPopular ? 'Easy' : 'Medium'}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  recipeCard: {
    backgroundColor: Colors.primaryWhite,
    marginBottom: hp('2%'), 
    borderRadius: wp('4%'), 
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.primaryBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  recipeImage: {
    width: '100%',
    height: hp('30%'), 
    resizeMode: 'cover',
  },
  recipeInfo: {
    padding: wp('4%'), 
  },
  recipeTitle: {
    fontSize: RFPercentage(2.5), 
    fontWeight: 'bold',
    marginBottom: hp('1%'), 
    color: Colors.primary,
  },
  recipeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },
  recipeDetail: {
    fontSize: RFPercentage(2),
    color: '#555',
  },
});

export default RecipeCard;
