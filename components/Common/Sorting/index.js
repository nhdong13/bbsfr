import React from "react"
import styles from "./sorting.module.scss"
import { useSorting } from "@sajari/react-hooks"
import { Radio, RadioGroup } from "@sajari/react-components"
import { SearchProvider } from "@sajari/react-search-ui"

const SortingComponent = ({
  setChanged,
  filter,
  pipeline,
  initialResponse,
}) => {

  return (
    <SearchProvider
      search={{
        pipeline,
      }}
      defaultFilter={filter}
      initialResponse={initialResponse}
      searchOnLoad={!initialResponse}
    >
      
    </SearchProvider>
  )
}

export default SortingComponent
