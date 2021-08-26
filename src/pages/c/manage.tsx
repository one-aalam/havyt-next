import { NextPage } from 'next'
import { withPageAuthRequired, UserProfile, getSession } from '@auth0/nextjs-auth0'
import withUrqlClient from '~/lib/graphql/client'
import { prisma } from '~/lib/prisma'
import styles from '~/styles/Home.module.css'
import Layout from '~/components/Layout'
import RecipeCategoryList from '~/components/recipes/RecipeCategoryList'


type ManagePageProps = { user: UserProfile, role: string };

const ManagePage: NextPage<ManagePageProps> = ({ user, role }) => {
    // conditionally hide things based on the user role
   if (user) {
    return (
        <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
        Welcome {user.name}({role})! <a href="/api/auth/logout">Logout</a>
           <RecipeCategoryList />
        </main>
      </div>
    </Layout>
    );
  }
  return <a href="/api/auth/login">Login</a>
}

export default withUrqlClient(ManagePage)
// export default withUrqlClient(withPageAuthRequired(ManagePage))
export const getServerSideProps = withPageAuthRequired({
    returnTo: '/me',
    getServerSideProps: async({ req, res }) => {
        // This is invoked post user assertion, so it's safe to assume that it runs for authenticated context
        const session = getSession(req, res)
        const user = await prisma.user.findUnique({ where: { email: session.user.email } })
        if(user.role !== 'ADMIN') {
            return {
                redirect: {
                  permanent: false,
                  destination: '/me'
                }
            }
        }
        return {
            props: {
                role: user.role,
            }
        }
    }
})
