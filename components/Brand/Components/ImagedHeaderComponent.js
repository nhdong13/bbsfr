import { useSearchContext } from "@sajari/react-hooks"
import { Container } from "react-bootstrap"
import styles from "../Brand.module.scss"

const ImagedHeaderComponent = (props) => {
  const { imgUrl, header, notShowProductCount } = props
  const { totalResults } = useSearchContext()
  return (
    <Container
      fluid
      className={styles.imagedHeader}
      style={
        imgUrl && imgUrl != ""
          ? {
              backgroundImage: `url(${imgUrl})`,
            }
          : { backgroundColor: "#181818" }
      }
    >
      <div className={styles.header}>{header}</div>
      <div className={styles.productCount}>
        {!notShowProductCount
          ? `${totalResults != undefined ? totalResults : 0} Products`
          : "\u00A0"}
      </div>
    </Container>
  )
}
export default ImagedHeaderComponent
