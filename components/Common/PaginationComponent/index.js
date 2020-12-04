import { Pagination } from "@sajari/react-search-ui";
import { Col, Container } from "react-bootstrap";
import styles from "./pagination.module.scss";

const PaginationComponent = () => {
  return (
    <Container className={styles.containerPagination}>
      <Pagination />
    </Container>
  );
};

export default PaginationComponent;
