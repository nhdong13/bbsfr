import BrandComponent from "../../components/Brand"
import { getDataBrandDirectory, listAllBrands } from "../../lib/prismic/api"
import { getDataForMainNav } from "../../services/mainNav"
import { authenticationFromStamped } from "../../services/testimonial"

export async function getStaticProps() {
  const dataNav = await getDataForMainNav()
  const brandDirectory = await getDataBrandDirectory()
  const brands = await listAllBrands()
  const requestOptions = authenticationFromStamped()
  const resStamped = await fetch(process.env.STAMPED_API_URL, requestOptions)
  const testimonials = await resStamped.json()
  return {
    props: { dataNav, brandDirectory, brands, testimonials },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const BrandPage = ({ brandDirectory, brands, testimonials }) => {
  return (
    <BrandComponent
      brands={brands}
      brandDirectory={brandDirectory}
      testimonials={testimonials}
    />
  )
}
export default BrandPage
