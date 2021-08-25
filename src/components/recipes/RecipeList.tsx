import { FunctionComponent } from 'react'
import { useGetAllRecipesQuery } from '~/lib/graphql/generated/types'

const RecipeList: FunctionComponent = () => {
    const [ result ] = useGetAllRecipesQuery()

    const { data, fetching, error } = result

    if (fetching) return <p>Loading...</p>

    if (error) return <p>Oh no... {error.message}</p>

    return (
      <div>
        <p>There are {data?.allRecipes.length} recipe(s) in the database:</p>
        <ul className="grid grid-flow-row grid-cols-3 gap-6">
          {data?.allRecipes.map(recipe => (
            <li className="" key={recipe.id}>
                <div className="grid place-items-center">
                    <div className="avatar hover-bordered">
                        <div className="w-24 h-24 mask mask-squircle mb-2">
                            <img src={recipe.imageUrl || 'https://images.unsplash.com/photo-1612392061787-2d078b3e573c?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=94&q=80'} />
                        </div>
                    </div>
                    <a className="text-xl" href={`/recipes/${recipe.id}/edit`}>{recipe.name}</a>
                </div>
            </li>
          ))}
        </ul>
      </div>
    )
}

export default RecipeList
