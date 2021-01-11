import BrandCategoryComponent from "../../../../../../components/Brand/BrandCategory"
// import { brandCategoryAPI, getBrandCategoryByUid, getAllBrandCategories } from "lib/prismic/api"
import { Pipeline, Variables } from "@sajari/react-search-ui"
import { search } from "@sajari/server"
import { getConfigPipeline } from "services/getPipelineSajari"
import { getDataForMainNav } from "services/mainNav"
import {
  listAllBrands,
  getAllBrandCategories,
  getBrandCategoryByUid,
  getBrandCollectionDetail,
} from "../../../../../../lib/prismic/api"
import { authenticationFromStamped } from "../../../../../../services/testimonial"
import { mockupDataFilterBrand } from "../../../../../../services/brand"

const pipeline = new Pipeline({ ...getConfigPipeline("best-buy") }, "query")
var searchObj = { variables: null }

const initVariable = (params) => {
  //Filter options will replace base params for per page --> this is code demo
  searchObj.variables = new Variables({
    resultsPerPage: 20,
    q: "",
    filter: `brand = "${mockupDataFilterBrand()}"`,
  })
}

export async function getStaticProps({ params }) {
  initVariable(params)
  const initialResponse = await search({
    pipeline,
    variables: searchObj.variables,
  })
  const category = await getBrandCategoryByUid(params.brandCategory)
  const dataNav = await getDataForMainNav()
  const requestOptions = authenticationFromStamped()
  const resStamped = await fetch(process.env.STAMPED_API_URL, requestOptions)
  const testimonials = await resStamped.json()

  return {
    props: { initialResponse, category, dataNav, testimonials },
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
  initialResponse,
  category,
  testimonials,
  params,
}) => {
  if (!search.variables) {
    initVariable(params)
  }
  return (
    <BrandCategoryComponent
      initialResponse={initialResponse}
      category={category}
      pipeline={pipeline}
      variables={searchObj.variables}
      testimonials={testimonials}
    />
  )
}
export default BrandCategoryPage
