import { search } from "@sajari/server"
import VehicleCollectionComponent from "../../../../components/Vehicles/VehicleCollection"
import { getVehicleCollectionByUid } from "../../../../lib/prismic/api"
import { pipelineConfig, variablesConfig } from "../../../../lib/sajari/config"
import {
  categoryFilter,
  colorFilter,
  listBrandsFilter,
  priceRangeFilter,
  ratingFilter,
} from "../../../../lib/sajari/filter"
import { getDataForMainNav } from "../../../../services/mainNav"
import { authenticationFromStamped } from "../../../../services/testimonial"
import { SSRProvider, SearchProvider } from "@sajari/react-search-ui"
import { listVehicleService } from "../../../../services/vehicle"

export async function getStaticPaths() {
  const paths = []
  const vehicleList = await listVehicleService()
  for (const vehicle of vehicleList || []) {
    let vehicleCollections = vehicle?.node?.collections || []
    for (const collection of vehicleCollections) {
      if (collection?.collection_slug) {
        paths.push(
          `/vehicles/${vehicle.node._meta.uid}/${collection.collection_slug}`
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
      categoryFilter,
      ratingFilter,
      colorFilter,
    ],
  })
  return {
    props: { dataNav, vehicleCollection, initialResponse, testimonials },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const VehicleCollectionPage = ({
  vehicleCollection,
  testimonials,
  filter,
  initialResponse,
}) => {
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
        <VehicleCollectionComponent
          vehicleCollection={vehicleCollection}
          testimonials={testimonials}
        />
      </SearchProvider>
    </SSRProvider>
  )
}
export default VehicleCollectionPage
