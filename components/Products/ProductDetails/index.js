import { useRef } from "react";
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
import Availability from "../Availability";
import SectionDivider from "../Components/SectionDividerComponent";
import styles from "../ProductDetails.module.scss";
import { renderStart } from "../../../services/renderStart";

function ProductDetailsComponent({
  loading,
  product,
  review,
  reviewSummary,
  question,
}) {
  const { variants } = product;

  const reviewRef = useRef(null);
  const scrollToComponent = () => {
    reviewRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const sizeVariants = variants; // temp

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
              <Row className={styles.productTitle}>
                <Container>
                  <p className={styles.productName}>{product?.name}</p>
                  <div
                    className={styles.reviewStar}
                    onClick={scrollToComponent}
                  >
                    {renderStart(
                      reviewSummary[0]?.rating,
                      "15px",
                      "15px",
                      5,
                      "reviewStar"
                    )}
                    <span>({reviewSummary[0]?.count})</span>
                  </div>
                </Container>
              </Row>
              <Row>
                <SizeSelector variants={sizeVariants} />
              </Row>
              <Row>
                <Availability />
              </Row>
              <Row className={styles.productDescription}>
                <ProductDescription description={product.description} />
              </Row>
              <Row ref={reviewRef}>
                <ProductCustomerReviews
                  reviews={review?.results}
                  reviewSummary={reviewSummary[0] || {}}
                  questions={question?.results}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default ProductDetailsComponent;
