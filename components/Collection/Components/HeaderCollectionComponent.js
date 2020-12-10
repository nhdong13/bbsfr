import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import styles from "../Collections.module.scss"
import { useSearch, Variables } from "@sajari/react-hooks"

const HeaderCollectionComponent = ({ pageHeading, pipeline }) => {
  const variables = new Variables({ q: "" })

  const { totalResults } = useSearch({
    variables,
    pipeline,
    fields: {},
  })

  return (
    <>
      <Container fluid className={styles.headerCollectionPage}>
        <div className={styles.contentHeader}>
          <div className={styles.page_heading_1_collection_page}>
            {pageHeading}
          </div>
          <div className={styles.product_count_collection_page}></div>
          <div className={styles.product_count_collection_page}>{`${
            totalResults != undefined ? totalResults : 0
          } Products`}</div>
        </div>
      </Container>
    </>
  )
}

export default HeaderCollectionComponent
