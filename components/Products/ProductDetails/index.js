import { useProductDetails } from "@sdk/react";
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Row } from "react-bootstrap";
import ProductImageCarousel from "../ProductImageCarousel";
import ProductVariant from "../ProductVariant";
import ProductShipping from "../ProductShipping";
import ProductDescription from "../ProductDescription";
import ProductDelivery from "../ProductDelivery";
import ProductReturns from "../ProductReturns";
import ProductCustomerReviews from "../ProductCustomerReviews";
import AddToCart from "../AddToCart";
import LoadingSpinner from "../../LoadingSpinner";

function ProductDetailsComponent ({ loading, product }) {
  return(
    <>
      {
        loading &&
        <LoadingSpinner show={loading}></LoadingSpinner>
      }

      { !loading && product &&
        <Container fluid className='product-details' >
          <Row>
            <ProductImageCarousel />
          </Row>
          <ProductVariant />
          <ProductShipping />
          <ProductDescription />
          <ProductDelivery />
          <ProductReturns />
          <ProductCustomerReviews />
          <AddToCart />
        </Container>
      }
    </>

  )
}

export default ProductDetailsComponent;