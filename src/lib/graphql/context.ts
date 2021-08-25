import { PrismaClient } from '@prisma/client'
import { Claims, getSession } from '@auth0/nextjs-auth0'
import { prisma } from '~/lib/prisma'

export type Context = {
    user: Claims
    accessToken: string
    prisma: PrismaClient
}

export async function createContext({ req, res}): Promise<Context> {
    const session = getSession(req, res)
    const user = session?.user ? await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    }) : null

    return {
      user,
      accessToken: session?.accessToken || '',
      prisma
    }
}
