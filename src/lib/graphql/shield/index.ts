import { rule, shield } from 'graphql-shield'

export const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    return ctx.user !== null
})

export const permissions = shield({
    Query: {
      me: isAuthenticated,
    },
    Mutation: {
        createRecipe: isAuthenticated,
        updateRecipe: isAuthenticated,
        deleteRecipe: isAuthenticated,
        createRecipeCategory: isAuthenticated,
        updateRecipeCategory: isAuthenticated,
        deleteRecipeCategory: isAuthenticated,
    },
    User: isAuthenticated,
})
