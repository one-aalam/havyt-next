import { NextPage } from 'next'
import styles from '~/styles/Home.module.css'
import Layout from '~/components/Layout'
import RecipeCategoryList from '~/components/recipes/RecipeCategoryList'
import withUrqlClient from '~/lib/graphql/client'

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

export default withUrqlClient(RecipeCategoryIndexPage)
