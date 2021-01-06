import {
  getAllDepartments,
  getCollectionByUid,
  listAllocationsByDepartmentUID,
} from "../../../lib/prismic/api"
import { search } from "@sajari/server"
import { Pipeline, Variables } from "@sajari/react-search-ui"
import { getConfigPipeline } from "../../../services/getPipelineSajari"
import { authenticationFromStamped } from "../../../services/testimonial"
import CollectionComponent from "../../../components/Collection"
import { getDataForMainNav } from "../../../services/mainNav"
import { mockupDataFilterCategory } from "../../../services/collection"

const pipeline = new Pipeline({ ...getConfigPipeline("best-buy") }, "query")

var searchObj = {
  variables: null,
}

const initVariable = (params) => {
  //Filter options will replace base params for per page --> this is code demo
  const category = mockupDataFilterCategory(params)
  searchObj.variables = new Variables({
    resultsPerPage: 20,
    q: "",
    filter: `categories ~ ['${category}']`,
  })
}

export async function getStaticProps({ params }) {
  const requestOptions = authenticationFromStamped()
  const resStamped = await fetch(process.env.STAMPED_API_URL, requestOptions)
  const testimonials = await resStamped.json()
  const collections = await getCollectionByUid(params.collection)
  const dataNav = await getDataForMainNav()
  initVariable(params)

  const initialResponse = await search({
    pipeline,
    variables: searchObj.variables,
  })

  return {
    props: {
      initialResponse,
      collections,
      testimonials,
      dataNav,
      params,
    },
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

const Collection = ({ collections, testimonials, params, initialResponse }) => {
  if (!search.variables) {
    initVariable(params)
  }
  return (
    <CollectionComponent
      initialResponse={initialResponse}
      pipeline={pipeline}
      variables={searchObj.variables}
      collections={collections}
      testimonials={testimonials}
    />
  )
}
export default Collection
