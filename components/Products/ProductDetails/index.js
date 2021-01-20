import BuyNowPayLaterComponent from "../BuyNowPayLater";
import { Container, Row, Col } from "react-bootstrap";
import ProductImageCarousel from "../ProductImageCarousel";
import ProductVariant from "../ProductVariant";
import ProductShipping from "../ProductShipping";
import AddToCart from "../AddToCart";
import LoadingSpinner from "../../LoadingSpinner";

function ProductDetailsComponent({ loading, product }) {
  return (
    <>
      {loading && <LoadingSpinner show={loading}></LoadingSpinner>}
      {!loading && product && (
        <Container fluid className="product-details">
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
          <ProductVariant />
          <ProductShipping />
          <BuyNowPayLaterComponent dataProduct={product} />
          <AddToCart />
        </Container>
      )}
    </>
  );
}

export default ProductDetailsComponent;
