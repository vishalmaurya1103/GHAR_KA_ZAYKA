import React, { createContext, useState, useContext } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (recipe) => {
    setFavorites((prevFavorites) => [...prevFavorites, recipe]);
  };

  const removeFavorite = (recipeId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((recipe) => recipe.id !== recipeId)
    );
  };

  const isFavorite = (recipeId) => {
    return favorites.some((recipe) => recipe.id === recipeId);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
