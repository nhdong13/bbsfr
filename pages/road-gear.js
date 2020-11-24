import RoadGearComponent from "../components/HomePage/DepartmentDetail/RoadGear";
import { getDepartmentByUID } from "../lib/prismic/api";

function RoadGear({ department }) {
  return <RoadGearComponent department={department} />;
}

export async function getStaticProps() {
  const uid = "road-gear";
  const department = await getDepartmentByUID(uid);
  return {
    props: { department },
    revalidate: 1,
  };
}

export default RoadGear;
