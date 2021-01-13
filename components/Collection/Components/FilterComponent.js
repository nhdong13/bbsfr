import React, { useState } from "react"
import styles from "../Collections.module.scss"
import { Collapse } from "react-bootstrap"
import Image from "next/image"
import { useFilter } from "@sajari/react-hooks"
import { useRouter } from "next/router"
import {
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  Combobox,
} from "@sajari/react-components"
import { Filter } from "@sajari/react-search-ui"

const FilterComponent = ({}) => {
  return (
    <>
      <div className="">
        <div className={styles.filterTitle}>
          <p>REFINE BY</p>
        </div>
        {/* <Filter
            type="list"
            name="listBrands"
            title="List brands"
            searchable
            sort="alpha"
          /> */}
        <FilterRender name="brand" title="Brand" />
        <FilterRender name="listBrands" title="List Brands" />
        <FilterRender name="priceRange" title="Range ($)" />
        <FilterRender name="category" title="Category" />
        {/* <Filter type="rating" name="rating" title="Rating" /> */}
      </div>
    </>
  )
}
export default FilterComponent

const FilterRender = ({ name, title }) => {
  const { multi, options, selected, setSelected, reset } = useFilter(name)
  const [filterArray, setFilterArray] = useState([...options])
  const router = useRouter()
  router.events.on("routeChangeComplete", () => reset())
  const Group = multi ? CheckboxGroup : RadioGroup
  const Control = multi ? Checkbox : Radio
  const [open, setOpen] = useState(false)
  console.log("Debug code options:", options)

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
                    <>
                      <Combobox
                        className={styles.sajari_combobox}
                        placeholder="Search"
                        // value={searchInputFilter}
                        // onChange={handleFilter}
                      />
                      {/* <Input /> */}
                    </>
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
