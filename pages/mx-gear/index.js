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
    revalidate: 1,
  };
}

export default MxGear;
