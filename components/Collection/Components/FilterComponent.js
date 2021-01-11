import React, { useState } from "react"
import styles from "../Collections.module.scss"
import { Collapse, Container } from "react-bootstrap"
import Image from "next/image"
import { SearchProvider, Filter } from "@sajari/react-search-ui"
import { useFilter, FilterBuilder } from "@sajari/react-hooks"
import { useRouter } from "next/router"
import {
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  Combobox,
} from "@sajari/react-components"

const FilterComponent = ({ pipeline, variables, initialResponse }) => {
  const brandFilter = new FilterBuilder({
    name: "brand",
    options: {
      Apple: "brand = 'Apple'",
      Samsung: "brand = 'Samsung'",
      Dell: "brand = 'Dell'",
      HP: "brand = 'HP'",
      Garmin: "brand = 'Garmin'",
    },
    multi: true,
  })

  const categoryFilter = new FilterBuilder({
    name: "category",
    field: "level1",
    count: true,
    multi: true,
  })

  const priceRangeFilter = new FilterBuilder({
    name: "priceRange",
    count: true,
    field: "price_range",
    multi: true,
  })

  return (
    <div className={styles.providerFilter}>
      <SearchProvider
        search={{
          pipeline,
          variables,
          filters: [priceRangeFilter, brandFilter, categoryFilter],
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
        // customClassNames={{
        //   filter: {
        //     resetButton: "resetButtonFilter",
        //     list: {
        //       container: "listContainerFilter",
        //       checkboxGroup: "checkboxGroupFilter",
        //       searchFilter: "searchFilter",
        //       toggleButton: "toggleButtonFilter",
        //     },
        //   },
        // }}
      >
        <div className="">
          <div className={styles.filterTitle}>
            <p>REFINE BY</p>
          </div>
          {/* <Filter
            type="list"
            name="brand"
            title="Category"
            searchable
            sort="alpha"
          /> */}
          <FilterRender name="brand" title="Brand" />
          <FilterRender name="priceRange" title="Range ($)" />
          <FilterRender name="category" title="Category" />
        </div>
      </SearchProvider>
    </div>
  )
}
export default FilterComponent

const FilterRender = ({ name, title }) => {
  const { multi, options, selected, setSelected, reset } = useFilter(name)
  console.log("Debug code options:", options)
  const [filterArray, setFilterArray] = useState([...options])
  const router = useRouter()
  router.events.on("routeChangeComplete", () => reset())
  const Group = multi ? CheckboxGroup : RadioGroup
  const Control = multi ? Checkbox : Radio
  const [open, setOpen] = useState(false)
  return (
    <>
      {options?.length > 0 && (
        <div className={styles.containerFilter}>
          <>
            <div onClick={() => setOpen(!open)} className={styles.titleFilter}>
              <div className={styles.heading}>
                <p>{title}</p>
              </div>
              <div className={styles.icon}>
                <Image
                  src={open ? "/icons/subtract.svg" : "/icons/plus.svg"}
                  alt={open ? "Icon subtract" : "Icon plus"}
                  loading="lazy"
                  layout="fill"
                ></Image>
              </div>
            </div>
            <div className={styles.contextCollapse}>
              <Collapse in={open}>
                <div>
                  {name && name === "brand" && (
                    <Combobox
                      className={styles.sajari_combobox}
                      placeholder="Search"
                      // value={searchInputFilter}
                      // onChange={handleFilter}
                    />
                  )}
                  <div className="flex items-center justify-between mb-2"></div>
                  <Group
                    name={name}
                    value={selected}
                    onChange={
                      multi ? setSelected : (e) => setSelected([e.target.value])
                    }
                  >
                    {options.map(({ value, label, count }) => (
                      <div className={styles.itemFilter} key={label + count}>
                        <Control
                          className={styles.itemFilterLabel}
                          value={label}
                          checked={selected.includes(label)}
                        >
                          {label}
                        </Control>
                        <span className={styles.itemFilterCount}>
                          &nbsp;{`(${count})`}
                        </span>
                      </div>
                    ))}
                  </Group>
                </div>
              </Collapse>
            </div>
          </>
        </div>
      )}
    </>
  )
}
