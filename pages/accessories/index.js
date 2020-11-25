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
    revalidate: 1,
  };
}

export default Accessories;
