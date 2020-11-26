import { initializeApollo } from "../lib/apollo"
import { initializeStore } from "../redux/store"
import HomePage from "components/HomePage"
import {
  getAllBrands,
  getAllDepartments,
  getAllSEO,
  getAllFAQ,
} from "../lib/prismic/api";
import { useDispatch } from "react-redux";
import { setDepartments } from "../redux/reducers/departments";

function Home({ department, brands, SEO, resPriFAQ }) {
  const dispatch = useDispatch();
  let list_department = department[0].node.department_link;
  dispatch(setDepartments(list_department));
  return (
    <HomePage
      department={list_department}
      brands={brands}
      SEO={SEO}
      FAQ={resPriFAQ}
    />
  );
}

export async function getStaticProps({ req, res }) {
  const department = await getAllDepartments();
  const resp_brands = await getAllBrands();
  const resPriFAQ = await getAllFAQ();
  let resp_SEO = await getAllSEO();
  const SEO = resp_SEO[0].node;
  const brands = resp_brands[0].node.shop_by_brand_slider_content;
  // if (process.env.NODE_ENV !== "development") {
  //   await basicAuthMiddleware(req, res, {})
  // }
  const reduxStore = initializeStore();
  const apolloClient = initializeApollo();
  return {
    props: {
      initialReduxState: reduxStore.getState(),
      initialApolloState: apolloClient.cache.extract(),
      department,
      brands,
      SEO,
      resPriFAQ,
    },
    revalidate: process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  };
}
export default Home
