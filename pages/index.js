import { initializeApollo } from "../lib/apollo"
import { initializeStore } from "../redux/store"
import {
  getAllBrands,
  getAllDepartments,
  getAllSEO,
  getAllFAQ,
} from "../lib/prismic/api"
import { setDepartments } from "../redux/reducers/departments"
import dynamic from "next/dynamic"
import { fetchDataFromStamped } from "../services/testimonial"

const HomePageDynamic = dynamic(() => import("components/HomePage"))

function Home({ department, brands, SEO, resPriFAQ, testimonials }) {
  let list_department = department[0].node.department_link
  setDepartments(list_department)
  return (
    <HomePageDynamic
      department={list_department}
      brands={brands}
      SEO={SEO}
      FAQ={resPriFAQ}
      testimonials={testimonials}
    />
  )
}

export async function getStaticProps({ req, res }) {
  const requestOptions = fetchDataFromStamped()
  const resStamped = await fetch(process.env.STAMPED_API_URL, requestOptions)
  const testimonials = await resStamped.json()
  const department = await getAllDepartments()
  const resp_brands = await getAllBrands()
  const resPriFAQ = await getAllFAQ()
  let resp_SEO = await getAllSEO()
  const SEO = resp_SEO[0].node
  const brands = resp_brands[0].node.shop_by_brand_slider_content
  const reduxStore = initializeStore()
  const apolloClient = initializeApollo()
  return {
    props: {
      initialReduxState: reduxStore.getState(),
      initialApolloState: apolloClient.cache.extract(),
      department,
      brands,
      SEO,
      resPriFAQ,
      testimonials,
    },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}
export default Home
