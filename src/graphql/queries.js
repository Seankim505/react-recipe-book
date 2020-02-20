/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRecipe = `query GetRecipe($id: ID!) {
  getRecipe(id: $id) {
    id
    name
    type
    image
    ingredients
    instructions
  }
}
`;
export const listRecipes = `query ListRecipes(
  $filter: ModelRecipeFilterInput
  $limit: Int
  $nextToken: String
) {
  listRecipes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      type
      image
      ingredients
      instructions
    }
    nextToken
  }
}
`;
