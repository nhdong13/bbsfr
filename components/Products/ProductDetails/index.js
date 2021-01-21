import { useProductDetails } from "@sdk/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import ProductImageCarousel from "../ProductImageCarousel";
import SizeSelector from "../SizeSelector";
import ProductShipping from "../ProductShipping";
import ProductDescription from "../ProductDescription";
import ProductDelivery from "../ProductDelivery";
import ProductReturns from "../ProductReturns";
import ProductCustomerReviews from "../ProductCustomerReviews";
import AddToCart from "../AddToCart";
import LoadingSpinner from "../../LoadingSpinner";
import styles from "./ProductDetails.module.scss";

function ProductDetailsComponent({ loading, product }) {
  const { variants } = product;

  const sizeVariants = variants.filter((variant) => {
    return variant.attributes.find((i) => i.attribute.name === "Size");
  });

  return (
    <>
      {loading && <LoadingSpinner show={loading}></LoadingSpinner>}

      {!loading && product && (
        <Container fluid className="product-details">
          <Row>
            <Col xs={12}>
              <Row>
                <ProductImageCarousel
                  images={product.images}
                  category={product.category}
                />
              </Row>
              <Row>
                <SizeSelector variants={sizeVariants} />
              </Row>
              <Row className={styles.productDescription}>
                <Col xs={12}>
                  <ProductDescription description={product.description} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default ProductDetailsComponent;
