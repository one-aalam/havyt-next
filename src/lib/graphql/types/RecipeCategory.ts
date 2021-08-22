import { objectType, queryType, enumType } from 'nexus'

export const recipeCategoryObject = objectType({
    name: 'RecipeCategory',
    definition(t) {
        t.string('id')
        t.string('name')
        t.field('type', { type: RecipeCategoryType })
    }
})

const RecipeCategoryType = enumType({
    name: 'RecipeCategoryType',
    members: ['CUISINE', 'COURSE'],
})

export const recipeCategoryQuery = queryType({
    definition(t) {
      t.nonNull.list.nonNull.field('recipeCategories', {
          type: 'RecipeCategory',
            resolve(_, __, ctx) {
                return ctx.prisma.recipeCategory.findMany({})
            },
      })
    },
})
