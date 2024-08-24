import axios from 'axios';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const BASE_URL = 'https://api.spoonacular.com/recipes';

const API_KEYS = [
  '2e5167050da04be69e210666e4e19ff9',
  '0b024b0ad8484fe79d4b9882e32e8e2c',
  '9383df008ca0439ba59a26fdabe354c8',
  'd760f383f93c4214947be0764268411a',
  '41f0c2319b54423b9301972824f740b5',
  'e244b1ec02d0474c89fb807a7af67a01',
  '3af5bd672b294f6bb3c82b4a367f0d7d',
  '2c27d41605124a169d13ff619a65c2ce',
  'e8be6b2d649d45e394c0ce912b17b255',
];

let currentApiKeyIndex = 0;
const getApiKey = () => API_KEYS[currentApiKeyIndex];

const switchApiKey = () => {
  currentApiKeyIndex = (currentApiKeyIndex + 1) % API_KEYS.length;
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchRecipesFromFirebase = async () => {
  try {
    const recipesCollection = collection(db, 'recipes');
    const snapshot = await getDocs(recipesCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching recipes from Firebase:', error);
    return [];
  }
};

const getRecipesByCategory = async (tags, number = 50, retries = 3) => {
  const endpoint = `${BASE_URL}/random?number=${number}&tags=${tags}&apiKey=${getApiKey()}`;
  try {
    const response = await axios.get(endpoint);
    const apiRecipes = response.data.recipes.map(recipe => ({ ...recipe, category: tags })) || [];
    const firebaseRecipes = await fetchRecipesFromFirebase();

    return [...apiRecipes, ...firebaseRecipes];
  } catch (error) {
    if (error.response && error.response.status === 402) {
      switchApiKey();
      if (retries > 0) {
        await delay(1000); 
        return getRecipesByCategory(tags, number, retries - 1); 
      } else {
        console.error('Max retries reached. Could not fetch recipes.');
        return [];
      }
    } else {
      console.error(`Error fetching ${tags} recipes:`, error);
      return [];
    }
  }
};

const searchRecipes = async (query, retries = 3) => {
  const endpoint = `${BASE_URL}/complexSearch?apiKey=${getApiKey()}&query=${query}`;
  try {
    const response = await axios.get(endpoint);
    const results = response.data.results || [];

    const detailedResults = await Promise.all(
      results.map(async (recipe) => {
        const detailsEndpoint = `${BASE_URL}/${recipe.id}/information?apiKey=${getApiKey()}`;
        try {
          const detailsResponse = await axios.get(detailsEndpoint);
          return { ...recipe, ...detailsResponse.data };
        } catch (error) {
          console.error(`Error fetching details for recipe ID ${recipe.id}:`, error);
          return recipe;
        }
      })
    );
    return detailedResults;
  } catch (error) {
    if (error.response && error.response.status === 402) {
      switchApiKey();
      if (retries > 0) {
        await delay(1000); 
        return searchRecipes(query, retries - 1); 
      } else {
        console.error('Max retries reached. Could not search recipes.');
        return [];
      }
    } else {
      console.error(`Error searching recipes for "${query}":`, error);
      return [];
    }
  }
};

const getRecipeDetails = async (recipeId, retries = 3) => {
  try {
    const recipeDocRef = doc(db, 'recipes', recipeId);
    const recipeDoc = await getDoc(recipeDocRef);

    if (recipeDoc.exists()) {
      return { id: recipeDoc.id, ...recipeDoc.data() };
    } else {
      const endpoint = `${BASE_URL}/${recipeId}/information?apiKey=${getApiKey()}`;
      const response = await axios.get(endpoint);

      if (response.data) {
        const { title, summary: description, extendedIngredients, instructions } = response.data;
        const ingredients = extendedIngredients.map(ingredient => ingredient.original);

        return {
          id: recipeId,
          title,
          description,
          ingredients,
          instructions: instructions || 'Instructions not available',
        };
      }

      return {};
    }
  } catch (error) {
    if (error.response && error.response.status === 402) {
      switchApiKey();
      if (retries > 0) {
        await delay(1000); 
        return getRecipeDetails(recipeId, retries - 1); 
      } else {
        console.error('Max retries reached. Could not fetch recipe details.');
        return {};
      }
    } else {
      console.error(`Error fetching recipe details for ID ${recipeId}:`, error);
      return {};
    }
  }
};

export { getRecipesByCategory, searchRecipes, getRecipeDetails, fetchRecipesFromFirebase };
