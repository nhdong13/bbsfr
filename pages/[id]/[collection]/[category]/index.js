import {
  getAllDepartments,
  listAllocationsByDepartmentUID,
  listAllCategoriesOfCollection,
  getCategoryByUid,
} from "../../../../lib/prismic/api"
import { search } from "@sajari/server"
import { authenticationFromStamped } from "../../../../services/testimonial"
import CategoryComponent from "../../../../components/Category"
import { getDataForMainNav } from "../../../../services/mainNav"
import { mockupDataFilterCategory } from "../../../../services/collection"
import { pipelineConfig, variablesConfig } from "../../../../lib/sajari/config"
import {
  categoryFilter,
  listBrandsFilter,
  priceRangeFilter,
  ratingFilter,
  colorFilter,
} from "../../../../lib/sajari/filter"
import { SSRProvider, SearchProvider } from "@sajari/react-search-ui"

export async function getStaticProps({ params }) {
  const requestOptions = authenticationFromStamped()
  const resStamped = await fetch(process.env.STAMPED_API_URL, requestOptions)
  const testimonials = await resStamped.json()
  const categoryData = await getCategoryByUid(params.category)
  const dataNav = await getDataForMainNav()
  //Filter options will replace base params for per page --> this is code demo
  const filter = `categories ~ ['${mockupDataFilterCategory(params)}']`
  const initialResponse = await search({
    pipeline: pipelineConfig,
    variables: variablesConfig(filter),
    filters: [
      listBrandsFilter,
      priceRangeFilter,
      categoryFilter,
      ratingFilter,
      colorFilter,
    ],
  })

  return {
    props: {
      categoryData,
      initialResponse,
      testimonials,
      dataNav,
      params,
      filter,
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
const Category = ({ categoryData, testimonials, initialResponse, filter }) => {
  return (
    <SSRProvider>
      <SearchProvider
        search={{
          pipeline: pipelineConfig,
          variables: variablesConfig(filter),
          filters: [
            listBrandsFilter,
            priceRangeFilter,
            categoryFilter,
            ratingFilter,
            colorFilter,
          ],
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
        defaultFilter={filter}
        customClassNames={{
          pagination: {
            container: "containerPagination",
            button: "buttonPagination",
            active: "activePagination",
            next: "nextPagination",
            prev: "prevPagination",
            spacerEllipsis: "spacerEllipsisPagination",
          },
        }}
      >
        <CategoryComponent
          categoryData={categoryData}
          testimonials={testimonials}
        />
      </SearchProvider>
    </SSRProvider>
  )
}
export default Category
