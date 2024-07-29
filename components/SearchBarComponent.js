import React from 'react';
import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const SearchBarComponent = ({ search, updateSearch }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: Colors.primaryWhite,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 0,
    margin: 0,
    shadowColor: Colors.primaryBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  searchBarInputContainer: {
    backgroundColor: Colors.primaryWhite,
    borderRadius: 10,
  },
  searchBarInput: {
    fontSize: 16,
    color: Colors.primaryBlack,
  },
});

export default SearchBarComponent;
