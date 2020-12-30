import { Container } from "react-bootstrap"
import styles from "../Brand.module.scss"

const HeaderBrandIndexComponent = ({}) => {
  return (
    <>
      <Container fluid className={styles.headerBrandIndex}>
        <p>Brand Directory</p>
      </Container>
    </>
  )
}
export default HeaderBrandIndexComponent
