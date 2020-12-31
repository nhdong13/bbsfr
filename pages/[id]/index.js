import DepartmentDetailComponent from "../../components/DepartmentDetail/DepartmentDetailComponent"
import { getDepartmentByUID, getAllDepartments } from "../../lib/prismic/api"
import { getDataForMainNav } from "../../services/mainNav"
import { authenticationFromStamped } from "../../services/testimonial"

function DepartmentPage({ department, testimonials }) {
  return (
    <DepartmentDetailComponent
      department={department}
      testimonials={testimonials}
    />
  )
}
export async function getStaticPaths() {
  const department = await getAllDepartments()
  let list_department = department[0].node.department_link
  const paths = list_department && list_department.map((i) => i.department_slug)
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const requestOptions = authenticationFromStamped()
  const res = await fetch(process.env.STAMPED_API_URL, requestOptions)
  const testimonials = await res.json()
  const department = await getDepartmentByUID(params.id)
  const dataNav = await getDataForMainNav()

  return {
    props: { department, testimonials, dataNav },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

export default DepartmentPage
