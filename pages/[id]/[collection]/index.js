import CollectionComponent from "../../../components/Collection"
import { getAllSEO, getCollectionByUid } from "../../../lib/prismic/api";
import { useRouter } from "next/router"

function Collection({ collections }) {
  return <CollectionComponent collections={collections} />
}

export default Collection

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { id: "road-gear", collection: "road-jackets" } }, // See the "paths" section below
//     ],
//     fallback: false,
//   }
// }

export async function getServerSideProps(params) {
  const collections = await getCollectionByUid(params.query.collection);
  return {
    props: { collections },
    // revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}
