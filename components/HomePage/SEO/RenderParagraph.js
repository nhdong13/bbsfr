import React from "react"
import styles from "../HomePage.module.scss"

export default function renderParagraph({ pageParagraph, showMore, detect }) {
  let s
  return (
    <div className={styles.page_paragraph}>
      <div className={styles.page_paragraph}>
        {pageParagraph.map((paragraph, id) =>
          showMore ? (
            <p
              dangerouslySetInnerHTML={{
                __html: paragraph.text.link("facebook.com"),
              }}
            ></p>
          ) : id <= detect.position ? (
            id < detect.position ? (
              <p>{paragraph.text.link("facebook.com")}</p>
            ) : (
              <p>{`${paragraph.text
                .substring(0, detect.substring - 1)
                .link("facebook.com")}...`}</p>
            )
          ) : (
            ""
          )
        )}
      </div>
    </div>
  )
}
