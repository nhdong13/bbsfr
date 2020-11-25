import AccessoriesComponent from "../components/HomePage/DepartmentDetail/AccessoriesComponent";
import { getDepartmentByUID } from "../lib/prismic/api";

function UsedBikes({ department }) {
  return <AccessoriesComponent department={department} />;
}

export async function getStaticProps() {
  const uid = "accessories";
  const department = await getDepartmentByUID(uid);
  return {
    props: { department },
    revalidate: 1,
  };
}

export default UsedBikes;
