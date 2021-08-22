import { NextPage } from 'next'
import { dedupExchange, cacheExchange, fetchExchange } from '@urql/core'
import { withUrqlClient } from 'next-urql'

const UrqlProvider = (Page: NextPage) => withUrqlClient((ssrExchange) => ({
    // ...add your Client options here
    url: process.env.GRAPHQL_ENDPOINT || 'http://localhost:3000/api/graphql',
    exchanges: [
        dedupExchange,
        cacheExchange,
        ssrExchange,
        fetchExchange
    ],
  }))(Page)


export default UrqlProvider
