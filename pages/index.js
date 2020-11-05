import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Head from "next/head"

import Header from "../components/Header"
import CheckoutComponent from "../components/Checkout"
import { initializeApollo } from "../lib/apollo"
import { initializeStore } from "../redux/store"

export default function Home() {
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

export async function getStaticProps() {
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
