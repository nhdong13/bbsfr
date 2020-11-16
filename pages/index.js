import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Head from "next/head"
import basicAuthMiddleware from "@ray4105/nextjs-basic-auth-middleware"

import { initializeApollo } from "../lib/apollo"
import { initializeStore } from "../redux/store"
import HomePage from "components/HomePage"

export default function Home() {
  return <HomePage />
}

Home.getInitialProps = async ({ req, res }) => {
  // FIXME only work on other
  // Need to remove on production mode
  if (process.env.NODE_ENV !== "development") {
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
