import { NextPage } from 'next'
import { useState } from 'react'
import { withPageAuthRequired, UserProfile } from '@auth0/nextjs-auth0'

import Layout from '~/components/Layout'
import RecipeForm from '~/components/recipes/RecipeForm'
import withUrqlClient from '~/lib/graphql/client'
import { useCreateRecipeMutation, RecipeCreateInput } from '~/lib/graphql/generated/types'
import {  useMessage } from '~/lib/message'

type RecipeNewPageProps = { user: UserProfile };

const RecipeNewPage: NextPage<RecipeNewPageProps> = ({ user }) => {
    const { handleMessage } = useMessage()
    const [ submitting, setSubmitting ] = useState(false)
    const [ _, createRecipe ] = useCreateRecipeMutation()

    const onSubmit = async(data) => {
        setSubmitting(true)
        const { data: recipe }  = await createRecipe({
            data: {
            ...data,
                // @ts-ignore
                serves: parseInt(data.serves), prepTime: parseInt(data.prepTime || 0), cookingTime: parseInt(data.cookingTime),
                ingredients: data.ingredients.split('\n'),
                directions: data.directions.split('\n'),
                userId: user.id
            }
        })
        setSubmitting(false)
        handleMessage({ type: 'success', message: `Saved ${recipe?.createRecipe?.name}`})
    }

  return (
    <Layout>
      <div className="w-full">
        <main className="w-2/4 mx-auto">
            <h1>Create New Recipe</h1>
           <RecipeForm<RecipeCreateInput> defaultValues={{}} submitText="Create Recipe" submitting={submitting} onSubmit={onSubmit} />
        </main>
      </div>
    </Layout>
  )
}

export default withUrqlClient(RecipeNewPage)

export const getServerSideProps = withPageAuthRequired()
