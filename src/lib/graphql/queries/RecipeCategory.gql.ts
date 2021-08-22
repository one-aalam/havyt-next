import { gql } from 'urql'

export const RECIPE_CATEGORIES_QUERY = gql`
  query {
    allRecipeCategories {
        id
        name
    }
  }
`
