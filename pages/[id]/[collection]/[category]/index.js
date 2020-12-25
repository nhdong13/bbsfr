import {
  getAllDepartments,
  listAllocationsByDepartmentUID,
  listAllCategoriesOfCollection,
  getCategoryByUid,
} from "../../../../lib/prismic/api"
import { search } from "@sajari/server"
import { Pipeline, Variables } from "@sajari/react-search-ui"
import { getConfigPipeline } from "../../../../services/getPipelineSajari"
import { authenticationFromStamped } from "../../../../services/testimonial"
import CategoryComponent from "../../../../components/Category"

const pipeline = new Pipeline({ ...getConfigPipeline("best-buy") }, "query")
const variables = new Variables({ resultsPerPage: 20, q: "" })

export async function getStaticProps({ params }) {
  const requestOptions = authenticationFromStamped()
  const resStamped = await fetch(process.env.STAMPED_API_URL, requestOptions)
  const testimonials = await resStamped.json()
  const categoryData = await getCategoryByUid(params.category)
  const initialResponse = await search({
    pipeline,
    variables,
  })
  return {
    props: { categoryData, initialResponse, testimonials },
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
        const { categories } = await listAllCategoriesOfCollection(
          collection.collection_slug.substr(1)
        )
        if (categories && categories.length > 0) {
          for (let category of categories) {
            //loop path /[id]/[collection]/[category]
            if (category && category.category_slug) {
              paths.push(
                `${i.department_slug}${collection.collection_slug}${category.category_slug}`
              )
            }
          }
        }
      }
    }
  }
  return { paths, fallback: false }
}
const Category = ({ categoryData, initialResponse, testimonials }) => {
  return (
    <CategoryComponent
      categoryData={categoryData}
      initialResponse={initialResponse}
      pipeline={pipeline}
      variables={variables}
      testimonials={testimonials}
    />
  )
}
export default Category
