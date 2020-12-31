import BrandComponent from "../../components/Brand"
import { getDataBrandDirectory } from "../../lib/prismic/api"
import { getDataForMainNav } from "../../services/mainNav"

export async function getStaticProps() {
  const dataNav = await getDataForMainNav()
  const brandDirectory = await getDataBrandDirectory()
  return {
    props: { dataNav, brandDirectory },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const BrandPage = ({ brandDirectory }) => {
  return <BrandComponent brandDirectory={brandDirectory} />
}
export default BrandPage
