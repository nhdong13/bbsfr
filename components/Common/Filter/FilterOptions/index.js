import React, { useState } from "react"
import styles from "../filter.module.scss"
import {
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  Combobox,
} from "@sajari/react-components"

const FilterOptionComponent = ({
  name,
  setSelected,
  setFilterChanged,
  selected,
  multi,
  options,
}) => {
  const [search, setSearch] = useState()
  const Group = multi ? CheckboxGroup : RadioGroup
  const Control = multi ? Checkbox : Radio
  return (
    <>
      {name && name === "brand" && (
        <>
          <input
            onChange={(e) => setSearch(e.target.value.toUpperCase())}
            className={styles.searchBrandFilter}
            type="text"
            name="search"
            placeholder="Search"
          />
         
        </>
      )}
      <div className="flex items-center justify-between mb-2"></div>
      <Group
        name={name}
        value={selected}
        onChange={(values) => {
          setSelected(Array.isArray(values) ? values : [values])
          setFilterChanged(true)
        }}
      >
        {options
          .filter((i) => {
            if (search && search !== "") {
              return i.value.includes(search)
            }
            return i
          })
          .map(({ value, label, count }) => (
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
    </>
  )
}
export default FilterOptionComponent
