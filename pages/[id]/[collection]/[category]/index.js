import CategoryComponent from "../../../../components/Category"
import {
  getAllDepartments,
  listAllocationsByDepartmentUID,
  listAllCategoriesOfCollection,
  getCategoryByUid,
} from "../../../../lib/prismic/api"
import { search } from "@sajari/server"
import { Pipeline, Variables } from "@sajari/react-search-ui"
import { getConfigPipeline } from "../../../../services/getPipelineSajari"

const pipeline = new Pipeline({ ...getConfigPipeline("jackets-app") }, "app")
const variables = new Variables({ resultsPerPage: 20, q: "" })

export async function getStaticProps({ params }) {
  const categoryData = await getCategoryByUid(params.category)
  const initialResponse = await search({
    pipeline,
    variables,
  })
  return {
    props: { categoryData, initialResponse },
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
const Category = ({ categoryData, initialResponse }) => {
  return (
    <CategoryComponent
      categoryData={categoryData}
      initialResponse={initialResponse}
      pipeline={pipeline}
      variables={variables}
    />
  )
}
export default Category;
