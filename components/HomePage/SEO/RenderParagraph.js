import React from "react"
import styles from "../HomePage.module.scss"
import { replaceNbsps, detectParagraph } from "../../../services/seo.js"

export default function renderParagraph({ pageParagraph, showMore }) {
  const limit_char = 480
  let detect = detectParagraph(pageParagraph, limit_char)
  return (
    <div className={`${styles.page_paragraph} ${showMore ? "d-none" : ""}`}>
      {pageParagraph.map((paragraph, id) =>
        id <= detect.position ? (
          id < detect.position ? (
            <div key={id}>{replaceNbsps(paragraph.text)}</div>
          ) : (
            <div key={id}>
              {`${paragraph.text.substring(0, detect.substring)}...`}
            </div>
          )
        ) : (
          ""
        )
      )}
    </div>
  )
}
