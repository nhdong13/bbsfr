import { useRef } from "react";
import { useRouter } from "next/router";
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
import SectionDivider from "../Components/SectionDividerComponent";
import styles from "../ProductDetails.module.scss";
import { renderStart } from "../../../services/renderStart";
import { reviewData } from "../../../services/product";

function ProductDetailsComponent({
  loading,
  product,
  review,
  reviewSummary,
  question,
}) {
  const router = useRouter();

  const reviewRef = useRef(null);
  const scrollToComponent = () => {
    reviewRef.current.scrollIntoView({ behavior: "smooth" });
  };

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
          <div className={styles.productTitle}>
            <p className={styles.productName}>{product?.name}</p>
            <div className={styles.reviewStar} onClick={scrollToComponent}>
              {renderStart(
                reviewSummary[0]?.rating,
                "15px",
                "15px",
                5,
                "reviewStar"
              )}
              <span>({reviewSummary[0]?.count})</span>
            </div>
          </div>
          {/* <ProductVariant />
          <ProductShipping />
          <ProductDescription />
          <ProductDelivery />
          <ProductReturns /> */}
          <SectionDivider />
          <div ref={reviewRef}>
            <ProductCustomerReviews
              reviews={review?.results}
              reviewSummary={reviewSummary[0] || {}}
              questions={question?.results}
            />
          </div>
          <SectionDivider />
          {/* <AddToCart /> */}
        </Container>
      )}
    </>
  );
}

export default ProductDetailsComponent;
