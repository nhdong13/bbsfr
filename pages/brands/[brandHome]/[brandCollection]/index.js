import BrandCollectionComponent from "../../../../components/Brand/BrandCollection"
import {
  getBrandCollectionDetail,
  listAllBrands as listAllBrandsCollection,
} from "../../../../lib/prismic/api"
import { getDataForMainNav } from "../../../../services/mainNav"
import { Pipeline, Variables } from "@sajari/react-search-ui"
import { getConfigPipeline } from "../../../../services/getPipelineSajari"
import { mockupDataFilterBrand } from "../../../../services/brand"
import { search } from "@sajari/server"

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

export async function getStaticPaths() {
  const paths = []
  const response = await listAllBrandsCollection()
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
  const brandCollectionResponse = await getBrandCollectionDetail(
    params?.brandCollection
  )
  initVariable(params)
  const initialResponse = await search({
    pipeline,
    variables: searchObj.variables,
  })
  return {
    props: { dataNav, initialResponse, brandCollectionResponse },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const BrandCollectionPage = ({
  initialResponse,
  params,
  brandCollectionResponse,
}) => {
  if (!search.variables) {
    initVariable(params)
  }
  return (
    <BrandCollectionComponent
      initialResponse={initialResponse}
      pipeline={pipeline}
      variables={searchObj.variables}
      brandCollectionResponse={brandCollectionResponse}
    />
  )
}
export default BrandCollectionPage
