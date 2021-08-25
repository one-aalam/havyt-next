import { FormHTMLAttributes } from 'react'
import { SubmitHandler, DefaultValues } from 'react-hook-form'
import { filterRecipeCategoryBy, toRecipeCategoryOption } from '~/lib/utils'
import { useGetAllRecipeCategoriesQuery, RecipeCategoryType } from '~/lib/graphql/generated/types'
import { Form } from '~/components/form/Form'

interface FormProps<T> extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
    defaultValues?: DefaultValues<T>
    onSubmit: SubmitHandler<T>
    submitText?: string
    submitting?: boolean
}

function RecipeForm<T>({ onSubmit, defaultValues, submitText, submitting = false }: FormProps<T>) {
    const [ result ] = useGetAllRecipeCategoriesQuery()
    const { data, fetching, error } = result
    if (fetching) return <p>Preparing the form...</p>
    if (error) return <p>Oh no... {error.message}</p>

    const cuisines = data.allRecipeCategories.filter(filterRecipeCategoryBy(RecipeCategoryType.Cuisine)).map(toRecipeCategoryOption)
    const courses = data.allRecipeCategories.filter(filterRecipeCategoryBy(RecipeCategoryType.Course)).map(toRecipeCategoryOption)

    return (
      <Form<T> form={{ defaultValues }} className="w-full" onSubmit={onSubmit}>
        <Form.Input name="name" label="Name" config={{ required: true }} />
        <Form.Textarea name="description" label="Description" config={{ required: true }} />
        <div className="w-full grid grid-cols-3 gap-2">
            <Form.Input type="number" name="serves" label="Serves" config={{ required: true }} />
            <Form.Input type="number" name="prepTime" label="Prep Time" />
            <Form.Input type="number" name="cookingTime" label="Cooking Time" config={{ required: true }} />
        </div>
        <div className="w-full grid grid-cols-2 gap-2">
            <Form.Select name="recipeCuisineId" label="Cuisine" options={cuisines} config={{ required: true }} />
            <Form.Select name="recipeCourseId" label="Course" options={courses} config={{ required: true }} />
        </div>
        <Form.Textarea name="ingredients" label="Ingredients" config={{ required: true }} />
        <Form.Textarea name="directions" label="Directions" config={{ required: true }} />
        <div className="form-control my-4">
            {/* @ts-ignore */}
            <Form.FileInput imageUrlKey="imageUrl"/>
        </div>
        <div className="form-control">
            <button type="submit" disabled={ fetching || submitting } className="btn btn-primary btn-active" role="button" aria-pressed="true">
                { submitText || 'submit' }
            </button>
        </div>
      </Form>
    )
}

export default RecipeForm
