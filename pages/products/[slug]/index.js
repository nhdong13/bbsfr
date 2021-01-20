import { useRouter } from "next/router";
import Head from "next/head";
import { productDetails } from "lib/@sdk/queries/products";
import { initializeApollo } from "lib/apollo";

import ProductDetailsComponent from "../../../components/Products/ProductDetails";

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const response = await apolloClient.query({
    query: productDetails,
    variables: { slug: params.slug },
  });

  const { data, loading } = response;
  return {
    props: {
      product: data.product,
      loading: loading,
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "" } }],
    fallback: "blocking",
  };
}

function ProductDetails({ product, loading }) {
  const { seoTitle, seoDescription } = product;

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta
          name="og:description"
          property="og:description"
          content={seoDescription}
        />
        <meta name="og:title" property="og:title" content={seoTitle} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
      </Head>
      {<ProductDetailsComponent loading={loading} product={product} />}
    </>
  );
}

export default ProductDetails;
