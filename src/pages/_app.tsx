import 'tailwindcss/tailwind.css'
import '~/styles/globals.css'

import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { Provider as UrqlProvider } from 'urql'

import SEO from '../../next-seo.config'
import { MessageProvider } from '~/lib/message'
import { client } from '~/lib/graphql/client'

function MyApp({ Component, pageProps }: AppProps) {
  const pageMeta = (Component as any)?.defaultProps?.meta || {}
  const pageSEO = { ...SEO, ...pageMeta }

  return (
    <React.Fragment>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...pageSEO} />
      <UrqlProvider value={client}>
        <MessageProvider>
            <Component {...pageProps} />
        </MessageProvider>
      </UrqlProvider>
    </React.Fragment>
  )
}

export default MyApp
