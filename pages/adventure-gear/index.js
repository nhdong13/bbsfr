import AdventureGearComponent from "../../components/HomePage/DepartmentDetail/AdventureGearComponent";
import { getDepartmentByUID } from "../../lib/prismic/api";

function AdventureGear({ department }) {
  return <AdventureGearComponent department={department} />;
}

export async function getStaticProps() {
  const uid = "adventure-gear";
  const department = await getDepartmentByUID(uid);
  return {
    props: { department },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  };
}

export default AdventureGear;
