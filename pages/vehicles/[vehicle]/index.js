import VehicleComponent from "../../../components/Vehicles/Vehicle"
import { getVehicleByUid } from "../../../lib/prismic/api"
import { getDataForMainNav } from "../../../services/mainNav"
import { authenticationFromStamped } from "../../../services/testimonial"
import { search } from "@sajari/server"
import { pipelineConfig, variablesConfig } from "../../../lib/sajari/config"
import { SSRProvider, SearchProvider } from "@sajari/react-search-ui"
import {
  categoryFilter,
  colorFilter,
  listBrandsFilter,
  priceRangeFilter,
  ratingFilter,
} from "../../../lib/sajari/filter"
import { listVehicleService } from "../../../services/vehicle"

export async function getStaticPaths() {
  const paths = []
  const vehicleList = await listVehicleService()
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
      categoryFilter,
      ratingFilter,
      colorFilter,
    ],
  })
  return {
    props: { dataNav, vehicle, initialResponse, testimonials },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const VehiclePage = ({ vehicle, testimonials, filter, initialResponse }) => {
  return (
    <SSRProvider>
      <SearchProvider
        search={{
          pipeline: pipelineConfig,
          variables: variablesConfig(filter || ""),
          filters: [
            listBrandsFilter,
            priceRangeFilter,
            categoryFilter,
            ratingFilter,
            colorFilter,
          ],
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
        defaultFilter={filter || ""}
        customClassNames={{
          pagination: {
            container: "containerPagination",
            button: "buttonPagination",
            active: "activePagination",
            next: "nextPagination",
            prev: "prevPagination",
            spacerEllipsis: "spacerEllipsisPagination",
          },
        }}
      >
        <VehicleComponent vehicle={vehicle} testimonials={testimonials} />
      </SearchProvider>
    </SSRProvider>
  )
}
export default VehiclePage
