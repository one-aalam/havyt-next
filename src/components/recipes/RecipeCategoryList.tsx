import { FunctionComponent } from 'react'
import { useGetAllRecipeCategoriesQuery } from '~/lib/graphql/generated/types'

const RecipeCategoryList: FunctionComponent = () => {
    const [ result ] = useGetAllRecipeCategoriesQuery()

    const { data, fetching, error } = result

    if (fetching) return <p>Loading...</p>

    if (error) return <p>Oh no... {error.message}</p>

    return (
      <div>
        <p>There are {data?.allRecipeCategories.length} recipe category(s) in the database:</p>
        <ul>
          {data?.allRecipeCategories.map(recipeCategory => (
            <li key={recipeCategory.id}>{recipeCategory.name}</li>
          ))}
        </ul>
      </div>
    )
}

export default RecipeCategoryList
