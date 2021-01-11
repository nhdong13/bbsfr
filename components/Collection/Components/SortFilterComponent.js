import React from "react"
import styles from "../Collections.module.scss"
import { Collapse } from "react-bootstrap"
import Image from "next/image"
import Sorting from "../../Common/Sorting"
import Filter from "../../Common/Filter"
import { Radio, RadioGroup } from "@sajari/react-components"
import { useSorting, SearchProvider } from "@sajari/react-hooks"

const SortFilterComponent = ({
  list,
  type,
  setOpen,
  setChanged,
  filter,
  pipeline,
  initialResponse,
}) => {
  const { sorting, setSorting } = useSorting()
  console.log("sorting", sorting)
  return (
    <>
      {/* <SearchProvider
        search={{
          pipeline,
        }}
        customClassNames={{
          filter: {
            pagination: {
              container: "containerPagination",
              button: "buttonPagination",
              active: "activePagination",
              next: "nextPagination",
              prev: "prevPagination",
              spacerEllipsis: "spacerEllipsisPagination",
            },
            resetButton: "resetButtonFilter",
            list: {
              container: "listContainerFilter",
              checkboxGroup: "checkboxGroupFilter",
              searchFilter: "searchFilter",
              toggleButton: "toggleButtonFilter",
            },
          },
        }}
        defaultFilter={filter}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
      > */}
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
                    <div className="">
                      {/* <div>
                          <RadioGroup
                            className={styles.radio_sajari}
                            value={sorting}
                            onChange={(e) => {
                              setSorting(e.target.value)
                              setChanged(true)
                            }}
                          >
                            <Radio value="">Most relevant</Radio>
                            <Radio value="name">Name: A to Z</Radio>
                            <Radio value="-name">Name: Z to A</Radio>
                            <Radio value="price">Price: Low to High</Radio>
                            <Radio value="-price">Price: High to Low</Radio>
                          </RadioGroup>
                        </div> */}
                      <div
                        className={styles.radio_sajari}
                        onChange={(e) => {
                          setSorting(e.target.value)
                          setChanged(true)
                        }}
                      >
                        <fieldset>
                          <input
                            id="sort1"
                            type="radio"
                            name="sort"
                            value=""
                            defaultChecked
                            checked={sorting === ""}
                          />
                          <label for="sort1">&nbsp;Most relevant</label>
                          <br />

                          <input
                            id="sort2"
                            type="radio"
                            name="sort"
                            value="name"
                            checked={sorting === "name"}
                          />
                          <label for="sort2">&nbsp;Name: A to Z</label>
                          <br />

                          <input
                            id="sort3"
                            type="radio"
                            name="sort"
                            value="-name"
                            checked={sorting === "-name"}
                          />
                          <label for="sort3">&nbsp;Name: Z to A</label>
                          <br />

                          <input
                            id="sort4"
                            type="radio"
                            name="sort"
                            value="price"
                            checked={sorting === "price"}
                          />
                          <label for="sort4">&nbsp;Price: Low to High</label>
                          <br />

                          <input
                            id="sort5"
                            type="radio"
                            name="sort"
                            value="-price"
                            checked={sorting === "-price"}
                          />
                          <label for="sort5">&nbsp;Price: High to Low</label>
                          <br />
                        </fieldset>
                      </div>
                    </div>
                  ) : // <Sorting
                  //   setChanged={setChanged}
                  //   pipeline={pipeline}
                  //   filter={filter}
                  //   initialResponse={initialResponse}
                  // />
                  // <></>
                  id == 0 ? (
                    <></>
                  ) : (
                    <div>Filter Feature</div>
                    // <Filter setChanged={setChanged} />
                  )}
                  {/*Id == 0 => TOTO: Pending for real data, just show option of one filter from filed on 
                    sajara of filter(first element of listFilter)*/}
                </div>
              </Collapse>
            </div>
          </div>
        ))}
      </div>
      {/* </SearchProvider> */}
    </>
  )
}

export default SortFilterComponent
