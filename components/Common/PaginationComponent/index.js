import { Pagination, SearchProvider } from "@sajari/react-search-ui"
import { Container } from "react-bootstrap";
import styles from "./pagination.module.scss"

const PaginationComponent = ({ variables, pipeline, initialResponse }) => {
  return (
    <Container className={styles.containerPagination}>
      <SearchProvider
        search={{
          pipeline,
          variables,
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
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
