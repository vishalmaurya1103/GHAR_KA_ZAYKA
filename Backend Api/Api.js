import axios from 'axios';

const API_KEY = '3af5bd672b294f6bb3c82b4a367f0d7d';
const BASE_URL = 'https://api.spoonacular.com/recipes';

const getRecipesByCategory = async (tags, number = 50) => {
  const endpoint = `${BASE_URL}/random?number=${number}&tags=${tags}&apiKey=${API_KEY}`;
  try {
    const response = await axios.get(endpoint);
    return response.data.recipes.map(recipe => ({
      ...recipe,
      category: tags,
    }));
  } catch (error) {
    console.error(`Error fetching ${tags} recipes:`, error);
    throw error;
  }
};

export default getRecipesByCategory;

