import { objectType, queryType, enumType } from 'nexus'
import { RecipeCategory, RecipeCategoryType } from 'nexus-prisma'

export const RecipeCategoryObject = objectType({
    name: RecipeCategory.$name,
    description: RecipeCategory.$description,
    definition(t) {
        t.field(RecipeCategory.id)
        t.field(RecipeCategory.name)
        t.field('type', { type: enumType(RecipeCategoryType) })
    }
})

export const RecipeCategoriesQuery = queryType({
    definition(t) {
      t.nonNull.list.nonNull.field('allRecipeCategories', {
          type: 'RecipeCategory',
            resolve(_parent, __args, ctx) {
                return ctx.prisma.recipeCategory.findMany({})
            },
      })
    },
})
