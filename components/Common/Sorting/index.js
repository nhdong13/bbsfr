import React from "react"
import styles from "./sorting.module.scss"
import { useSorting } from "@sajari/react-hooks"
import { Radio, RadioGroup } from "@sajari/react-components"

const SortingComponent = ({ setChanged }) => {
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
}

export default SortingComponent
