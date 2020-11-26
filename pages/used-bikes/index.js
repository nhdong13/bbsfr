import UsedBikeComponent from "../../components/HomePage/DepartmentDetail/UsedBikeComponent";
import { getDepartmentByUID } from "../../lib/prismic/api";

function UsedBikes({ department }) {
  return <UsedBikeComponent department={department} />;
}

export async function getStaticProps() {
  const uid = "used-bikes";
  const department = await getDepartmentByUID(uid);
  return {
    props: { department },
    revalidate: process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  };
}

export default UsedBikes;
