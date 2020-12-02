import DepartmentDetailComponent from "../../components/DepartmentDetail/DepartmentDetailComponent";
import { getDepartmentByUID, getAllDepartments } from "../../lib/prismic/api";

function DepartmentPage({ department }) {
  return <DepartmentDetailComponent department={department} />;
}

export async function getStaticPaths() {
  const department = await getAllDepartments();
  let list_department = department[0].node.department_link;
  const paths =
    list_department && list_department.map((i) => i.department_slug);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const department = await getDepartmentByUID(params.id);
  return {
    props: { department },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  };
}

export default DepartmentPage;
