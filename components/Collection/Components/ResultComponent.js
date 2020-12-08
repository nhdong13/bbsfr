import {
  Pipeline,
  Results,
  SearchProvider,
  Variables,
} from "@sajari/react-search-ui"
import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import PaginationComponent from "../../Common/PaginationComponent"

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}

const ResultComponent = (props) => {
  const { pipeline } = props
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

  const variables = new Variables({ resultsPerPage: 20 })

  return (
    <Container fluid style={{ marginTop: 15 }}>
      {pipeline && (
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
            gap={1}
            appearance="grid"
          />
          <PaginationComponent />
        </SearchProvider>
      )}
    </Container>
  )
}

export default ResultComponent
