import { Pagination } from "@sajari/react-search-ui";
import { Container } from "react-bootstrap";
import styles from "./pagination.module.scss";
import { SearchProvider } from "@sajari/react-search-ui"

const PaginationComponent = ({ variables, pipeline }) => {
  return (
    <Container className={styles.containerPagination}>
      <SearchProvider
        search={{
          pipeline,
          variables,
        }}
        searchOnLoad
        customClassNames={{
          pagination: {
            container: "containerPagination",
            button: "buttonPagination",
            active: "activePagination",
            next: "nextPagination",
            prev: "prevPagination",
            spacerEllipsis: "spacerEllipsisPagination",
          },
        }}
      >
        <Pagination />
      </SearchProvider>
    </Container>
  )
}

export default PaginationComponent;
