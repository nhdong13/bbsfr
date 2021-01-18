import { useRouter } from 'next/router'
import { productDetails } from "lib/@sdk/queries/products";
import { initializeApollo } from "lib/apollo";


import ProductDetailsComponent from "../../../components/Products/ProductDetails";

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const response = await apolloClient.query({
    query: productDetails,
    variables: {id: params.id}
  });

  const { data, loading } = response;  
  return {
    props: { 
      product: data.product,
      loading: loading,
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '*' } }
    ],
    fallback: 'blocking'
  };
}

function ProductDetails({product, loading}) {
  const router = useRouter();
  const { id } = router.query;
  return(
    <>
      {
        id &&
        <ProductDetailsComponent
          loading={loading}
          product={product}
        />
      }
    </>
  )
}

export default ProductDetails;