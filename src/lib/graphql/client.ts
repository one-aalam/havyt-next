import { NextPage } from 'next'
import { dedupExchange, cacheExchange, fetchExchange, ssrExchange } from '@urql/core'
import { withUrqlClient, initUrqlClient } from 'next-urql'


const UrqlProvider = (Page: NextPage) => withUrqlClient((ssrExchange) => ({
    // ...add your Client options here
    url: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    exchanges: [
        dedupExchange,
        cacheExchange,
        ssrExchange,
        fetchExchange
    ],
}))(Page)

export const withUrqlProviderOnly = (Page: NextPage) => withUrqlClient(() => {
    return ({
        url: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    })
}, { ssr: false })(Page)

export const useUrqlClient = () => {
    const ssrCache = ssrExchange({ isClient: false })

    const client = initUrqlClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
      exchanges: [
          dedupExchange,
          cacheExchange,
          ssrCache,
          fetchExchange
        ],
    }, false)

    return {
        client,
        ssrCache
    }
}


export default UrqlProvider
