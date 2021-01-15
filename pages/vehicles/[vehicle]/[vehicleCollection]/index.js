import { Pipeline, Variables } from "@sajari/react-search-ui"
import { search } from "@sajari/server"
import VehicleCollectionComponent from "../../../../components/Vehicles/VehicleCollection"
import {
  getAllVehicles,
  getVehicleCollectionByUid,
} from "../../../../lib/prismic/api"
import { getConfigPipeline } from "../../../../services/getPipelineSajari"
import { getDataForMainNav } from "../../../../services/mainNav"
import { authenticationFromStamped } from "../../../../services/testimonial"

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
  if (vehicleList.length > 0) {
    for (const vehicle of vehicleList) {
      let vehicleCollections = vehicle?.node?.collections
      if (vehicleCollections.length > 0) {
        for (const collection of vehicleCollections) {
          if (collection?.collection_slug) {
            paths.push(
              `/vehicles/${vehicle.node._meta.uid}/${collection.collection_slug}`
            )
          }
        }
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
  const vehicleCollection = await getVehicleCollectionByUid(
    params?.vehicleCollection
  )
  initVariable(params)
  const initialResponse = await search({
    pipeline,
    variables: searchObj.variables,
  })
  return {
    props: { dataNav, vehicleCollection, initialResponse, testimonials },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const VehicleCollectionPage = ({
  vehicleCollection,
  testimonials,
  initialResponse,
  params,
}) => {
  if (!search.variables) {
    initVariable(params)
  }
  return (
    <VehicleCollectionComponent
      initialResponse={initialResponse}
      pipeline={pipeline}
      variables={searchObj.variables}
      vehicleCollection={vehicleCollection}
      testimonials={testimonials}
    />
  )
}
export default VehicleCollectionPage
