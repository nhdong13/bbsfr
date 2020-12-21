import React, { useState } from "react"
import styles from "../Collections.module.scss"
import { Collapse } from "react-bootstrap"
import Image from "next/image"
import { useSorting, useFilter } from "@sajari/react-hooks"
import {
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  Combobox,
} from "@sajari/react-components"

let arrayToFilter = []
let isSetArrayToFilter = false

const FilterRender = React.memo(({ name, setChanged }) => {
  const [searchInputFilter, setSearch] = useState("")

  const { multi, options, selected, setSelected } = useFilter(name)
  if (options.length === 0) {
    return null
  } else {
    if (!isSetArrayToFilter) {
      arrayToFilter = options
      isSetArrayToFilter = !isSetArrayToFilter
    }
  }
  const [filterArray, setFilterArray] = useState([...arrayToFilter])
  const handleFilter = (e) => {
    let updateArray = arrayToFilter.filter((x) =>
      x.label.toLowerCase().includes(e.toLowerCase())
    )
    setFilterArray(updateArray)
    setSearch(e)
  }
  const Group = multi ? CheckboxGroup : RadioGroup
  const Control = multi ? Checkbox : Radio
  return (
    <div className="mb-4">
      <Combobox
        className={styles.sajari_combobox}
        placeholder="Search"
        value={searchInputFilter}
        onChange={handleFilter}
      />

      <div className="flex items-center justify-between mb-2"></div>
      <Group
        name={name}
        value={selected}
        onChange={(values) => {
          setSelected(Array.isArray(values) ? values : [values])
          setChanged(true)
        }}
      >
        {filterArray.map(({ value, label, count }) => (
          <div
            className="flex justify-between items-center"
            key={label + count}
          >
            <Control
              className={styles.sajari_checkbox}
              value={label}
              checked={selected.includes(label)}
              onChange={() => {}}
              fontSize="sm"
            >
              {label}
            </Control>
          </div>
        ))}
      </Group>
    </div>
  )
})

const SortFilterComponent = ({ list, type, setOpen, setChanged }) => {
  const BrandFilter = () => (
    <FilterRender name="type" title="Brand" setChanged={setChanged} />
  )

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
                    <SortingComponent />
                  ) : id == 0 ? (
                    <BrandFilter />
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
