import BrandCollectionComponent from "../../../../components/Brand/BrandCollection"
import { listAllBrands as listAllBrandsCollection } from "../../../../lib/prismic/api"

export async function getStaticPaths() {
  const paths = []
  const response = await listAllBrandsCollection()
  const brandCollections =
    response?.length > 0 &&
    response.map((i) => ({
      brandCollections: i.node.brand_collections,
      uid: i.node._meta.uid,
    }))
  if (brandCollections.length > 0) {
    for (const collections of brandCollections) {
      if (collections?.brandCollections?.length > 0) {
        for (const collection of collections.brandCollections) {
          if (collection?.brand_collection_slug) {
            //loop path /brands/[brandHome]/[brandCollection]
            paths.push(
              `/brands/${collections.uid}${collection.brand_collection_slug}`
            )
          }
        }
      }
    }
  }
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  return {
    props: {},
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

const BrandCollectionPage = () => {
  return <BrandCollectionComponent />
}
export default BrandCollectionPage
