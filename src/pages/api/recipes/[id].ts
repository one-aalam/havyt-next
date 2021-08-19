// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type NextApiRequestWithQuery = NextApiRequest & {
    query: {
        id: string
    }
}

const recipeById = async (req: NextApiRequestWithQuery, res: NextApiResponse) => {
    const { id } = req.query
    const recipe = await prisma.recipe.findUnique({ where: { id }})
    res.status(200).json({ recipe })
}

export default recipeById
