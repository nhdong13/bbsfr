import React, { useState } from "react"
import { Container, Collapse } from "react-bootstrap"
import styles from "../HomePage.module.scss"
import RenderParagraph from "./RenderParagraph"
import { RichText } from "prismic-reactjs"
import { convertParagraph } from "../../../services/seo.js"

export default function SEO(props) {
  const { heading1, pageParagraph } = props
  const [showMore, setRead] = useState(false)
  const [open, setOpen] = useState(false)

  let paragraph = convertParagraph(pageParagraph)

  return (
    <Container fluid id="SEO" className={styles.SEO}>
      <h2 className={`${styles.text_heading_line_40} d-flex`}>{heading1}</h2>
      <div className={styles.page_paragraph}>
        <RenderParagraph pageParagraph={pageParagraph} showMore={showMore} />
        <Collapse in={open}>
          <div id="collapse-text">
            <RichText render={paragraph} />
          </div>
        </Collapse>
        <div
          className={styles.read_more_btn}
          onClick={() => {
            setOpen(!open)
            setRead(!showMore)
          }}
          aria-controls="collapse-text"
          aria-expanded={open}
        >
          {showMore ? "Read Less" : "Read More"}
        </div>
      </div>
    </Container>
  )
}
