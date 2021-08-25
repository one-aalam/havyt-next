import 'tailwindcss/tailwind.css'
import '~/styles/globals.css'

import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { UserProvider } from '@auth0/nextjs-auth0'

import SEO from '../../next-seo.config'
import { MessageProvider } from '~/lib/message'

function MyApp({ Component, pageProps }: AppProps) {
  const pageMeta = (Component as any)?.defaultProps?.meta || {}
  const pageSEO = { ...SEO, ...pageMeta }

  return (
    <React.Fragment>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...pageSEO} />
      <UserProvider>
        <MessageProvider>
            <Component {...pageProps} />
        </MessageProvider>
       </UserProvider>
    </React.Fragment>
  )
}

export default MyApp
