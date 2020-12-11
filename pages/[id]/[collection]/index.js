import CollectionComponent from "../../../components/Collection"
import { getAllSEO, getCollectionByUid } from "../../../lib/prismic/api";
import { search } from "@sajari/server"
import { Pipeline, Variables } from "@sajari/react-search-ui"
import { getConfigPipeline } from "../../../services/getPipelineSajari"

const pipeline = new Pipeline({ ...getConfigPipeline("jackets-app") }, "app")
const variables = new Variables({ resultsPerPage: 20, q: "" })
  
export async function getServerSideProps(params) {
  const initialResponse = await search({
    pipeline,
    variables,
  })
  console.log("Debug code pipeline:", pipeline)
  const collections = await getCollectionByUid(params.query.collection)
  return {
    props: { collections, initialResponse },
  }
}

const Collection = ({ collections, initialResponse }) => {
  return (
    <CollectionComponent
      initialResponse={initialResponse}
      pipeline={pipeline}
      variables={variables}
      collections={collections}
    />
  )
}
export default Collection


