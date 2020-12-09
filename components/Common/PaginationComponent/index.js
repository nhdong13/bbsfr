import { Pagination } from "@sajari/react-search-ui";
import { Container } from "react-bootstrap";
import styles from "./pagination.module.scss";

const PaginationComponent = () => {
  return (
    <Container className={styles.containerPagination}>
      <Pagination className={styles.pagination} />
    </Container>
  )
};

export default PaginationComponent;
