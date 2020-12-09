import React, { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import ResultComponent from "./ResultComponent"
import styles from "./../Collections.module.scss"
import Image from "next/image"

const SortFilterComponent = ({ pipeline }) => {
  const isServer = () => typeof window === "undefined"
  return (
    <div>
      <Container fluid className={styles.filter_sort_sajari}>
        <div className={styles.short_filter}>
          <div className={styles.title} onClick={() => console.log("Sort")}>
            <Image src="/sortby.svg" width={7} height={11} />
            <div>Sort by</div>
          </div>
          <div className={styles.title} onClick={() => console.log("Filter")}>
            <Image src="/filter.svg" width={11} height={11} />
            <div>Filter</div>
          </div>
          <div className={styles.horizontal_line}></div>
        </div>
      </Container>
      <ResultComponent pipeline={pipeline} />
    </div>
  )
}

export default SortFilterComponent
