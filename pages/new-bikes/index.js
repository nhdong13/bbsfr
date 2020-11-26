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
    revalidate: process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  };
}

export default NewBikes;
