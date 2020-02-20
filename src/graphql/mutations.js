/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRecipe = `mutation CreateRecipe(
  $input: CreateRecipeInput!
  $condition: ModelRecipeConditionInput
) {
  createRecipe(input: $input, condition: $condition) {
    id
    name
    type
    image
    ingredients
    instructions
  }
}
`;
export const updateRecipe = `mutation UpdateRecipe(
  $input: UpdateRecipeInput!
  $condition: ModelRecipeConditionInput
) {
  updateRecipe(input: $input, condition: $condition) {
    id
    name
    type
    image
    ingredients
    instructions
  }
}
`;
export const deleteRecipe = `mutation DeleteRecipe(
  $input: DeleteRecipeInput!
  $condition: ModelRecipeConditionInput
) {
  deleteRecipe(input: $input, condition: $condition) {
    id
    name
    type
    image
    ingredients
    instructions
  }
}
`;
