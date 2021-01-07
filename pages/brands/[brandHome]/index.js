import BrandHomeComponent from "../../../components/Brand/BrandHome"
import { getBrandByUid, listAllBrands } from "../../../lib/prismic/api"
import { Pipeline, Variables } from "@sajari/react-search-ui"
import { search } from "@sajari/server"
import { getConfigPipeline } from "../../../services/getPipelineSajari"

const pipeline = new Pipeline({ ...getConfigPipeline("best-buy") }, "query")
const variables = new Variables({ resultsPerPage: 20, q: "" })

export async function getStaticProps({ params }) {
  const initialResponse = await search({
    pipeline,
    variables,
  })
  const brand = await getBrandByUid(params.brandHome)
  return {
    props: { initialResponse, brand },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

export async function getStaticPaths() {
  const paths = []
  const response = await listAllBrands()
  const brandCollections = response.map((i) => ({
    uid: i.node._meta.uid,
  }))
  if (brandCollections.length > 0) {
    for (const collections of brandCollections) {
      paths.push(`/brands/${collections.uid}`)
    }
  }
  return { paths, fallback: false }
}

const BrandHomePage = ({ initialResponse, brand }) => {
  return (
    <BrandHomeComponent
      initialResponse={initialResponse}
      pipeline={pipeline}
      variables={variables}
      brand={brand}
    />
  )
}
export default BrandHomePage
