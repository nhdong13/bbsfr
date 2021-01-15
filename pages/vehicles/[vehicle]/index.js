import VehicleComponent from "../../../components/Vehicles/Vehicle"
import { getAllVehicles, getVehicleByUid } from "../../../lib/prismic/api"
import { getDataForMainNav } from "../../../services/mainNav"
import { authenticationFromStamped } from "../../../services/testimonial"
import { search } from "@sajari/server"
import { pipelineConfig, variablesConfig } from "../../../lib/sajari/config"
import {
  brandFilter,
  categoryFilter,
  listBrandsFilter,
  priceRangeFilter,
  ratingFilter,
} from "../../../lib/sajari/filter"

export async function getStaticPaths() {
  const paths = []
  const vehicleList = await getAllVehicles()
  if (vehicleList.length > 0) {
    for (const vehicle of vehicleList) {
      if (vehicle?.node?._meta?.uid) {
        paths.push(`/vehicles/${vehicle.node._meta.uid}`)
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
  const vehicle = await getVehicleByUid(params?.vehicle)
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
    props: { dataNav, vehicle, initialResponse, testimonials },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const VehiclePage = ({ vehicle, testimonials }) => {
  return <VehicleComponent vehicle={vehicle} testimonials={testimonials} />
}
export default VehiclePage
