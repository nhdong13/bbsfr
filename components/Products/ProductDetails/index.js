import { useProductDetails } from "@sdk/react"
import { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { Container, Row, Col } from "react-bootstrap"
import ProductImageCarousel from "../ProductImageCarousel"
import ProductVariant from "../ProductVariant"
import ProductShipping from "../ProductShipping"
import ProductDescription from "../ProductDescription"
import ProductDelivery from "../ProductDelivery"
import ProductReturns from "../ProductReturns"
import ProductCustomerReviews from "../ProductCustomerReviews"
import AddToCart from "../AddToCart"
import LoadingSpinner from "../../LoadingSpinner"
import SectionDivider from "../Components/SectionDividerComponent"
import styles from "../ProductDetails.module.scss"
import { renderStart } from "../../../services/renderStart"

function ProductDetailsComponent({ loading, product }) {
  const router = useRouter()

  const reviewRef = useRef(null)
  const scrollToComponent = () => {
    reviewRef.current.scrollIntoView({ behavior: "smooth" })
  }

  console.log(product)

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
              {renderStart(5, "20px", "20px", 5, "reviewStar")}
              <span>(47)</span>
            </div>
          </div>
          {/* <ProductVariant />
          <ProductShipping />
          <ProductDescription />
          <ProductDelivery />
          <ProductReturns /> */}
          <SectionDivider />
          <div ref={reviewRef}>
            <ProductCustomerReviews />
          </div>
          <SectionDivider />
          {/* <AddToCart /> */}
        </Container>
      )}
    </>
  )
}

export default ProductDetailsComponent
