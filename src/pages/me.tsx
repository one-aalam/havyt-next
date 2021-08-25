import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPage } from 'next'
import { NextAppPageProps } from '~/types/app'

const MePage: NextPage<NextAppPageProps> = () => {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  if (user) {
    return (
      <div>
        Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>
}

export default MePage

export const getServerSideProps = withPageAuthRequired()
