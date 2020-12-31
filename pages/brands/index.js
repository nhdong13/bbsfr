import BrandComponent from "../../components/Brand"
import { getDataForMainNav } from "../../services/mainNav"

export async function getStaticProps() {
  const dataNav = await getDataForMainNav()
  //Data brand_directory waiting the prismic data update
  return {
    props: { dataNav },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const BrandPage = () => {
  return <BrandComponent></BrandComponent>
}
export default BrandPage
