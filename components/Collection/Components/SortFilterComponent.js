import React from "react"
import styles from "../Collections.module.scss"
import { Collapse } from "react-bootstrap"
import Image from "next/image"
import Sorting from "../../Common/Sorting"
import Filter from "../../Common/Filter"

const SortFilterComponent = ({ list, type, setOpen, setChanged }) => {
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
                <Image
                  src={item.open ? "/icons/subtract.svg" : "/icons/plus.svg"}
                  alt={item.open ? "Icon subtract" : "Icon plus"}
                  height={12}
                  width={12}
                  loading="eager"
                ></Image>
              </div>
            </div>
            <div className={styles.sort_filter_collapse}>
              <Collapse in={item.open}>
                <div id="example2-collapse-text">
                  {type == "sort" ? (
                    <Sorting setChanged={setChanged} />
                  ) : id == 0 ? (
                    <Filter setChanged={setChanged} />
                  ) : (
                    <div>Filter Feature</div>
                  )}
                  {/*Id == 0 => TOTO: Pending for real data, just display one filed of filter(first element of listFilter)*/}
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
