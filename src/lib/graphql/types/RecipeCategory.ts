import { objectType, extendType, queryField, enumType, mutationField, inputObjectType, nonNull, arg, idArg } from 'nexus'
import { RecipeCategory, RecipeCategoryType } from 'nexus-prisma'

/**
 * Base types
 */
export const RecipeCategoryEnumType = enumType(RecipeCategoryType)

export const RecipeCategoryObject = objectType({
    name: RecipeCategory.$name,
    description: RecipeCategory.$description,
    definition(t) {
        t.field(RecipeCategory.id)
        t.field(RecipeCategory.name)
        t.field('type', { type: RecipeCategoryEnumType })
    }
})

/**
 * Queries
 */

export const RecipeCategoriesQuery = extendType({
    type: 'Query',
    definition(t) {
        t.list.nonNull.field('allRecipeCategories',{
            type: 'RecipeCategory',
            resolve(_parent, __args, ctx) {
                return ctx.prisma.recipeCategory.findMany({})
            },
        })
    }
})

export const RecipeCategoryByIdQuery = queryField('recipeCategory', {
    type: 'RecipeCategory',
    description: 'Retrieve single recipe category by the provided ID',
    args: { id: nonNull(idArg()) },
    resolve(_parent, args, ctx) {
        return ctx.prisma.recipeCategory.findUnique({
            where: {
                id: args.id
            }
        })
    }
})

/**
 * Mutation - Input Types
 */
export const RecipeCategoryCreateInput = inputObjectType({
    name: 'RecipeCategoryCreateInput',
    description: 'Input type for recipe category creation',
    definition(t) {
      t.nonNull.string('name')
      t.nonNull.field('type', { type: RecipeCategoryEnumType })
    },
})

export const RecipeCategoryUpdateInput = inputObjectType({
    name: 'RecipeCategoryUpdateInput',
    description: 'Input type for recipe category updates',
    definition(t) {
      t.string('name')
      t.field('type', { type: RecipeCategoryEnumType })
    },
})

/**
 * Mutations
 */
export const CreateRecipeCategoryMutation = mutationField('createRecipeCategory', {
    type: 'RecipeCategory',
    description: 'Create a new recipe category',
    args: {
        data: arg({
            type: RecipeCategoryCreateInput
        }),
    },
    async resolve(_parent, args, ctx) {
        return await ctx.prisma.recipeCategory.create({
            data: args.data
        })
    }
})

export const UpdateRecipeCategoryMutation = mutationField('updateRecipeCategory', {
    type: 'RecipeCategory',
    description: 'Update an existing recipe category',
    args: {
        id: nonNull(idArg()),
        data: arg({
            type: 'RecipeCategoryUpdateInput'
        }),
    },
    async resolve(_parent, args, ctx) {
        return await ctx.prisma.recipeCategory.update({
            where: {
                id: args.id
            },
            data: args.data
        })
    }
})

export const DeleteRecipeCategoryMutation = mutationField('deleteRecipeCategory', {
    type: 'RecipeCategory',
    description: 'Remove the provided recipe category',
    args: {
        id: nonNull(idArg()),
    },
    async resolve(_parent, args, ctx) {
        return await ctx.prisma.recipeCategory.delete({
            where: {
                id: args.id
            }
        })
    }
})
