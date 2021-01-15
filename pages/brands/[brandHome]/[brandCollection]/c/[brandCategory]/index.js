import BrandCategoryComponent from "../../../../../../components/Brand/BrandCategory"
// import { brandCategoryAPI, getBrandCategoryByUid, getAllBrandCategories } from "lib/prismic/api"
import { search } from "@sajari/server"
import { getDataForMainNav } from "services/mainNav"
import {
  listAllBrands,
  getBrandCategoryByUid,
  getBrandCollectionDetail,
} from "../../../../../../lib/prismic/api"
import { authenticationFromStamped } from "../../../../../../services/testimonial"
import { mockupDataFilterBrand } from "../../../../../../services/brand"
import {
  pipelineConfig,
  variablesConfig,
} from "../../../../../../lib/sajari/config"
import {
  brandFilter,
  categoryFilter,
  listBrandsFilter,
  priceRangeFilter,
  ratingFilter,
} from "../../../../../../lib/sajari/filter"
import { SSRProvider, SearchProvider } from "@sajari/react-search-ui"

export async function getStaticProps({ params }) {
  const category = await getBrandCategoryByUid(params.brandCategory)
  const dataNav = await getDataForMainNav()
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
      brandFilter,
      categoryFilter,
      ratingFilter,
    ],
  })

  return {
    props: {
      initialResponse,
      category,
      dataNav,
      testimonials,
      filter,
    },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

export async function getStaticPaths() {
  const paths = []
  const brands = await listAllBrands()
  const brandHomes = brands.map((brand) => ({
    uid: brand.node._meta.uid,
    brandCollections: brand.node.brand_collections,
  }))

  if (brandHomes.length > 0) {
    for (const collections of brandHomes) {
      if (collections?.brandCollections?.length > 0) {
        for (const collection of collections.brandCollections) {
          if (collection?.brand_collection_slug) {
            const { categories } = await getBrandCollectionDetail(
              collection.brand_collection_slug.substr(1)
            )
            if (categories && categories.length > 0) {
              for (let category of categories) {
                if (category && category.category_slug) {
                  paths.push(
                    `/brands/${collections.uid}${collection.brand_collection_slug}/c/${category.category_slug}`
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

const BrandCategoryPage = ({
  category,
  testimonials,
  initialResponse,
  filter,
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
            brandFilter,
            categoryFilter,
            ratingFilter,
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
        <BrandCategoryComponent
          category={category}
          testimonials={testimonials}
        />
      </SearchProvider>
    </SSRProvider>
  )
}
export default BrandCategoryPage
