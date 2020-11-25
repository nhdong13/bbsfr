import { initializeApollo } from "../lib/apollo"
import { initializeStore } from "../redux/store"
import HomePage from "components/HomePage"
import { getAllBrands, getAllDepartments, getAllSEO } from "../lib/prismic/api"

function Home({ department, brands, SEO }) {
  let list_department = department[0].node.department_link
  return <HomePage department={list_department} brands={brands} SEO={SEO} />
}

export async function getStaticProps({ req, res }) {
  const department = await getAllDepartments()
  const resp_brands = await getAllBrands()
  let resp_SEO = await getAllSEO()
  const SEO = resp_SEO[0].node
  const brands = resp_brands[0].node.shop_by_brand_slider_content
  // if (process.env.NODE_ENV !== "development") {
  //   await basicAuthMiddleware(req, res, {})
  // }
  const reduxStore = initializeStore()
  const apolloClient = initializeApollo()
  return {
    props: {
      initialReduxState: reduxStore.getState(),
      initialApolloState: apolloClient.cache.extract(),
      department,
      brands,
      SEO,
    },
    revalidate: 600,
  }
}
export default Home
