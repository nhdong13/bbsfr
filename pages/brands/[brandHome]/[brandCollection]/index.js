import BrandCollectionComponent from "../../../../components/Brand/BrandCollection"
import { getBrandCollectionDetail } from "../../../../lib/prismic/api"
import { getDataForMainNav } from "../../../../services/mainNav"
import {
  listAllBrandService,
  mockupDataFilterBrand,
} from "../../../../services/brand"
import { search } from "@sajari/server"
import { authenticationFromStamped } from "../../../../services/testimonial"
import { pipelineConfig, variablesConfig } from "../../../../lib/sajari/config"
import { SSRProvider, SearchProvider } from "@sajari/react-search-ui"
import {
  categoryFilter,
  colorFilter,
  listBrandsFilter,
  priceRangeFilter,
  ratingFilter,
} from "../../../../lib/sajari/filter"

export async function getStaticPaths() {
  const paths = []
  const response = await listAllBrandService()
  const brandCollections =
    response?.length > 0 &&
    response.map((i) => ({
      brandCollections: i.node.brand_collections,
      uid: i.node._meta.uid,
    }))
  if (brandCollections.length > 0) {
    for (const collections of brandCollections) {
      if (collections?.brandCollections?.length > 0) {
        for (const collection of collections.brandCollections) {
          if (collection?.brand_collection_slug) {
            //loop path /brands/[brandHome]/[brandCollection]
            paths.push(
              `/brands/${collections.uid}${collection.brand_collection_slug}`
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
  const brandCollectionResponse = await getBrandCollectionDetail(
    params?.brandCollection
  )
  //Filter options will replace base params for per page --> this is code demo
  const filter = `brand = "${mockupDataFilterBrand()}"`
  const initialResponse = await search({
    pipeline: pipelineConfig,
    variables: variablesConfig(filter),
    filters: [
      listBrandsFilter,
      priceRangeFilter,
      categoryFilter,
      ratingFilter,
      colorFilter,
    ],
  })
  return {
    props: {
      dataNav,
      initialResponse,
      brandCollectionResponse,
      testimonials,
      filter,
    },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const BrandCollectionPage = ({
  brandCollectionResponse,
  testimonials,
  filter,
  initialResponse,
}) => {
  return (
    <SSRProvider>
      <SearchProvider
        search={{
          pipeline: pipelineConfig,
          variables: variablesConfig(filter),
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
        defaultFilter={filter}
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
        <BrandCollectionComponent
          brandCollectionResponse={brandCollectionResponse}
          testimonials={testimonials}
        />
      </SearchProvider>
    </SSRProvider>
  )
}
export default BrandCollectionPage
