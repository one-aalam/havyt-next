import { gql } from 'urql'

// Naming queries is important - https://bleepcoder.com/graphql-code-generator/713983157/typescript-react-apollo-ts-error-cannot-find-name
export const RECIPE_CATEGORIES_QUERY = gql`
  query GetAllRecipeCategories {
    allRecipeCategories {
        id
        name
        type
    }
  }
`
