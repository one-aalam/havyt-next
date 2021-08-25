import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '~/components/Layout'
import withUrqlClient from '~/lib/graphql/client'
import {  useGetRecipeQuery } from '~/lib/graphql/generated/types'

const RecipePage: NextPage = () => {
    const router = useRouter()
    const { recipeId } = router.query
    const [ { fetching, data, error } ] = useGetRecipeQuery({ variables: { id: recipeId as string }})

    if (fetching) return <p>Loading...</p>

    if (error) return <p>Oh no... {error.message}</p>
  return (
    <Layout>
      <div className="w-full">
        <main className="w-2/4 mx-auto">
            <h1>{data.recipe.name}</h1>
        </main>
      </div>
    </Layout>
  )
}

export default withUrqlClient(RecipePage)
