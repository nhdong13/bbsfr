import { search } from "@sajari/server"
import BrandRangeComponent from "../../../../../../components/Brand/BrandRange"
import {
  getBrandRangeByUid,
  listAllBrandRangesOfCollection,
} from "../../../../../../lib/prismic/api"
import {
  pipelineConfig,
  variablesConfig,
} from "../../../../../../lib/sajari/config"
import {
  categoryFilter,
  colorFilter,
  listBrandsFilter,
  priceRangeFilter,
  ratingFilter,
} from "../../../../../../lib/sajari/filter"
import {
  listAllBrandService,
  mockupDataFilterBrand,
} from "../../../../../../services/brand"
import { getDataForMainNav } from "../../../../../../services/mainNav"
import { authenticationFromStamped } from "../../../../../../services/testimonial"
import { SSRProvider, SearchProvider } from "@sajari/react-search-ui"

export async function getStaticProps({ params }) {
  const dataNav = await getDataForMainNav()
  const brandRange = await getBrandRangeByUid(params?.brandRange)
  const requestOptions = authenticationFromStamped()
  const resStamped = await fetch(process.env.STAMPED_API_URL, requestOptions)
  const testimonials = await resStamped.json()
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
      initialResponse,
      brandRange,
      dataNav,
      testimonials,
      filter,
    },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

export async function getStaticPaths() {
  const paths = []
  const response = await listAllBrandService()
  const brandCollections = response.map((i) => ({
    uid: i.node._meta.uid,
    brandCollections: i.node.brand_collections,
  }))

  if (brandCollections.length > 0) {
    for (const collections of brandCollections) {
      if (collections?.brandCollections?.length > 0) {
        for (const collection of collections.brandCollections) {
          if (collection?.brand_collection_slug) {
            const { ranges } = await listAllBrandRangesOfCollection(
              collection.brand_collection_slug.substr(1)
            )
            if (ranges && ranges.length > 0) {
              for (let range of ranges) {
                if (range && range.range_slug) {
                  paths.push(
                    `/brands/${collections.uid}${collection.brand_collection_slug}/r/${range.range_slug}`
                  )
                }
              }
            }
          }
        }
      }
    }
  }
  return { paths, fallback: false }
}

const BrandRangePage = ({
  brandRange,
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
        <BrandRangeComponent
          brandRange={brandRange}
          testimonials={testimonials}
        />
      </SearchProvider>
    </SSRProvider>
  )
}
export default BrandRangePage
