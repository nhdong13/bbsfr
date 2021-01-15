import BrandHomeComponent from "../../../components/Brand/BrandHome"
import { getBrandByUid, listAllBrands } from "../../../lib/prismic/api"
import { search } from "@sajari/server"
import { getDataForMainNav } from "../../../services/mainNav"
import { authenticationFromStamped } from "../../../services/testimonial"
import { mockupDataFilterBrand } from "../../../services/brand"
import { pipelineConfig, variablesConfig } from "../../../lib/sajari/config"
import {
  brandFilter,
  categoryFilter,
  listBrandsFilter,
  priceRangeFilter,
  ratingFilter,
} from "../../../lib/sajari/filter"

export async function getStaticProps({ params }) {
  const brand = await getBrandByUid(params.brandHome)
  const requestOptions = authenticationFromStamped()
  const resStamped = await fetch(process.env.STAMPED_API_URL, requestOptions)
  const testimonials = await resStamped.json()
  const dataNav = await getDataForMainNav()
  //Filter options will replace base params for per page --> this is code demo
  const filter = `brand = "${mockupDataFilterBrand()}"`
  const initialResponse = await search({
    pipeline: pipelineConfig,
    variables: variablesConfig(filter),
    filters: [
      listBrandsFilter,
      priceRangeFilter,
      brandFilter,
      categoryFilter,
      ratingFilter,
    ],
  })

  return {
    props: {
      initialResponse,
      brand,
      dataNav,
      testimonials,
      filter,
      timeNow: Date.now(),
    },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

export async function getStaticPaths() {
  const paths = []
  const response = await listAllBrands()
  const brandCollections = response.map((i) => ({
    uid: i.node._meta.uid,
  }))
  if (brandCollections.length > 0) {
    for (const collections of brandCollections) {
      paths.push(`/brands/${collections.uid}`)
    }
  }
  return { paths, fallback: false }
}

const BrandHomePage = ({ brand, testimonials }) => {
  return <BrandHomeComponent brand={brand} testimonials={testimonials} />
}
export default BrandHomePage
