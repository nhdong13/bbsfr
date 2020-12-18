import CollectionComponent from "../../../components/Collection"
import {
  getAllDepartments,
  getAllSEO,
  getCollectionByUid,
  listAllocationsByDepartmentUID,
} from "../../../lib/prismic/api"
import { search } from "@sajari/server"
import { Pipeline, Variables } from "@sajari/react-search-ui"
import { getConfigPipeline } from "../../../services/getPipelineSajari"

const pipeline = new Pipeline({ ...getConfigPipeline("jackets-app") }, "app")
const variables = new Variables({ resultsPerPage: 20, q: "" })
  

export async function getStaticProps({ params }) {
  const collections = await getCollectionByUid(params.collection)
  const initialResponse = await search({
    pipeline,
    variables,
  })
  return {
    props: { initialResponse, collections },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

export async function getStaticPaths() {
  const department = await getAllDepartments()
  let list_department = department[0].node.department_link
  const paths = []
  for (let i of list_department) {
    const collections = await listAllocationsByDepartmentUID(
      i.department_slug.substr(1)
    )
    if (
      collections &&
      collections.collections &&
      collections.collections.length > 0
    ) {
      for (let collection of collections.collections) {
        paths.push(`${i.department_slug}${collection.collection_slug}`)
      }
    }
  }
  return { paths, fallback: false }
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


