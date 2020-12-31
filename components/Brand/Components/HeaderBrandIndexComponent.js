import { Container } from "react-bootstrap"
import styles from "../Brand.module.scss"

const HeaderBrandIndexComponent = ({ title }) => {
  return (
    <>
      <Container fluid className={styles.headerBrandIndex}>
        <p>{title}</p>
      </Container>
    </>
  )
}
export default HeaderBrandIndexComponent
