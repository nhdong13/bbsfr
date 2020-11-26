import React from "react"
import styles from "../HomePage.module.scss"

export default function renderParagraph({ pageParagraph, showMore, detect }) {
  return (
    <div className={styles.page_paragraph}>
      <div className={styles.page_paragraph}>
        {pageParagraph.map((paragraph, id) =>
          showMore ? (
            <p>
              {paragraph.text.link("facebook.com")}
              {paragraph.text}
            </p>
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
      </div>
    </div>
  )
}
