import axios from 'axios';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { 
  API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5, 
  API_KEY_6, API_KEY_7, API_KEY_8, API_KEY_9, API_KEY_10,
  API_KEY_11, API_KEY_12, API_KEY_13, API_KEY_14, API_KEY_15,
  API_KEY_16, API_KEY_17, API_KEY_18, API_KEY_19, API_KEY_20
} from '@env';

const BASE_URL = 'https://api.spoonacular.com/recipes';
const isFirebaseImageUrl = (url) => url && url.startsWith('https://firebasestorage.googleapis.com/');

const API_KEYS = [
  API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5,
  API_KEY_6, API_KEY_7, API_KEY_8, API_KEY_9, API_KEY_10,
  API_KEY_11, API_KEY_12, API_KEY_13, API_KEY_14, API_KEY_15,
  API_KEY_16, API_KEY_17, API_KEY_18, API_KEY_19, API_KEY_20
];

let currentApiKeyIndex = 0;
const getApiKey = () => API_KEYS[currentApiKeyIndex];

const switchApiKey = () => {
  currentApiKeyIndex = (currentApiKeyIndex + 1) % API_KEYS.length;
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const exponentialBackoff = async (retries, baseDelay = 1000, jitter = true) => {
  if (retries === 0) throw new Error('Max retries reached');
  const delayTime = baseDelay * Math.pow(2, 3 - retries);
  const finalDelay = jitter ? delayTime + Math.random() * baseDelay : delayTime;
  await delay(finalDelay);
};

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
      await exponentialBackoff(retries);
      return getRecipesByCategory(tags, number, retries - 1);
    } else if (retries > 1) {
      await exponentialBackoff(retries);
      return getRecipesByCategory(tags, number, retries - 1);
    } else {
      console.error(`Error fetching ${tags} recipes:`, error);
      return [];
    }
  }
};

const searchRecipes = async (queryText, location = '', retries = 3) => {
  const endpoint = `${BASE_URL}/complexSearch?apiKey=${getApiKey()}&query=${queryText}`;
  
  try {
    const response = await axios.get(endpoint);
    const apiResults = response.data.results || [];

    const detailedResults = await Promise.all(
      apiResults.map(async (recipe) => {
        const detailsEndpoint = `${BASE_URL}/${recipe.id}/information?apiKey=${getApiKey()}`;
        try {
          const detailsResponse = await axios.get(detailsEndpoint);
          
          return { 
            ...recipe, 
            ...detailsResponse.data,
            image: detailsResponse.data.image || null 
          };
        } catch (error) {
          console.error(`Error fetching details for recipe ID ${recipe.id}:`, error);
          return recipe;  
        }
      })
    );
    const firebaseResults = await fetchRecipesFromFirebase(queryText);

    const filteredFirebaseResults = firebaseResults
      .filter(recipe => {
        const matchesLocation = !location || recipe.location === location;
        const matchesQuery = !queryText || recipe.title.toLowerCase().includes(queryText.toLowerCase()) || recipe.description.toLowerCase().includes(queryText.toLowerCase());
        return matchesLocation && matchesQuery;
      });

    const processedFirebaseResults = filteredFirebaseResults.map((recipe) => {
      let imageUrl = recipe.photo || recipe.image;  
      if (!imageUrl || !isFirebaseImageUrl(imageUrl)) {
        imageUrl = null;  
      }

      return {
        ...recipe,
        image: imageUrl,  
        cookTime: parseInt(recipe.cookTime, 10) || 0,
        servings: parseInt(recipe.servings, 10) || 0,
        calories: parseInt(recipe.calories, 10) || 0,
        uniqueId: recipe.id  
      };
    });

    return [...detailedResults, ...processedFirebaseResults];

  } catch (error) {
    if (error.response && error.response.status === 402) {
      switchApiKey();
      await exponentialBackoff(retries);
      return searchRecipes(queryText, location, retries - 1);
    } else if (retries > 1) {
      await exponentialBackoff(retries);
      return searchRecipes(queryText, location, retries - 1);
    } else {
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
      await exponentialBackoff(retries);
      return getRecipeDetails(recipeId, retries - 1);
    } else if (retries > 1) {
      await exponentialBackoff(retries);
      return getRecipeDetails(recipeId, retries - 1);
    } else {
      console.error(`Error fetching recipe details for ID ${recipeId}:`, error);
      return {};
    }
  }
};

export { getRecipesByCategory, searchRecipes, getRecipeDetails, fetchRecipesFromFirebase };
