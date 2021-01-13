import { Container } from "react-bootstrap"
import styles from "../Vehicles.module.scss"

const HeaderBrandIndexComponent = ({ title }) => {
  return (
    <>
      <Container fluid className={styles.headerVehiclesIndex}>
        <p>{title}</p>
      </Container>
    </>
  )
}
export default HeaderBrandIndexComponent
