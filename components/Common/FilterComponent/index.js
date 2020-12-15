import { Filter, SearchProvider, FilterBuilder } from "@sajari/react-search-ui"
import React from "react"
const PaginationComponent = ({ variables, pipeline, initialResponse }) => {
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
          filter: { container: "thienprovip369" },
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

export default PaginationComponent
