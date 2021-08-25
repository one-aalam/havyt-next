import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};


export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new recipe category */
  createRecipeCategory?: Maybe<RecipeCategory>;
  /** Update an existing recipe category */
  updateRecipeCategory?: Maybe<RecipeCategory>;
  /** Remove the provided recipe category */
  deleteRecipeCategory?: Maybe<RecipeCategory>;
  /** Create a new recipe */
  createRecipe?: Maybe<Recipe>;
  /** Update an existing recipe */
  updateRecipe?: Maybe<Recipe>;
  /** Remove the provided recipe */
  deleteRecipe?: Maybe<Recipe>;
};


export type MutationCreateRecipeCategoryArgs = {
  data?: Maybe<RecipeCategoryCreateInput>;
};


export type MutationUpdateRecipeCategoryArgs = {
  id: Scalars['ID'];
  data?: Maybe<RecipeCategoryUpdateInput>;
};


export type MutationDeleteRecipeCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationCreateRecipeArgs = {
  data?: Maybe<RecipeCreateInput>;
};


export type MutationUpdateRecipeArgs = {
  id: Scalars['ID'];
  data?: Maybe<RecipeUpdateInput>;
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  allRecipeCategories?: Maybe<Array<RecipeCategory>>;
  /** Retrieve single recipe category by the provided ID */
  recipeCategory?: Maybe<RecipeCategory>;
  allRecipes: Array<Recipe>;
  /** Retrieve single recipe by the provided ID */
  recipe?: Maybe<Recipe>;
};


export type QueryRecipeCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryAllRecipesArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryRecipeArgs = {
  id: Scalars['ID'];
};

export type Recipe = {
  __typename?: 'Recipe';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  ingredients: Array<Scalars['String']>;
  directions: Array<Scalars['String']>;
  serves: Scalars['Int'];
  prepTime: Scalars['Int'];
  cookingTime: Scalars['Int'];
  cuisine: RecipeCategory;
  course: RecipeCategory;
  source?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type RecipeCategory = {
  __typename?: 'RecipeCategory';
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<RecipeCategoryType>;
  recipesByCuisine: Array<Recipe>;
  recipesByCourse: Array<Recipe>;
};

/** Input type for recipe category creation */
export type RecipeCategoryCreateInput = {
  name: Scalars['String'];
  type: RecipeCategoryType;
};

export enum RecipeCategoryType {
  Cuisine = 'CUISINE',
  Course = 'COURSE'
}

/** Input type for recipe category updates */
export type RecipeCategoryUpdateInput = {
  name?: Maybe<Scalars['String']>;
  type?: Maybe<RecipeCategoryType>;
};

/** Input type for recipe creation */
export type RecipeCreateInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  ingredients?: Maybe<Array<Scalars['String']>>;
  directions?: Maybe<Array<Scalars['String']>>;
  serves: Scalars['Int'];
  prepTime?: Maybe<Scalars['Int']>;
  cookingTime: Scalars['Int'];
  recipeCuisineId: Scalars['ID'];
  recipeCourseId: Scalars['ID'];
  source?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  userId: Scalars['ID'];
};

/** Input type for recipe updates */
export type RecipeUpdateInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  ingredients?: Maybe<Array<Maybe<Scalars['String']>>>;
  directions?: Maybe<Array<Maybe<Scalars['String']>>>;
  serves?: Maybe<Scalars['Int']>;
  prepTime?: Maybe<Scalars['Int']>;
  cookingTime?: Maybe<Scalars['Int']>;
  recipeCuisineId?: Maybe<Scalars['ID']>;
  recipeCourseId?: Maybe<Scalars['ID']>;
  source?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  userId?: Maybe<Scalars['ID']>;
};

export type Recipe_RecipeFragment = { __typename?: 'Recipe', id: string, name: string, description: string, ingredients: Array<string>, directions: Array<string>, serves: number, prepTime: number, cookingTime: number, cuisine: { __typename?: 'RecipeCategory', id: string, name: string }, course: { __typename?: 'RecipeCategory', id: string, name: string } };

export type GetAllRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRecipesQuery = { __typename?: 'Query', allRecipes: Array<{ __typename?: 'Recipe', id: string, name: string, description: string, ingredients: Array<string>, directions: Array<string>, serves: number, prepTime: number, cookingTime: number, cuisine: { __typename?: 'RecipeCategory', id: string, name: string }, course: { __typename?: 'RecipeCategory', id: string, name: string } }> };

