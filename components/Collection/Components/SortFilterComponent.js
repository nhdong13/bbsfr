import React, { useState } from "react"
import styles from "../Collections.module.scss"
import { Collapse } from "react-bootstrap"
import { Filter } from "@sajari/react-search-ui"
import Image from "next/image"
import { useSorting } from "@sajari/react-hooks"
import { Radio, RadioGroup } from "@sajari/react-components"

const HeaderCollectionComponent = ({
  list,
  type,
  setOpen,
  setParams,
  params,
  setChanged,
}) => {
  const SortingComponent = React.memo(() => {
    const { sorting, setSorting } = useSorting()

    return (
      <div className="">
        <div>
          <RadioGroup
            className={styles.radio_sajari}
            value={sorting}
            onChange={(e) => {
              setSorting(e.target.value)
              setParams({ ...params, sort: e.target.value })
              setChanged(true)
            }}
          >
            <Radio value="">Most relevant</Radio>
            <Radio value="name">Name: A to Z</Radio>
            <Radio value="-name">Name: Z to A</Radio>
            <Radio value="price">Price: Low to High</Radio>
            <Radio value="-price">Price: High to Low</Radio>
          </RadioGroup>
        </div>
      </div>
    )
  })
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
                    <SortingComponent />
                  ) : (
                    <Filter
                      name="type"
                      pinSelected={false}
                      searchable
                      sort="count"
                      sortAscending={true}
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

export default HeaderCollectionComponent
