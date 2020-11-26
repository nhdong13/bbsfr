import React from "react"
import styles from "../HomePage.module.scss"
import {
  replaceNbsps,
  detectParagraph,
  updateParagraph,
} from "../../../services/seo.js"

export default function renderParagraph({ pageParagraph, showMore }) {
  console.log(pageParagraph)
  updateParagraph(pageParagraph)
  const limit_char = 480
  let detect = detectParagraph(pageParagraph, limit_char)
  return (
    <div className={styles.page_paragraph}>
      <div className={styles.page_paragraph}>
        {pageParagraph.map((paragraph, id) =>
          showMore ? (
            <div
              key={id}
              dangerouslySetInnerHTML={{
                __html: replaceNbsps(paragraph.text).link(
                  "https://www.w3schools.com"
                ),
              }}
            ></div>
          ) : id <= detect.position ? (
            id < detect.position ? (
              <div key={id}>{replaceNbsps(paragraph.text)}</div>
            ) : (
              <div
                key={id}
                dangerouslySetInnerHTML={{
                  __html: paragraph.text.substring(0, detect.substring),
                }}
              ></div>
            )
          ) : (
            ""
          )
        )}
      </div>
    </div>
  )
}
