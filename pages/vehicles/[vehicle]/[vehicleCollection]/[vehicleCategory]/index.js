import { search } from "@sajari/server"
import VehicleCategoryComponent from "../../../../../components/Vehicles/VehicleCategory"
import {
  getAllVehicles,
  getVehicleCollectionByUid,
  getVehicleCategoryByUid,
} from "../../../../../lib/prismic/api"
import {
  pipelineConfig,
  variablesConfig,
} from "../../../../../lib/sajari/config"
import {
  brandFilter,
  categoryFilter,
  listBrandsFilter,
  priceRangeFilter,
  ratingFilter,
} from "../../../../../lib/sajari/filter"
import { getDataForMainNav } from "../../../../../services/mainNav"
import { authenticationFromStamped } from "../../../../../services/testimonial"
import { SearchProvider, SSRProvider } from "@sajari/react-search-ui"

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
    props: { dataNav, vehicleCategory, initialResponse, testimonials },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const VehicleCategoryPage = ({
  vehicleCategory,
  testimonials,
  initialResponse,
  filter,
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
            brandFilter,
            categoryFilter,
            ratingFilter,
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
        <VehicleCategoryComponent
          vehicleCategory={vehicleCategory}
          testimonials={testimonials}
        />
      </SearchProvider>
    </SSRProvider>
  )
}
export default VehicleCategoryPage
