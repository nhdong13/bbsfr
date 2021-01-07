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
} from "../../../../../../lib/prismic/api"
import { authenticationFromStamped } from "../../../../../../services/testimonial"


const pipeline = new Pipeline({ ...getConfigPipeline("best-buy") }, "query")
const variables = new Variables({ resultsPerPage: 20, q: "" })


export async function getStaticProps({ params }) {
  const initialResponse = await search({
    pipeline,
    variables,
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
  const response = await getAllBrandCategories()
  const brandCagtegories = response.map((i) => ({
    uid: i?.node?._meta?.uid,
  }))

  // paths = brandCollections.map((collection) => {
  //   const brandHomeSlug = collection.uid
  //   const brandHomeCollectionSlug = collection.brand_collection_slug
  // })
  for (const home of brandHomes) {
    const brandHomeSlug = home.uid
    console.log(brandHomeSlug)

    for (const collection of home.brandCollections) {
      const brandHomeCollectionSlug = collection.brand_collection_slug
      if (brandHomeCollectionSlug && brandHomeSlug) {
        for (const category in brandCagtegories) {
          if (category.uid) {
            paths.push(`/brands/${brandHomeSlug}${brandHomeCollectionSlug}/c/${category.uid}`)
          }
        }
      }
    }
  }

  // if (brandCollections.length > 0) {
  //   for (const collections of brandCollections) {
  //     collections && paths.push(`/brands/shoei/brand-collection-test4/c/${collections?.uid}`)
  //   }
  // }
  return { paths, fallback: false }
}

const BrandCategoryPage = ( { initialResponse, category, testimonials } ) => {
  return <BrandCategoryComponent
    initialResponse={initialResponse}
    category={category}
    pipeline={pipeline}
    variables={variables}
    testimonials={testimonials}
  />
}
export default BrandCategoryPage
