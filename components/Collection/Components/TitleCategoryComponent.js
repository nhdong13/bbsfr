import { Container } from "react-bootstrap"
import styles from "./../Collections.module.scss"

const TitleCategoryComponent = ({ title }) => {
  return (
    <Container fluid style={{ paddingTop: "40px", paddingBottom: "17px" }}>
      <div className={styles.headerCategory}>{title}</div>
    </Container>
  )
}
export default TitleCategoryComponent
