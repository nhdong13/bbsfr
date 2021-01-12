import React from "react"
import styles from "./sorting.module.scss"
import { useSorting, SearchProvider, Variables } from "@sajari/react-hooks"
import { constants } from "../../../constant"

const SortingComponent = ({
  setChanged,
  filter,
  pipeline,
  initialResponse,
  variables,
}) => {
  const { sorting, setSorting } = useSorting()
  console.log("Debug code filter:", filter)
  return (
    <SearchProvider
      search={{
        pipeline,
        // variables,
        variables: new Variables({
          resultsPerPage: constants.RESULT_PER_PAGE,
        }),
      }}
      defaultFilter={filter}
      initialResponse={initialResponse}
      searchOnLoad={!initialResponse}
    >
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
    </SearchProvider>
  )
}

export default SortingComponent
