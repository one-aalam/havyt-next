import { gql } from 'urql'

// Naming queries is important - https://bleepcoder.com/graphql-code-generator/713983157/typescript-react-apollo-ts-error-cannot-find-name

const RECIPE_FRAGMENT = gql`
  fragment Recipe_recipe on Recipe {
    id
    name
    description
    ingredients
    directions
    serves
    prepTime
    cookingTime
    cuisine {
        id
        name
    }
    course {
        id
        name
    }
  }
`

export const RECIPE_QUERY = gql`
  query GetAllRecipes {
    allRecipes {
        ...Recipe_recipe
    }
  }
  ${RECIPE_FRAGMENT}
`

export const RECIPE_BY_ID_QUERY = gql`
    query GetRecipe($id: ID!) {
        recipe(id: $id) {
            ...Recipe_recipe
        }
    }
    ${RECIPE_FRAGMENT}
`

export const RECIPE_CREATE_MUTATION = gql`
    mutation createRecipe($data: RecipeCreateInput!) {
        createRecipe(data: $data) {
            ...Recipe_recipe
        }
    }
    ${RECIPE_FRAGMENT}
`

export const RECIPE_UPDATE_MUTATION = gql`
    mutation updateRecipe($id: ID!, $data: RecipeUpdateInput!) {
        updateRecipe(id: $id, data: $data) {
            ...Recipe_recipe
        }
    }
    ${RECIPE_FRAGMENT}
`

export const RECIPE_DELETE_MUTATION = gql`
    mutation deleteRecipe($id: ID!) {
        deleteRecipe(id: $id) {
            ...Recipe_recipe
        }
    }
    ${RECIPE_FRAGMENT}
`
