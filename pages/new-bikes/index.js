import NewBikeComponent from "../../components/HomePage/DepartmentDetail/NewBikeComponent";
import { getDepartmentByUID } from "../../lib/prismic/api";

function NewBikes({ department }) {
  return <NewBikeComponent department={department} />;
}

export async function getStaticProps() {
  const uid = "new-bikes";
  const department = await getDepartmentByUID(uid);
  return {
    props: { department },
    revalidate: 1,
  };
}

export default NewBikes;
