import {
  FilterBuilder,
  Pipeline,
  Results,
  SearchProvider,
  Variables,
  Summary,
} from "@sajari/react-search-ui"
import { useEffect, useState } from "react"
import { Container, Row } from "react-bootstrap"
import PaginationComponent from "../../Common/PaginationComponent"
import styles from "../Collections.module.scss"

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}

const ResultComponent = (props) => {
  const [column, setColumn] = useState(2)
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => handleShowColumns())

  const pipeline = new Pipeline(
    {
      account: "1606874199975641114",
      collection: "jackets-app",
      // account: "1594153711901724220",
      // collection: "bestbuy",
      // endpoint: "https://jsonapi-us-valkyrie.sajari.net",
    },
    "app"
    // "query"
  )

  const handleShowColumns = () => {
    const { width } = windowDimensions
    if (width && width <= 425) {
      setColumn(2)
    } else if (width <= 1440) {
      setColumn(3)
    } else {
      setColumn(4)
    }
  }

  const variables = new Variables({ resultsPerPage: 20 });

  return (
    <Container fluid style={{ marginTop: 15 }}>
      <SearchProvider
        search={{
          pipeline,
          variables,
          fields: {
            title: "name",
            image: "base_image",
            rating: "",
          },
        }}
        searchOnLoad
      >
        <Results
          className="modifyResult"
          columns={column}
          gap={4}
          appearance="grid"
        />
        <PaginationComponent />
      </SearchProvider>
    </Container>
  );
}

export default ResultComponent
