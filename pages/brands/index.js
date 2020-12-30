import BrandComponent from "../../components/Brand"

export async function getStaticProps() {
  //Data brand_directory waiting the prismic data update
  return {
    props: {},
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const BrandPage = () => {
  return <BrandComponent></BrandComponent>
}
export default BrandPage
