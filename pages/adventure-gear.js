import AdventureGearComponent from "../components/HomePage/DepartmentDetail/AdventureGearComponent";
import { getDepartmentByUID } from "../lib/prismic/api";

function AdventureGear({ department }) {
  return <AdventureGearComponent department={department} />;
}

export async function getStaticProps() {
  const uid = "adventure-gear";
  const department = await getDepartmentByUID(uid);
  return {
    props: { department },
    revalidate: 1,
  };
}

export default AdventureGear;
