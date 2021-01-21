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
              <Row>
                <SizeSelector variants={sizeVariants} />
              </Row>
              <SectionDivider />
              <Row className={styles.productDescription}>
                <Col xs={12}>
                  <ProductDescription description={product.description} />
                </Col>
              </Row>
            </Col>
          </Row>

          <SectionDivider />
          <div ref={reviewRef}>
            <ProductCustomerReviews
              reviews={review?.results}
              reviewSummary={reviewSummary[0] || {}}
              questions={question?.results}
            />
          </div>
          <SectionDivider />
        </Container>
      )}
    </>
  );
}

export default ProductDetailsComponent;
