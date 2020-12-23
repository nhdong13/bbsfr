import {
  getAllDepartments,
  listAllocationsByDepartmentUID,
  listAllCategoriesOfCollection,
} from "../../../../lib/prismic/api"

export async function getStaticProps({ params }) {
  return {
    props: {},
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
const Category = () => {
  return <div>Category</div>
}


export default Category;
