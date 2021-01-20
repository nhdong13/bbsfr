import { useRouter } from "next/router";
import Head from "next/head";
import { productDetails } from "lib/@sdk/queries/products";
import { initializeApollo } from "lib/apollo";

import ProductDetailsComponent from "../../../components/Products/ProductDetails";
import { authenticationFromStamped } from "../../../services/testimonial";
import {
  initReviewOptions,
  initReviewSummaryOptions,
} from "../../../services/product";

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const response = await apolloClient.query({
    query: productDetails,
    variables: { slug: params.slug },
  });
  const requestOptions = initReviewSummaryOptions();

  // hard-coding productID = 123. will fill product id later
  const productID = 123;
  const reviewResponse = await fetch(
    `${process.env.STAMPED_REVIEW_API_URL}?search=${productID}`,
    initReviewOptions()
  );

  const reviewSummaryResponse = await fetch(
    process.env.STAMPED_RATING_SUMMARY_API_URL,
    initReviewSummaryOptions()
  );
  const reviews = await reviewResponse.json();
  const reviewSummary = await reviewSummaryResponse.json();

  const { data, loading } = response;
  return {
    props: {
      product: data.product,
      loading: loading,
      initialApolloState: apolloClient.cache.extract(),
      review: reviews,
      reviewSummary: reviewSummary,
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

function ProductDetails({ product, loading, review, reviewSummary }) {
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
      <ProductDetailsComponent
        loading={loading}
        product={product}
        review={review}
        reviewSummary={reviewSummary}
      />
    </>
  );
}

export default ProductDetails;
