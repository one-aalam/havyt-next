import { objectType, extendType, queryField, mutationField, inputObjectType, nonNull, arg, idArg, intArg } from 'nexus'
import { Recipe } from 'nexus-prisma'
/**
 * Base types
 */

export const RecipeObject = objectType({
    name: Recipe.$name,
    description: Recipe.$description,
    definition(t) {
        t.field(Recipe.id)
        t.field(Recipe.name)
        t.field(Recipe.description)
        t.field(Recipe.ingredients)
        t.field(Recipe.directions)
        t.field(Recipe.serves)
        t.field(Recipe.prepTime)
        t.field(Recipe.cookingTime)
        t.field(Recipe.cuisine)
        t.field(Recipe.course)
        t.field(Recipe.source)
        t.field(Recipe.tags)
    }
})

/**
 * Queries
 */
 export const RecipesQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('allRecipes', {
            type: 'Recipe',
            args: {
                skip: intArg(),
                take: intArg(),
            },
            resolve(_parent, args, ctx) {
                return ctx.prisma.recipe.findMany({
                    skip: args.skip || undefined,
                    take: args.take || undefined,
                })
            },
        })
    }
})

export const RecipeByIdQuery = queryField('recipe', {
    type: 'Recipe',
    description: 'Retrieve single recipe by the provided ID',
    args: { id: nonNull(idArg()) },
    resolve(_parent, args, ctx) {
        return ctx.prisma.recipe.findUnique({
            where: {
                id: args.id
            }
        })
    }
})

/**
 * Mutation - Input Types
 */
 export const RecipeCreateInput = inputObjectType({
    name: 'RecipeCreateInput',
    description: 'Input type for recipe creation',
    definition(t) {
        t.nonNull.string('name')
        t.string('description')
        t.list.nonNull.field('ingredients', { type: 'String' })
        t.list.nonNull.field('directions', { type: 'String' })
        t.nonNull.int('serves')
        t.int('prepTime')
        t.nonNull.int('cookingTime')
        t.nonNull.id('recipeCuisineId')
        t.nonNull.id('recipeCourseId')
        t.string('source')
        t.list.field('tags', { type: 'String' })
        t.nonNull.id('userId')
    },
})

export const RecipeUpdateInput = inputObjectType({
    name: 'RecipeUpdateInput',
    description: 'Input type for recipe updates',
    definition(t) {
        t.string('name')
        t.string('description')
        t.list.field('ingredients', { type: 'String' })
        t.list.field('directions', { type: 'String' })
        t.int('serves')
        t.int('prepTime')
        t.int('cookingTime')
        t.id('recipeCuisineId')
        t.id('recipeCourseId')
        t.string('source')
        t.list.field('tags', { type: 'String' })
        t.id('userId')
    },
})

/**
 * Mutations
 */
 export const CreateRecipeMutation = mutationField('createRecipe', {
    type: 'Recipe',
    description: 'Create a new recipe',
    args: {
        data: arg({
            type: 'RecipeCreateInput'
        }),
    },
    async resolve(_parent, args, ctx) {
        const { recipeCuisineId, recipeCourseId, userId, ...recipe } = args.data
        return await ctx.prisma.recipe.create({
            data: {
                ...recipe,
                cuisine: {
                    connect: {
                        id: recipeCuisineId
                    }
                },
                course: {
                    connect: {
                        id: recipeCourseId
                    }
                },
                submittedBy: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    }
})

export const UpdateRecipeMutation = mutationField('updateRecipe', {
    type: 'Recipe',
    description: 'Update an existing recipe',
    args: {
        id: nonNull(idArg()),
        data: arg({
            type: 'RecipeUpdateInput'
        }),
    },
    async resolve(_parent, args, ctx) {
        const { recipeCuisineId, recipeCourseId, userId, ...recipe } = args.data
        return await ctx.prisma.recipe.update({
            where: {
                id: args.id
            },
            data: {
                ...recipe,
                ...(recipeCuisineId && {
                    cuisine: {
                        connect: {
                            id: recipeCuisineId
                        }
                    }
                }),
                ...(recipeCourseId && {
                    course: {
                        connect: {
                            id: recipeCourseId
                        }
                    }
                }),
                ...(userId && {
                    submittedBy : {
                        connect: {
                            id: userId
                        }
                    }
                }),
            }
        })
    }
})

export const DeleteRecipeMutation = mutationField('deleteRecipe', {
    type: 'Recipe',
    description: 'Remove the provided recipe',
    args: {
        id: nonNull(idArg()),
    },
    async resolve(_parent, args, ctx) {
        return await ctx.prisma.recipe.delete({
            where: {
                id: args.id
            }
        })
    }
})
