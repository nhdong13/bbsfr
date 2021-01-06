import { useSearchContext } from "@sajari/react-hooks"
import { Container } from "react-bootstrap"
import styles from "../Brand.module.scss"

const ImagedHeaderComponent = (props) => {
  const { imgUrl, header } = props
  const { totalResults } = useSearchContext()
  return (
    <Container
      fluid
      className={styles.imagedHeader}
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <div className={styles.header}>{header}</div>
      <div className={styles.productCount}>{`${
        totalResults != undefined ? totalResults : 0
      } Products`}</div>
    </Container>
  )
}
export default ImagedHeaderComponent
