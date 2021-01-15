import { useRouter } from 'next/router'

import ProductDetailsComponent from "../../../components/Products/ProductDetails";

function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  return(
    <>
      {
        id &&
        <ProductDetailsComponent id={id}/>
      }
    </>
  )
}

export default ProductDetails;