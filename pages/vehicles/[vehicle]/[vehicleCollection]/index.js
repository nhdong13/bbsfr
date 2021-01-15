import { Pipeline, Variables } from "@sajari/react-search-ui"
import { search } from "@sajari/server"
import VehicleCollectionComponent from "../../../../components/Vehicles/VehicleCollection"
import {
  getAllVehicles,
  getVehicleCollectionByUid,
} from "../../../../lib/prismic/api"
import { pipelineConfig, variablesConfig } from "../../../../lib/sajari/config"
import {
  brandFilter,
  categoryFilter,
  listBrandsFilter,
  priceRangeFilter,
  ratingFilter,
} from "../../../../lib/sajari/filter"
import { getConfigPipeline } from "../../../../services/getPipelineSajari"
import { getDataForMainNav } from "../../../../services/mainNav"
import { authenticationFromStamped } from "../../../../services/testimonial"

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
  //Filter options will replace base params for per page --> this is code demo
  const initialResponse = await search({
    pipeline: pipelineConfig,
    variables: variablesConfig(),
    filters: [
      listBrandsFilter,
      priceRangeFilter,
      brandFilter,
      categoryFilter,
      ratingFilter,
    ],
  })
  return {
    props: { dataNav, vehicleCollection, initialResponse, testimonials },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const VehicleCollectionPage = ({ vehicleCollection, testimonials }) => {
  return (
    <VehicleCollectionComponent
      vehicleCollection={vehicleCollection}
      testimonials={testimonials}
    />
  )
}
export default VehicleCollectionPage
