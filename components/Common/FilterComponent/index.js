import { Filter, SearchProvider, FilterBuilder } from "@sajari/react-search-ui"
import React from "react"
const FilterComponent = ({ variables, pipeline, initialResponse }) => {
  const productTypeFilter = new FilterBuilder({
    name: "type",
    field: "price",
  })

  return (
    <div>
      <SearchProvider
        search={{
          pipeline,
          variables,
          filters: [productTypeFilter],
        }}
        initialResponse={initialResponse}
        searchOnLoad
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
        <Filter
          name="type"
          pinSelected={false}
          searchable
          sort="count"
          sortAscending={true}
        />
      </SearchProvider>
    </div>
  )
}

export default FilterComponent
