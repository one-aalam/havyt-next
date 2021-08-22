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
};

export type Query = {
  __typename?: 'Query';
  allRecipeCategories: Array<RecipeCategory>;
};

export type RecipeCategory = {
  __typename?: 'RecipeCategory';
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<RecipeCategoryType>;
};

export enum RecipeCategoryType {
  Cuisine = 'CUISINE',
  Course = 'COURSE'
}

export type GetAllRecipeCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRecipeCategoriesQuery = { __typename?: 'Query', allRecipeCategories: Array<{ __typename?: 'RecipeCategory', id: string, name: string }> };


export const GetAllRecipeCategoriesDocument = gql`
    query GetAllRecipeCategories {
  allRecipeCategories {
    id
    name
  }
}
    `;

export function useGetAllRecipeCategoriesQuery(options: Omit<Urql.UseQueryArgs<GetAllRecipeCategoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllRecipeCategoriesQuery>({ query: GetAllRecipeCategoriesDocument, ...options });
};