import BrandComponent from "../../components/Brand"
import { getDataBrandDirectory, getDataBrands } from "../../lib/prismic/api"
import { getDataForMainNav } from "../../services/mainNav"

export async function getStaticProps() {
  const dataNav = await getDataForMainNav()
  const brandDirectory = await getDataBrandDirectory()
  const brands = await getDataBrands()
  return {
    props: { dataNav, brandDirectory, brands },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const BrandPage = ({ brandDirectory, brands }) => {
  return <BrandComponent brands={brands} brandDirectory={brandDirectory} />
}
export default BrandPage
