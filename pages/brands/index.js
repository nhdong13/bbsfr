import BrandComponent from "../../components/Brand"
import { getDataBrandDirectory } from "../../lib/prismic/api"
<<<<<<< Updated upstream
=======
import { getDataForMainNav } from "../../services/mainNav"
>>>>>>> Stashed changes

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
