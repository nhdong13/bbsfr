import React, { useEffect, useState } from "react"
import { Pipeline, Summary, SearchProvider } from "@sajari/react-search-ui"

import { Container } from "react-bootstrap"
import styles from "../Collections.module.scss"
import { useSearch, Variables } from "@sajari/react-hooks"

const HeaderCollectionComponent = ({ pageHeading }) => {
  const [totalProduct, setTotalProduct] = useState(-1)
  const [isSetTotal, setTotal] = useState(false)
  const pipeline = new Pipeline(
    {
      // account: "1606874199975641114",
      // collection: "jackets-app",

      account: "1594153711901724220",
      collection: "bestbuy",
      endpoint: "https://jsonapi-us-valkyrie.sajari.net",
    },
    // "app"
    "query"
  )
  const variables = new Variables({ q: "" })

  const SearchPlayground = React.memo(() => {
    const { totalResults } = useSearch({
      variables,
      pipeline,
      fields: {},
    })
    totalResults != undefined && !isSetTotal && setTotalProduct(totalResults)
    totalProduct != -1 && setTotal(true)
    return (
      <>
        <div className={styles.product_count}>{`${totalProduct} Products`}</div>
      </>
    )
  })
  return (
    <Container fluid className={styles.header}>
      <div className={styles.content}>
        <div className={styles.page_heading_1}>{pageHeading}</div>
        <div className={styles.product_count}></div>
        <SearchPlayground />
      </div>
    </Container>
  )
}

export default HeaderCollectionComponent
