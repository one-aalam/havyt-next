import { rule, and, shield } from 'graphql-shield'

export const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    return ctx.user !== null
})

export const isAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    return ctx.user.role === 'ADMIN'
})

export const permissions = shield({
    Query: {
      me: isAuthenticated,
    },
    Mutation: {
        createRecipe: isAuthenticated,
        updateRecipe: isAuthenticated,
        deleteRecipe: isAuthenticated,
        createRecipeCategory: and(isAuthenticated, isAdmin),
        updateRecipeCategory: and(isAuthenticated, isAdmin),
        deleteRecipeCategory: and(isAuthenticated, isAdmin),
    },
    User: isAuthenticated,
})
