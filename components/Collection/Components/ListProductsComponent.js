import styles from "../Collections.module.scss"
import dynamic from "next/dynamic"
const ProductDynamic = dynamic(() => import("./ProductComponent"))

const ListProductsComponent = ({ products }) => {
  return (
    <div className={styles.listProduct}>
      {products &&
        products.map((item, index) => (
          <ProductDynamic
            key={index}
            products={products}
            item={item}
            index={index}
          />
        ))}
    </div>
  )
}

export default ListProductsComponent
