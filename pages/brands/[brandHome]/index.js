import BrandHomeComponent from "../../../components/Brand/BrandHome"
import { getBrandByUid, listAllBrands } from "../../../lib/prismic/api"
import { Pipeline, Variables } from "@sajari/react-search-ui"
import { search } from "@sajari/server"
import { getConfigPipeline } from "../../../services/getPipelineSajari"
import { getDataForMainNav } from "../../../services/mainNav"
import { authenticationFromStamped } from "../../../services/testimonial"
import { mockupDataFilterBrand } from "../../../services/brand"

const pipeline = new Pipeline({ ...getConfigPipeline("best-buy") }, "query")
var searchObj = { variables: null }

const initVariable = (params) => {
  //Filter options will replace base params for per page --> this is code demo
  searchObj.variables = new Variables({
    resultsPerPage: 20,
    q: "",
    filter: `brand = "${mockupDataFilterBrand()}"`,
  })
}

export async function getStaticProps({ params }) {
  initVariable(params)
  const initialResponse = await search({
    pipeline,
    variables: searchObj.variables,
  })
  const brand = await getBrandByUid(params.brandHome)
  const requestOptions = authenticationFromStamped()
  const resStamped = await fetch(process.env.STAMPED_API_URL, requestOptions)
  const testimonials = await resStamped.json()
  const dataNav = await getDataForMainNav()
  return {
    props: { initialResponse, brand, dataNav, testimonials },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

export async function getStaticPaths() {
  const paths = []
  const response = await listAllBrands()
  const brandCollections = response.map((i) => ({
    uid: i.node._meta.uid,
  }))
  if (brandCollections.length > 0) {
    for (const collections of brandCollections) {
      paths.push(`/brands/${collections.uid}`)
    }
  }
  return { paths, fallback: false }
}

const BrandHomePage = ({ initialResponse, brand, testimonials }) => {
  return (
    <BrandHomeComponent
      initialResponse={initialResponse}
      pipeline={pipeline}
      variables={searchObj.variables}
      brand={brand}
      testimonials={testimonials}
    />
  )
}
export default BrandHomePage
