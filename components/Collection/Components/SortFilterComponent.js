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
  return (
    <>
      <SearchProvider
        search={{
          pipeline,
        }}
        defaultFilter={filter}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
        customClassNames={{
          filter: {
            resetButton: "resetButtonFilter",
            list: {
              container: "listContainerFilter",
              checkboxGroup: "checkboxGroupFilter",
              searchFilter: "searchFilter",
              toggleButton: "toggleButtonFilter",
            },
          },
        }}
      >
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
                      src={
                        item.open ? "/icons/subtract.svg" : "/icons/plus.svg"
                      }
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
                        <div>
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
                      // <Filter setChanged={setChanged} />
                      <div>Filter Feature</div>
                    )}
                    {/*Id == 0 => TOTO: Pending for real data, just show option of one filter from filed on 
                    sajara of filter(first element of listFilter)*/}
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
        </div>
      </SearchProvider>
    </>
  )
}

export default SortFilterComponent
