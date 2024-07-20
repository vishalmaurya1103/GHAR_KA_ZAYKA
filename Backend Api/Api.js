import axios from 'axios';

const API_KEY = 'd760f383f93c4214947be0764268411a';
const BASE_URL = 'https://api.spoonacular.com/recipes';

const getRecipesByCategory = async (tags, number = 50) => {
  const endpoint = `${BASE_URL}/random?number=${number}&tags=${tags}&apiKey=${API_KEY}`;
  try {
    const response = await axios.get(endpoint);
    return response.data.recipes || []; 
  } catch (error) {
    console.error(`Error fetching ${tags} recipes:`, error);
    return []; 
  }
};

const searchRecipes = async (query) => {
  const endpoint = `${BASE_URL}/complexSearch?apiKey=${API_KEY}&query=${query}`;
  try {
    const response = await axios.get(endpoint);
    const results = response.data.results || [];

    const detailedResults = await Promise.all(
      results.map(async (recipe) => {
        const detailsEndpoint = `${BASE_URL}/${recipe.id}/information?apiKey=${API_KEY}`;
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
    console.error(`Error searching recipes for "${query}":`, error);
    return [];
  }
};

const getRecipeDetails = async (recipeId) => {
  const endpoint = `${BASE_URL}/${recipeId}/information?apiKey=${API_KEY}`;
  try {
    const response = await axios.get(endpoint);
    return response.data || {}; 
  } catch (error) {
    console.error(`Error fetching recipe details for ID ${recipeId}:`, error);
    return {};
  }
};

export { getRecipesByCategory, searchRecipes, getRecipeDetails };
