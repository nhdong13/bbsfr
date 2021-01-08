import { Pipeline, Variables } from "@sajari/react-hooks"
import { search } from "@sajari/server"
import BrandRangeComponent from "../../../../../../components/Brand/BrandRange"
import {
  getBrandRangeByUid,
  listAllBrands,
  listAllBrandRangesOfCollection,
} from "../../../../../../lib/prismic/api"
import { mockupDataFilterBrand } from "../../../../../../services/brand"
import { getConfigPipeline } from "../../../../../../services/getPipelineSajari"
import { getDataForMainNav } from "../../../../../../services/mainNav"
import { authenticationFromStamped } from "../../../../../../services/testimonial"

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
  const dataNav = await getDataForMainNav()
  const brandRange = await getBrandRangeByUid(params?.brandRange)
  initVariable(params)
  const initialResponse = await search({
    pipeline,
    variables: searchObj.variables,
  })
  const requestOptions = authenticationFromStamped()
  const resStamped = await fetch(process.env.STAMPED_API_URL, requestOptions)
  const testimonials = await resStamped.json()

  return {
    props: { initialResponse, brandRange, dataNav, testimonials },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

export async function getStaticPaths() {
  const paths = []
  const response = await listAllBrands()
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
  initialResponse,
  brandRange,
  testimonials,
  params,
}) => {
  if (!search.variables) {
    initVariable(params)
  }
  return (
    <BrandRangeComponent
      initialResponse={initialResponse}
      pipeline={pipeline}
      variables={searchObj.variables}
      brandRange={brandRange}
      testimonials={testimonials}
    />
  )
}
export default BrandRangePage
