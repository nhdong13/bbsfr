import { FilterBuilder, Pipeline, Results, SearchProvider, Variables } from "@sajari/react-search-ui"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import styles from "../Collections.module.scss"

const getWindowDimensions = () => {
  const router = useRouter();
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}

const ResultComponent = (props) => {
  const [column, setColumn] = useState(2)
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

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
  );

  console.log("Debug:", pipeline)

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

  // const collectionFilter = new FilterBuilder({
  //   field: "brand",
  //   initial: "iphone"
  // });

  const variables = new Variables({ resultsPerPage: 20 });

  return (
    <Container fluid style={{marginTop: 15}}>
      <SearchProvider
        search={{
          pipeline,
          variables,
          fields: {
            title: "name",
            image: "base_image",
            // rating: "",
          },
          // filters: [collectionFilter],
        }}
        searchOnLoad
      >
        <Results
          className={styles.result}
          columns={column}
          gap={4}
          appearance="grid"
        />
      </SearchProvider>
    </Container>
  )
}

export default ResultComponent
