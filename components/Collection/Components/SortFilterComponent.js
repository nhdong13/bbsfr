import React from "react"
import styles from "../Collections.module.scss"
import { Collapse } from "react-bootstrap"
import Image from "next/image"
import Sorting from "../../Common/Sorting"
import Filter from "../../Common/Filter"
import { Radio, RadioGroup } from "@sajari/react-components"
import { useSorting, SearchProvider } from "@sajari/react-hooks"
import SortingComponent from "../../Common/Sorting"

const SortFilterComponent = ({
  list,
  type,
  setOpen,
  setChanged,
  filter,
  pipeline,
  initialResponse,
  variables,
}) => {
  return (
    <>
      <div className={styles.sort_filter_by}>
        <div className={styles.sub_heading}>{type}</div>
        {list.map((item, id) => (
          <div
            className={`${styles.group_heading} ${
              item.open ? styles.active : ""
            }`}
            key={id}
          >
            <div
              onClick={() => setOpen(id, !item.open)}
              aria-controls="example2-collapse-text"
              aria-expanded={item.open}
            >
              <div className={styles.text_heading}>
                <div>{item.name}</div>
                <div className={styles.icon}>
                  <Image
                    src={item.open ? "/icons/subtract.svg" : "/icons/plus.svg"}
                    alt={item.open ? "Icon subtract" : "Icon plus"}
                    loading="lazy"
                    layout="fill"
                  ></Image>
                </div>
              </div>
            </div>
            <div className={styles.sort_filter_collapse}>
              <Collapse in={item.open}>
                <div id="example2-collapse-text">
                  {type == "sort" ? (
                    <SortingComponent
                      filter={filter}
                      pipeline={pipeline}
                      initialResponse={initialResponse}
                      setChanged={setChanged}
                      variables={variables}
                    />
                  ) : (
                    <Filter
                      filter={filter}
                      pipeline={pipeline}
                      initialResponse={initialResponse}
                      setChanged={setChanged}
                      variables={variables}
                    />
                  )}
                </div>
              </Collapse>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default SortFilterComponent
