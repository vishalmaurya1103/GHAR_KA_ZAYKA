import axios from 'axios';

const API_KEY = 'e244b1ec02d0474c89fb807a7af67a01';
const BASE_URL = 'https://api.spoonacular.com/recipes';

const getRecipesByCategory = async (tags, number = 10) => {
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

