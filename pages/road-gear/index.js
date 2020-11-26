import RoadGearComponent from "../../components/HomePage/DepartmentDetail/RoadGear";
import { getDepartmentByUID } from "../../lib/prismic/api";

function RoadGear({ department }) {
  return <RoadGearComponent department={department} />;
}

export async function getStaticProps() {
  const uid = "road-gear";
  const department = await getDepartmentByUID(uid);
  console.log(
    "Debug code process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME:",
    process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME
  );
  return {
    props: { department },
    revalidate: process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  };
}

export default RoadGear;
