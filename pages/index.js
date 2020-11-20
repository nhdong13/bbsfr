import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Head from "next/head"
import basicAuthMiddleware from "@ray4105/nextjs-basic-auth-middleware"

import { initializeApollo } from "../lib/apollo"
import { initializeStore } from "../redux/store"
import HomePage from "components/HomePage"
import { getAllDepartments } from "../lib/prismic/api"

function Home({ department }) {
  let list_department = department[0].node.department_link
  return <HomePage department={list_department} />
}

export async function getStaticProps({ req, res }) {
  const department = await getAllDepartments()
  if (process.env.NODE_ENV !== "development") {
    await basicAuthMiddleware(req, res, {})
  }
  const reduxStore = initializeStore()
  const apolloClient = initializeApollo()
  return {
    props: {
      initialReduxState: reduxStore.getState(),
      initialApolloState: apolloClient.cache.extract(),
      department,
    },
    revalidate: 600,
  }
}
export default Home
