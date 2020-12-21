import React, { useState } from "react"
import styles from "./filter.module.scss"
import { useFilter } from "@sajari/react-hooks"
import {
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  Combobox,
} from "@sajari/react-components"

let arrayToFilter = []
let isSetArrayToFilter = false

const FilterRender = ({ name, setChanged }) => {
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
  console.log(selected)
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

          // setChanged(true)
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
}

const CategogryFilter = ({ setChanged }) => (
  <FilterRender name="type" title="Category" setChanged={setChanged} />
)

const FilterComponent = ({ setChanged }) => {
  return (
    <div className="">
      <CategogryFilter setChanged={setChanged} />
    </div>
  )
}

export default FilterComponent
