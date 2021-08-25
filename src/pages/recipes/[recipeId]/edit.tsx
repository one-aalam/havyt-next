import { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '~/components/Layout'
import RecipeForm from '~/components/recipes/RecipeForm'
import withUrqlClient from '~/lib/graphql/client'
import { toRecipeDefaultValues } from '~/lib/utils'
import { useUpdateRecipeMutation , RecipeUpdateInput, useGetRecipeQuery } from '~/lib/graphql/generated/types'
import {  useMessage } from '~/lib/message'


const USER_ID = "00c5b3d4-eb87-4eaa-8a49-f55bb75c410b" // to-be-filled-in-auth-module  (put any valid user Id)

type Modify<T, R> = Omit<T, keyof R> & R;
type RecipeFormUpdateMods = {
    ingredients?: string
    directions?: string
    tags?: string
}
type RecipeFormUpdateInput = Partial<Modify<RecipeUpdateInput, RecipeFormUpdateMods>>

const RecipeEditPage: NextPage = () => {
    const router = useRouter()
    const [ submitting, setSubmitting ] = useState(false)
    const { handleMessage } = useMessage()

    const { recipeId } = router.query
    const [ { fetching, data, error } ] = useGetRecipeQuery({ variables: { id: recipeId as string }})
    const [ l, updateRecipe ] = useUpdateRecipeMutation()

    if (fetching) return <p>Loading...</p>

    if (error) return <p>Oh no... {error.message}</p>

    const onSubmit = async(data) => {
        if(data.__typename) delete data.__typename
        setSubmitting(true)
        const { data: recipe } = await updateRecipe({
            id: recipeId as string,
            data: {
            ...data,
                // @ts-ignore
                serves: parseInt(data.serves), prepTime: parseInt(data.prepTime || 0), cookingTime: parseInt(data.cookingTime),
                ingredients: data.ingredients.split('\n'),
                directions: data.directions.split('\n'),
            }
        })
        setSubmitting(false)
        handleMessage({ type: 'success', message: `Updated ${recipe?.updateRecipe?.name}`})
    }
  return (
    <Layout>
      <div className="w-full">
        <main className="w-2/4 mx-auto">
            <h1>Update Recipe</h1>
            <RecipeForm<RecipeFormUpdateInput> defaultValues={{ ...toRecipeDefaultValues(data.recipe), userId: USER_ID }} submitText="Update Recipe" submitting={submitting} onSubmit={onSubmit} />
        </main>
      </div>
    </Layout>
  )
}

export default withUrqlClient(RecipeEditPage)
