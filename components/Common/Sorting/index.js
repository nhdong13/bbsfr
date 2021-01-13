import React, { useEffect } from "react"
import styles from "./sorting.module.scss"
import { useSorting } from "@sajari/react-hooks"

const SortingComponent = ({ setChanged }) => {
  const { sorting, setSorting } = useSorting()
  //this code will remove if sajari fix filter for search
  useEffect(() => {
    setSorting("")
  }, [])
  //----
  return (
    <div className="">
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
  )
}

export default SortingComponent
