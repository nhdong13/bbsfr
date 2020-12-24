import {
  getAllDepartments,
  getCollectionByUid,
  listAllocationsByDepartmentUID,
} from "../../../lib/prismic/api"
import { search } from "@sajari/server"
import { Pipeline, Variables } from "@sajari/react-search-ui"
import { getConfigPipeline } from "../../../services/getPipelineSajari"
import { authenticationFromStamped } from "../../../services/testimonial"
import dynamic from "next/dynamic"

const CollectionDynamic = dynamic(() =>
  import("../../../components/Collection")
)

const pipeline = new Pipeline({ ...getConfigPipeline("jackets-app") }, "app")
const variables = new Variables({ resultsPerPage: 20, q: "" })

export async function getStaticProps({ params }) {
  const requestOptions = authenticationFromStamped()
  const resStamped = await fetch(process.env.STAMPED_API_URL, requestOptions)
  const testimonials = await resStamped.json()

  const collections = await getCollectionByUid(params.collection)
  const initialResponse = await search({
    pipeline,
    variables,
  })
  return {
    props: { initialResponse, collections, testimonials },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

export async function getStaticPaths() {
  const department = await getAllDepartments()
  let list_department = department[0].node.department_link
  const paths = []
  for (let i of list_department) {
    const { collections } = await listAllocationsByDepartmentUID(
      i.department_slug.substr(1)
    )
    if (collections && collections.length > 0) {
      for (let collection of collections) {
        //loop path /[id]/[collection]
        if (collection && collection.collection_slug) {
          paths.push(`${i.department_slug}${collection.collection_slug}`)
        }
      }
    }
  }
  return { paths, fallback: false }
}

const Collection = ({ collections, initialResponse, testimonials }) => {
  return (
    <CollectionDynamic
      initialResponse={initialResponse}
      pipeline={pipeline}
      variables={variables}
      collections={collections}
      testimonials={testimonials}
    />
  )
}
export default Collection
