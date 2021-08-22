import { PrismaClient } from '@prisma/client'
import { prisma } from '~/lib/prisma'

export type Context = {
  prisma: PrismaClient;
}

export function createContext(): Context {
  return { prisma };
}
