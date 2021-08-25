import { RecipeCategory, RecipeCategoryType, Recipe, RecipeUpdateInput } from '~/lib/graphql/generated/types'

export const filterRecipeCategoryBy = (type: RecipeCategoryType) => (recipeCategory: RecipeCategory) => recipeCategory.type === type
export const toRecipeCategoryOption = (recipeCategory: RecipeCategory)  => ({ value: recipeCategory.id, label: recipeCategory.name })
export const toRecipeDefaultValues = ({ id, course, cuisine, ingredients, directions, ...rest }) => ({ ...rest, recipeCuisineId: cuisine.id, recipeCourseId: course.id, ingredients: ingredients.join('\n'), directions: directions.join('\n') })
