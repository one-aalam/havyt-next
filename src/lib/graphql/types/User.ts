import { objectType, enumType, queryField } from 'nexus'
import { User, UserRole } from 'nexus-prisma'

export const UserRoleEnumType = enumType(UserRole)

export const UserObject = objectType({
    name: User.$name,
    description: User.$description,
    definition(t) {
        t.field(User.id)
        t.field(User.username)
        t.field(User.email)
        t.field(User.avatar)
        t.field(User.role)
        t.field(User.createdAt)

        t.nonNull.list.nonNull.field('recipes', {
            type: 'Recipe',
            resolve(parent, _args, ctx) {
                return ctx.prisma.recipe.findMany({
                    where: {
                        userId: parent.id
                    }
                })
            },
        })
    }
})

export const UserMeQuery = queryField('me', {
    type: 'User',
    description: 'Retrieve the logged-in user',
    resolve(_parent, _args, ctx) {
        if(!ctx.user) throw new Error(`Seems like you aren't logged-in. Please log-in and try again!`)
        return ctx.prisma.user.findUnique({
            where: {
                email: ctx.user.email
            }
        })
    }
})
