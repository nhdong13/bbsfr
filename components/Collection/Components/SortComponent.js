import React, { useState } from "react"
import styles from "../Collections.module.scss"
import { Collapse } from "react-bootstrap"
import Image from "next/image"
import Filter from "../../Common/Filter"
import SortingComponent from "../../Common/Sorting"

const SortComponent = ({
  setChanged,
  filter,
  pipeline,
  initialResponse,
  variables,
}) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className={styles.sort_filter_by}>
        <div className={styles.sub_heading}>SORT BY</div>
        <div className={`${styles.group_heading} ${open ? styles.active : ""}`}>
          <div
            onClick={() => setOpen(!open)}
            aria-controls="sort-collapse"
            aria-expanded={open}
          >
            <div className={styles.text_heading}>
              <div className={styles.text}>Featured</div>
              <div className={styles.icon}>
                <Image
                  src={open ? "/icons/subtract.svg" : "/icons/plus.svg"}
                  alt={open ? "Icon subtract" : "Icon plus"}
                  loading="lazy"
                  layout="fill"
                ></Image>
              </div>
            </div>
          </div>
          <div className={styles.sort_filter_collapse}>
            <Collapse in={open}>
              <div>
                <SortingComponent
                  filter={filter}
                  pipeline={pipeline}
                  initialResponse={initialResponse}
                  setChanged={setChanged}
                  variables={variables}
                />
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  )
}

export default SortComponent