export type GetRecipeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetRecipeQuery = { __typename?: 'Query', recipe?: Maybe<{ __typename?: 'Recipe', id: string, name: string, description: string, ingredients: Array<string>, directions: Array<string>, serves: number, prepTime: number, cookingTime: number, cuisine: { __typename?: 'RecipeCategory', id: string, name: string }, course: { __typename?: 'RecipeCategory', id: string, name: string } }> };

export type CreateRecipeMutationVariables = Exact<{
  data: RecipeCreateInput;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe?: Maybe<{ __typename?: 'Recipe', id: string, name: string, description: string, ingredients: Array<string>, directions: Array<string>, serves: number, prepTime: number, cookingTime: number, cuisine: { __typename?: 'RecipeCategory', id: string, name: string }, course: { __typename?: 'RecipeCategory', id: string, name: string } }> };

export type UpdateRecipeMutationVariables = Exact<{
  id: Scalars['ID'];
  data: RecipeUpdateInput;
}>;


export type UpdateRecipeMutation = { __typename?: 'Mutation', updateRecipe?: Maybe<{ __typename?: 'Recipe', id: string, name: string, description: string, ingredients: Array<string>, directions: Array<string>, serves: number, prepTime: number, cookingTime: number, cuisine: { __typename?: 'RecipeCategory', id: string, name: string }, course: { __typename?: 'RecipeCategory', id: string, name: string } }> };

export type DeleteRecipeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteRecipeMutation = { __typename?: 'Mutation', deleteRecipe?: Maybe<{ __typename?: 'Recipe', id: string, name: string, description: string, ingredients: Array<string>, directions: Array<string>, serves: number, prepTime: number, cookingTime: number, cuisine: { __typename?: 'RecipeCategory', id: string, name: string }, course: { __typename?: 'RecipeCategory', id: string, name: string } }> };

export type GetAllRecipeCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRecipeCategoriesQuery = { __typename?: 'Query', allRecipeCategories?: Maybe<Array<{ __typename?: 'RecipeCategory', id: string, name: string, type?: Maybe<RecipeCategoryType> }>> };

export const Recipe_RecipeFragmentDoc = gql`
    fragment Recipe_recipe on Recipe {
  id
  name
  description
  ingredients
  directions
  serves
  prepTime
  cookingTime
  cuisine {
    id
    name
  }
  course {
    id
    name
  }
}
    `;
export const GetAllRecipesDocument = gql`
    query GetAllRecipes {
  allRecipes {
    ...Recipe_recipe
  }
}
    ${Recipe_RecipeFragmentDoc}`;

export function useGetAllRecipesQuery(options: Omit<Urql.UseQueryArgs<GetAllRecipesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllRecipesQuery>({ query: GetAllRecipesDocument, ...options });
};
export const GetRecipeDocument = gql`
    query GetRecipe($id: ID!) {
  recipe(id: $id) {
    ...Recipe_recipe
  }
}
    ${Recipe_RecipeFragmentDoc}`;

export function useGetRecipeQuery(options: Omit<Urql.UseQueryArgs<GetRecipeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetRecipeQuery>({ query: GetRecipeDocument, ...options });
};
export const CreateRecipeDocument = gql`
    mutation createRecipe($data: RecipeCreateInput!) {
  createRecipe(data: $data) {
    ...Recipe_recipe
  }
}
    ${Recipe_RecipeFragmentDoc}`;

export function useCreateRecipeMutation() {
  return Urql.useMutation<CreateRecipeMutation, CreateRecipeMutationVariables>(CreateRecipeDocument);
};
export const UpdateRecipeDocument = gql`
    mutation updateRecipe($id: ID!, $data: RecipeUpdateInput!) {
  updateRecipe(id: $id, data: $data) {
    ...Recipe_recipe
  }
}
    ${Recipe_RecipeFragmentDoc}`;

export function useUpdateRecipeMutation() {
  return Urql.useMutation<UpdateRecipeMutation, UpdateRecipeMutationVariables>(UpdateRecipeDocument);
};
export const DeleteRecipeDocument = gql`
    mutation deleteRecipe($id: ID!) {
  deleteRecipe(id: $id) {
    ...Recipe_recipe
  }
}
    ${Recipe_RecipeFragmentDoc}`;

export function useDeleteRecipeMutation() {
  return Urql.useMutation<DeleteRecipeMutation, DeleteRecipeMutationVariables>(DeleteRecipeDocument);
};
export const GetAllRecipeCategoriesDocument = gql`
    query GetAllRecipeCategories {
  allRecipeCategories {
    id
    name
    type
  }
}
    `;

export function useGetAllRecipeCategoriesQuery(options: Omit<Urql.UseQueryArgs<GetAllRecipeCategoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllRecipeCategoriesQuery>({ query: GetAllRecipeCategoriesDocument, ...options });
};