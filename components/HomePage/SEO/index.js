import React, { useState } from "react"
import { Container, Button } from "react-bootstrap"
import styles from "../HomePage.module.scss"
import RenderParagraph from "./RenderParagraph"
import Link from "next/link"

export default function SEO(props) {
  const { heading1, pageParagraph } = props
  const [showMore, setRead] = useState(false)
  function readMore() {
    setRead(!showMore)
  }

  return (
    <Container fluid id="SEO" className={styles.SEO}>
      <h2 className={`${styles.text_heading_line_40} d-flex`}>{heading1}</h2>
      {/* <div className={styles.page_paragraph}>
        {pageParagraph.map((paragraph, id) =>
          showMore ? (
            <p>{paragraph.text}</p>
          ) : id <= detect.position ? (
            id < detect.position ? (
              <p>{paragraph.text}</p>
            ) : (
              <p>{`${paragraph.text.substring(0, detect.substring - 1)}...`}</p>
            )
          ) : (
            ""
          )
        )}
      </div> */}
      <RenderParagraph pageParagraph={pageParagraph} showMore={showMore} />
      <div className={styles.read_more_btn} onClick={readMore}>
        {showMore ? "Read Less" : "Read More"}
      </div>
    </Container>
  )
}
