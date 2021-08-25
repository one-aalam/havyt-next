import { NextPage } from 'next'
import Layout from '~/components/Layout'
import withUrqlClient from '~/lib/graphql/client'
import RecipeList from '~/components/recipes/RecipeList'

const RecipeCategoryIndexPage: NextPage = () => {
  return (
    <Layout>
      <div className="w-full">
        <main className="w-2/4 mx-auto">
            <h1>All the Recipes</h1>
            <RecipeList />
        </main>
      </div>
    </Layout>
  )
}

export default withUrqlClient(RecipeCategoryIndexPage)
