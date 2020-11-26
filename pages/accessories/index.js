import { getDepartmentByUID } from "../../lib/prismic/api";
import AccessoriesComponent from "../../components/HomePage/DepartmentDetail/AccessoriesComponent";

function Accessories({ department }) {
  return <AccessoriesComponent department={department} />;
}

export async function getStaticProps() {
  const uid = "accessories";
  const department = await getDepartmentByUID(uid);
  return {
    props: { department },
    revalidate: process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  };
}

export default Accessories;
