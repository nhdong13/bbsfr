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
    revalidate: 1,
  };
}

export default Service;
