import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { USERS } from '../fixtures/users'
import { RECIPE_CUISINES } from '../fixtures/cuisines'
import { RECIPE_COURSES } from '../fixtures/courses'
import { RECIPES } from '../fixtures/recipes'

// min and max included
const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

async function seed() {
    // Prisma create query to seed models in database

    // Seed the independent tables
    const usersSeeded = await prisma.user.createMany({
        // @ts-ignore
        data: USERS.map(({ username, email, role, avatar }) => ({ username, email, role, avatar }))
    })
    const cuisinesSeeded = await prisma.recipeCategory.createMany({
        // @ts-ignore
        data: [ ...RECIPE_CUISINES ]
    })

    const coursesSeeded = await prisma.recipeCategory.createMany({
        // @ts-ignore
        data: [ ...RECIPE_COURSES ]
    })

    // Pull out the seeded data
    const users = await prisma.user.findMany()

    const courses = await prisma.recipeCategory.findMany({
        where: {
            type: 'COURSE'
        }
    })

    const cuisines = await prisma.recipeCategory.findMany({
        where: {
            type: 'CUISINE'
        }
    })

    // Seed the dependant tables
    const recipesSeeded = await prisma.recipe.createMany({
        // @ts-ignore
        data: RECIPES.map(recipe=> ({
            ...recipe,
            recipeCuisineId: cuisines[getRandom(0, cuisines.length - 1)].id,
            recipeCourseId: courses[getRandom(0, courses.length - 1)].id,
            userId: users[getRandom(0, users.length - 1)].id
        }))
    })
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
