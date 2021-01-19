import { useProductDetails } from "@sdk/react"
import { useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { Container, Row } from "react-bootstrap"
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

function ProductDetailsComponent({ id }) {
  const router = useRouter()
  const { loading, data, error } = useProductDetails({ id: id })

  const reviewRef = useRef(null)
  const scrollToComponent = () => {
    reviewRef.current.scrollIntoView({ behavior: "smooth" })
  }

  console.log(data)
  useEffect(() => {
    if (!loading && (error || !data)) {
      router.push("/")
    }
  }, [data, loading])

  return (
    <>
      {loading && <LoadingSpinner show={loading}></LoadingSpinner>}

      {!loading && data && (
        <Container fluid className="product-details">
          <Row>
            <ProductImageCarousel images={data.images} />
          </Row>
          <div className={styles.productTitle}>
            <p className={styles.productCategory}>{data?.category?.name}</p>

            <p className={styles.productName}>{data?.name}</p>
            <div className={styles.reviewStar} onClick={scrollToComponent}>
              {renderStart(5, "20px", "20px", 5, "reviewStar")}
              <span>(47)</span>
            </div>
          </div>
          <ProductVariant />
          <ProductShipping />
          <ProductDescription />
          <ProductDelivery />
          <ProductReturns />
          <SectionDivider />
          <div ref={reviewRef}>
            <ProductCustomerReviews />
          </div>
          <SectionDivider />
          <AddToCart />
        </Container>
      )}
    </>
  )
}

export default ProductDetailsComponent
