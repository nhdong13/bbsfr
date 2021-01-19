import { useProductDetails } from "@sdk/react";
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Row, Col } from "react-bootstrap";
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
            <Col md={8} xs={12}>
              <Row>
                <ProductImageCarousel
                  images={product.images}
                  category={product.category}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      }
    </>

  )
}

export default ProductDetailsComponent;