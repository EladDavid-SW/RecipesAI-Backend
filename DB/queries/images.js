async function getAllRecipes() {
  const recipes = client.db('recipes').collection('recipes');
  const allRecipes = await recipes.find().toArray();
  return allRecipes;
}

module.exports = {
  getAllRecipes,
};
