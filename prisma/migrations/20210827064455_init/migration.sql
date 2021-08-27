-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "RecipeCategoryType" AS ENUM ('CUISINE', 'COURSE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "avatar" TEXT,
    "role" "UserRole" NOT NULL DEFAULT E'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "RecipeCategoryType" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" VARCHAR(280) NOT NULL DEFAULT E'',
    "ingredients" TEXT[],
    "directions" TEXT[],
    "serves" INTEGER NOT NULL DEFAULT 2,
    "prepTime" INTEGER NOT NULL DEFAULT 0,
    "cookingTime" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT E'',
    "source" TEXT,
    "tags" TEXT[],
    "recipeCuisineId" TEXT NOT NULL,
    "recipeCourseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RecipeToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeCategory.name_unique" ON "RecipeCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToUser_AB_unique" ON "_RecipeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToUser_B_index" ON "_RecipeToUser"("B");

-- AddForeignKey
ALTER TABLE "Recipe" ADD FOREIGN KEY ("recipeCuisineId") REFERENCES "RecipeCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD FOREIGN KEY ("recipeCourseId") REFERENCES "RecipeCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToUser" ADD FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
