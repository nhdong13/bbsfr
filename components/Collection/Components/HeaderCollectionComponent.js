import React, { useEffect, useState } from "react"
import { Pipeline, Summary, SearchProvider } from "@sajari/react-search-ui"

import { Container } from "react-bootstrap"
import styles from "../Collections.module.scss"
import { useSearch, Variables } from "@sajari/react-hooks"

const HeaderCollectionComponent = ({ pageHeading }) => {
  const pipeline = new Pipeline(
    {
      account: "1606874199975641114",
      collection: "jackets-app",
    },
    "app"
  )
  const variables = new Variables({ q: "" })

  const SearchPlayground = React.memo(() => {
    const { totalResults } = useSearch({
      variables,
      pipeline,
      fields: {},
    })
    return (
      <>
        <div className={styles.product_count}>{`${
          totalResults != undefined ? totalResults : 0
        } Products`}</div>
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
