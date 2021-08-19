// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const recipes = async (req: NextApiRequest, res: NextApiResponse) => {
    const recipes = await prisma.recipe.findMany()
    res.status(200).json({ recipes })
}

export default recipes
