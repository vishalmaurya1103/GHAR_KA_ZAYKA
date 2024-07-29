import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Colors } from '../constants/Colors';

const categoryImages = {
  Indian: 'https://png.pngtree.com/png-clipart/20210917/ourmid/pngtree-indian-food-talley-curry-soup-png-image_3929141.jpg',
  Beef: 'https://cdn-icons-png.flaticon.com/512/1592/1592613.png',
  Breakfast: 'https://static.vecteezy.com/system/resources/previews/025/666/608/original/breakfast-outline-icon-design-illustration-food-and-drinks-symbol-on-white-background-eps-10-file-vector.jpg',
  Lunch: 'https://thumbs.dreamstime.com/z/time-lunch-icon-vector-102812659.jpg',
  Italian: 'https://static.vecteezy.com/system/resources/previews/021/499/554/non_2x/italian-cuisine-outline-icons-simple-stock-illustration-stock-vector.jpg',
  Mexican: 'https://cbx-prod.b-cdn.net/COLOURBOX28615862.jpg?width=800&height=800&quality=70',
  Thai: 'https://img.freepik.com/premium-vector/thai-food-pad-thai-illustration-top-view-concept_67394-1029.jpg',
  Chinese: 'https://as1.ftcdn.net/v2/jpg/01/52/73/62/1000_F_152736215_YGWV7PcI5QQ0Wi8pOKbsG80ypx19jNY7.jpg',
  Dinner: 'https://play-lh.googleusercontent.com/1CEV1hJnn8N3S9uSAQp2BDvx2TmQQIgJktRHq3sVRuSP2J1tmxmPdv9lCYAXtsHwhg=w240-h480-rw',
  Vegan: 'https://png.pngtree.com/png-clipart/20220728/original/pngtree-vegan-food-logo-design-with-vegetables-icon-png-image_8422687.png',
  Starter: 'https://cdn-icons-png.flaticon.com/512/362/362272.png',
  Vegetarian: 'https://cbx-prod.b-cdn.net/COLOURBOX61080991.jpg?width=800&height=800&quality=70',
};

const CategoryButtons = ({ categories, onPressCategory, activeCategory }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.button, item === activeCategory ? styles.activeButton : styles.inactiveButton]}
            onPress={() => onPressCategory(item)}
          >
            <Image source={{ uri: categoryImages[item] }} style={styles.image} />
            <Text style={[styles.buttonText, item === activeCategory ? styles.activeButtonText : styles.inactiveButtonText]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginVertical: hp('2%'),
      paddingHorizontal: wp('2%'),
    },
    buttonContainer: {
      alignItems: 'center',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: wp('3%'),
      paddingHorizontal: wp('4%'),
      paddingVertical: hp('1.2%'),
      marginRight: wp('2%'),
      justifyContent: 'center',
      borderColor: Colors.primary,
    },
    activeButton: {
      backgroundColor: Colors.primary,
    },
    inactiveButton: {
      backgroundColor: 'transparent',
    },
    image: {
      width: wp('8%'), 
      height: wp('8%'), 
      marginRight: wp('2%'),
    },
    buttonText: {
      fontSize: RFPercentage(2.2),
      fontWeight: 'bold',
    },
    activeButtonText: {
      color: Colors.primaryWhite,
    },
    inactiveButtonText: {
      color: Colors.primary,
    },
  });
  

export default CategoryButtons;
