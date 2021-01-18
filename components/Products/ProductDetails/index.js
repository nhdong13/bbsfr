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


function ProductDetailsComponent ({id}) {
  const router = useRouter();
  const { loading, data, error } = useProductDetails({id: id})

  console.log(data)
  useEffect(() => {
    if (!loading && (error || !data)) {
      router.push('/')
    }
  }, [data, loading])

  return(
    <>
      {
        loading &&
        <LoadingSpinner show={loading}></LoadingSpinner>
      }

      { !loading && data &&
        <Container fluid className='product-details' >
          <Row>
            <ProductImageCarousel images={data.images}/>
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