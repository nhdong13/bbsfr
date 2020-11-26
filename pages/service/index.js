import ServiceComponent from "../../components/HomePage/DepartmentDetail/ServiceComponent";
import { getDepartmentByUID } from "../../lib/prismic/api";

function Service({ department }) {
  return <ServiceComponent department={department} />;
}

export async function getStaticProps() {
  const uid = "service";
  const department = await getDepartmentByUID(uid);
  return {
    props: { department },
    revalidate: process.env.REVALIDATE_PAGE_TIME,
  };
}

export default Service;
