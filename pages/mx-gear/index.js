import MxGearComponent from "../../components/HomePage/DepartmentDetail/MxGearComponent";
import { getDepartmentByUID } from "../../lib/prismic/api";

function MxGear({ department }) {
  return <MxGearComponent department={department} />;
}

export async function getStaticProps() {
  const uid = "mx-gear";
  const department = await getDepartmentByUID(uid);
  return {
    props: { department },
    revalidate: process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  };
}

export default MxGear;
