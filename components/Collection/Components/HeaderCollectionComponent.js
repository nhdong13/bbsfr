import { useEffect, useState } from "react"
import { Pipeline, Summary } from "@sajari/react-search-ui"

import { Container } from "react-bootstrap"
import styles from "../Collections.module.scss"

const HeaderCollectionComponent = ({ pageHeading }) => {
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
  return (
    <Container fluid className={styles.header}>
      <div className={styles.content}>
        <div className={styles.page_heading_1}>awewe</div>
        <div className={styles.product_count}>121321 product</div>
      </div>
    </Container>
  )
}

export default HeaderCollectionComponent
