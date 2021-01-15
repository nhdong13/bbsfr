import { Pipeline, Variables } from "@sajari/react-search-ui"
import { search } from "@sajari/server"
import VehicleCategoryComponent from "../../../../../components/Vehicles/VehicleCategory"
import {
  getAllVehicles,
  getVehicleCollectionByUid,
  getVehicleCategoryByUid,
} from "../../../../../lib/prismic/api"
import { getConfigPipeline } from "../../../../../services/getPipelineSajari"
import { getDataForMainNav } from "../../../../../services/mainNav"
import { authenticationFromStamped } from "../../../../../services/testimonial"

const pipeline = new Pipeline({ ...getConfigPipeline("best-buy") }, "query")
var searchObj = { variables: null }

const initVariable = (params) => {
  //Filter options will replace base params for per page --> this is code demo
  searchObj.variables = new Variables({
    resultsPerPage: 20,
    q: "",
  })
}

export async function getStaticPaths() {
  const paths = []
  const vehicleList = await getAllVehicles()
  for (const vehicle of vehicleList || []) {
    let vehicleCollections = vehicle?.node?.collections || []
    for (const collection of vehicleCollections) {
      const collectionDetail = await getVehicleCollectionByUid(
        collection?.collection_slug
      )
      for (const category of collectionDetail?.categories || []) {
        paths.push(
          `/vehicles/${vehicle.node._meta.uid}/${collection.collection_slug}/${category.category_slug}`
        )
      }
    }
  }
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const dataNav = await getDataForMainNav()
  const resStamped = await fetch(
    process.env.STAMPED_API_URL,
    authenticationFromStamped()
  )
  const testimonials = await resStamped.json()
  const vehicleCategory = await getVehicleCategoryByUid(params?.vehicleCategory)
  initVariable(params)
  const initialResponse = await search({
    pipeline,
    variables: searchObj.variables,
  })
  return {
    props: { dataNav, vehicleCategory, initialResponse, testimonials },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const VehicleCategoryPage = ({
  vehicleCategory,
  testimonials,
  initialResponse,
  params,
}) => {
  if (!search.variables) {
    initVariable(params)
  }
  return (
    <VehicleCategoryComponent
      initialResponse={initialResponse}
      pipeline={pipeline}
      variables={searchObj.variables}
      vehicleCategory={vehicleCategory}
      testimonials={testimonials}
    />
  )
}
export default VehicleCategoryPage
