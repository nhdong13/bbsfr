import { Container } from "react-bootstrap"
import styles from "../Brand.module.scss"

const ImagedHeaderComponent = (props) => {
  const { imgUrl, header, productsCount } = props
  return (
    <Container
      fluid
      className={styles.imagedHeader}
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div className={styles.header}>{header}</div>
      <div className={styles.productCount}>{productsCount} products</div>
    </Container>
  )
}
export default ImagedHeaderComponent
