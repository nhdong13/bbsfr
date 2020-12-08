import React, { useEffect, useState } from "react"
import {
  Pipeline,
  Results,
  SearchProvider,
  Variables,
  FilterBuilder,
  Filter,
  FieldDictionary,
  Sorting,
} from "@sajari/react-search-ui"
import { Container } from "react-bootstrap"
import PaginationComponent from "../../Common/PaginationComponent"

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}

const ResultComponent = (props) => {
  const { pipeline } = props
  const [column, setColumn] = useState(2)
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => handleShowColumns())

  const handleShowColumns = () => {
    const { width } = windowDimensions
    if (width && width <= 425) {
      setColumn(2)
    } else if (width <= 1440) {
      setColumn(3)
    } else {
      setColumn(4)
    }
  }

  // const categoryFilter = new FilterBuilder({
  //   name: "category",
  //   field: "categories",
  // })

  // const SearchPlayground = React.memo(() => (
  //   <div className="flex flex-col space-y-6">
  //     <div className="flex -mx-3">
  //       <div className="w-1/4 px-3 border-gray-100 border-r space-y-6">
  //         <Filter
  //           type="list"
  //           name="category"
  //           title="Category"
  //           searchable
  //           sort="alpha"
  //         />
  //       </div>
  //       <div className="w-3/4 px-3">
  //         <Results
  //           className="modifyResult"
  //           columns={column}
  //           gap={4}
  //           appearance="grid"
  //         />
  //       </div>
  //     </div>
  //   </div>
  // ))

  // const pipeline = new Pipeline(
  //   {
  //     account: "1594153711901724220",
  //     collection: "bestbuy",
  //     endpoint: "https://jsonapi-us-valkyrie.sajari.net",
  //   },
  //   "query"
  // )

  // const categoryFilter = new FilterBuilder({
  //   name: "category",
  //   field: "name",
  // })

  const priceRangeFilter = new FilterBuilder({
    name: "weight",
    field: "weight",
  })

  const SearchPlayground = React.memo(() => (
    <div className="flex flex-col space-y-6">
      <div className="flex -mx-3">
        <div className="w-1/4 px-3 border-gray-100 border-r space-y-6">
          {/* <Filter
            type="list"
            name="category"
            title="Category"
            searchable
            sort="alpha"
          /> */}
          <Sorting
            options={[
              { name: "Most relevant", value: "" },
              { name: "Name: A to Z", value: "name" },
              { name: "Name: Z to A", value: "-name" },
            ]}
            size="sm"
          />
          <Filter type="list" name="weight" title="Range ($)" />
        </div>
        <div className="w-3/4 px-3">
          <Results
            className="modifyResult"
            columns={column}
            gap={4}
            appearance="grid"
          />
        </div>
      </div>
    </div>
  ))

  return (
    <SearchProvider
      search={{
        pipeline,
        fields: new FieldDictionary({
          title: "name",
        }),
        filters: [priceRangeFilter],
      }}
      searchOnLoad
    >
      <SearchPlayground />
    </SearchProvider>
  )
}

export default ResultComponent
