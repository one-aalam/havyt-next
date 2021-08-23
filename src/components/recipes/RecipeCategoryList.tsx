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
        <ul className="grid grid-flow-row grid-cols-3 gap-6">
          {data?.allRecipeCategories.map(recipeCategory => (
            <li className="" key={recipeCategory.id}>
                <div className="grid place-items-center">
                    <div className="avatar hover-bordered">
                        <div className="w-24 h-24 mask mask-squircle mb-2">
                            <img src="https://images.unsplash.com/photo-1612392061787-2d078b3e573c?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=94&q=80" />
                        </div>
                    </div>
                    <h3 className="text-xl">{recipeCategory.name}</h3>
                </div>
            </li>
          ))}
        </ul>
      </div>
    )
}

export default RecipeCategoryList
