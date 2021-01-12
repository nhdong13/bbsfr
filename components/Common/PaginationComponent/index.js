import { Pagination, SearchProvider, Variables } from "@sajari/react-search-ui"
import { Container } from "react-bootstrap";
import { constants } from "../../../constant"
import styles from "../Common.module.scss"

const PaginationComponent = ({
  variables,
  pipeline,
  initialResponse,
  filter,
}) => {
  return (
    <Container className={styles.containerPagination}>
      <SearchProvider
        search={{
          pipeline,
          // variables,
          variables: new Variables({
            resultsPerPage: constants.RESULT_PER_PAGE,
          }),
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
        defaultFilter={filter}
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
