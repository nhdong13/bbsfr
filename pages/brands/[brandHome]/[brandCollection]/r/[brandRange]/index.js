import { Pipeline, Variables } from "@sajari/react-hooks"
import { search } from "@sajari/server"
import BrandRangeComponent from "../../../../../../components/Brand/BrandRange"
import {
  getBrandRangeByUid,
  listAllBrands,
  listAllBrandRangesOfCollection,
} from "../../../../../../lib/prismic/api"
import { getConfigPipeline } from "../../../../../../services/getPipelineSajari"
import { getDataForMainNav } from "../../../../../../services/mainNav"
import { authenticationFromStamped } from "../../../../../../services/testimonial"

const pipeline = new Pipeline({ ...getConfigPipeline("best-buy") }, "query")
const variables = new Variables({ resultsPerPage: 20, q: "" })

export async function getStaticProps({ params }) {
  const initialResponse = await search({
    pipeline,
    variables,
  })
  const brandRange = await getBrandRangeByUid(params.brandRange)
  const requestOptions = authenticationFromStamped()
  const resStamped = await fetch(process.env.STAMPED_API_URL, requestOptions)
  const testimonials = await resStamped.json()
  const dataNav = await getDataForMainNav()
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

const BrandRangePage = ({ initialResponse, brandRange, testimonials }) => {
  return (
    <BrandRangeComponent
      initialResponse={initialResponse}
      pipeline={pipeline}
      variables={variables}
      brandRange={brandRange}
      testimonials={testimonials}
    />
  )
}
export default BrandRangePage
