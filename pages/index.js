import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Head from "next/head"

import Header from "../components/Header"
import CheckoutComponent from "../components/Checkout"
import { initializeApollo } from "../lib/apollo"
import { initializeStore } from "../redux/store"
import basicAuthMiddleware from 'nextjs-basic-auth-middleware'

export default function Home() {
  console.log(process.env.NODE_ENV)

  return (
    <>
      <Head>
        <title>Bikebiz Replatform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <CheckoutComponent />
      </main>
    </>
  )
}

Home.getInitialProps = async ({req, res}) => {
  // FIXME only work on other
  // Need to remove on production mode
  if (process.env.NODE_ENV !== 'development') {
    await basicAuthMiddleware(req, res, {})
  }
  const reduxStore = initializeStore()
  const apolloClient = initializeApollo()
  return {
    props: {
      initialReduxState: reduxStore.getState(),
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

