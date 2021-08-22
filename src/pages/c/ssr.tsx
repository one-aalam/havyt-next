// Example - Data fetched on the server
import { NextPage } from 'next'
import styles from '~/styles/Home.module.css'
import Layout from '~/components/Layout'
import RecipeCategoryList from '~/components/recipes/RecipeCategoryList'
import { withUrqlProviderOnly, useUrqlClient } from '~/lib/graphql/client'
import { RECIPE_CATEGORIES_QUERY } from '~/lib/graphql/queries'

const RecipeCategoryIndexPage: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
           <RecipeCategoryList />
        </main>
      </div>
    </Layout>
  )
}

export default withUrqlProviderOnly(RecipeCategoryIndexPage)

export async function getServerSideProps(ctx) {
    const { client, ssrCache } = useUrqlClient()

    // This query is used to populate the cache for the query
    // used on this page.
    await client.query(RECIPE_CATEGORIES_QUERY).toPromise();

    return {
      props: {
        // urqlState is a keyword here so withUrqlClient can pick it up.
        urqlState: ssrCache.extractData(),
      },
    //   revalidate: 600,
    };
}
