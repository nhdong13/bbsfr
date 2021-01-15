import { Pagination } from "@sajari/react-search-ui"
import { Container } from "react-bootstrap"
import styles from "../Common.module.scss"

const PaginationComponent = ({}) => {
  return (
    <Container className={styles.containerPagination}>
      <Pagination compact={false} />
    </Container>
  )
}

export default PaginationComponent
