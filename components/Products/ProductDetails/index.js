import { useProductDetails } from "@sdk/react";
import ProductImageCarousel from "../ProductImageCarousel";
import ProductVariant from "../ProductVariant";
import ProductShipping from "../ProductShipping";
import ProductDescription from "../ProductDescription";
import ProductDelivery from "../ProductDelivery";
import ProductReturns from "../ProductReturns";
import ProductCustomerReviews from "../ProductCustomerReviews";
import AddToCart from "../AddToCart";


function ProductDetailsComponent ({id}) {
  const { loading, data, error } = useProductDetails({id: id})

  console.log(data)
  return(
    <div className='product-details' >
      <ProductImageCarousel />
      <ProductVariant />
      <ProductShipping />
      <ProductDescription />
      <ProductDelivery />
      <ProductReturns />
      <ProductCustomerReviews />
      <AddToCart />
    </div>
  )
}

export default ProductDetailsComponent;