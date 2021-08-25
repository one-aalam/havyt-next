import { PrismaClient } from '@prisma/client'
import { Claims, getSession } from '@auth0/nextjs-auth0'
import { prisma } from '~/lib/prisma'

export type Context = {
    user: Claims
    accessToken: string
    prisma: PrismaClient
}

export function createContext({ req, res}): Context {
    const session = getSession(req, res)
    return {
      user: session?.user || null,
      accessToken: session?.accessToken || '',
      prisma
    }
}
