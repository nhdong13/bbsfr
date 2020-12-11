import CollectionComponent from "../../../components/Collection"
import { getCollectionByUid } from "../../../lib/prismic/api"
import { search } from "@sajari/server"
import { Pipeline } from "@sajari/react-search-ui"
import { getConfigPipeline } from "../../../services/getPipelineSajari"

const pipeline = new Pipeline({ ...getConfigPipeline("jackets-app") }, "app")

export async function getServerSideProps(params) {
  const initialResponse = await search({
    pipeline,
  })
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
      collections={collections}
    />
  )
}
export default Collection


