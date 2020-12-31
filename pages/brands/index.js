import BrandComponent from "../../components/Brand"
import { getDataBrandDirectory } from "../../lib/prismic/api"
import { getDataForMainNav } from "../../services/mainNav"

export async function getStaticProps() {
  const dataNav = await getDataForMainNav()
  const brandDirectory = await getDataBrandDirectory()
  console.log("Debug code brandDirectory:", brandDirectory)
  return {
    props: {},
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const BrandPage = () => {
  return <BrandComponent></BrandComponent>
}
export default BrandPage
