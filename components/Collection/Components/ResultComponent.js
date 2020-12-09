import {
  SearchProvider,
  Variables,
  FilterBuilder,
  Filter,
  FieldDictionary,
  Sorting,
} from "@sajari/react-search-ui"
import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useSearch } from "@sajari/react-hooks"
import PaginationComponent from "../../Common/PaginationComponent"
import Image from "next/image"
import { renderStart } from "../../../services/renderStart"
import styles from "../Collections.module.scss"

const ResultComponent = (props) => {
  const { pipeline } = props
  const [windowWidth, setWindowWidths] = useState()
  const [countUnsetBorder, setCountUnsetBorder] = useState(2)
  const [widthListProduct, setWidthListProduct] = useState(100)

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window
    setWindowWidths(width)
    window.addEventListener("resize", { width, height })
    return () => window.removeEventListener("resize", { width, height })
  }, [])

  useEffect(() => {
    return handleResponsive()
  })

  //Handle check to responsive product
  const handleResponsive = () => {
    if (windowWidth <= 425) {
      setCountUnsetBorder(2)
      setWidthListProduct(100)
    } else if (windowWidth <= 768 && windowWidth > 425) {
      setCountUnsetBorder(4)
      setWidthListProduct(100)
    } else if (windowWidth === 1024 && windowWidth > 768) {
      setCountUnsetBorder(4)
      setWidthListProduct(80)
    } else if (windowWidth === 1440 && windowWidth > 1024) {
      setCountUnsetBorder(4)
      setWidthListProduct(58)
    } else {
      setCountUnsetBorder(4)
      setWidthListProduct(30)
    }
  }

  //Map styles to render border
  const handleStyle = (index, results) => {
    let concatStyles
    if ((index + 1) % countUnsetBorder === 0) {
      concatStyles = styles.containerProductMode
    } else {
      concatStyles = styles.containerProduct
    }
    //Un set border bottom
    if (windowWidth <= 425) {
      if (index + 1 === results.length || index + 1 === results.length - 1) {
        concatStyles += ` ${styles.unsetBorder}`
      }
    } else if (windowWidth >= 768) {
      if (
        index + 1 === results.length ||
        index + 1 === results.length - 1 ||
        index + 1 === results.length - 2 ||
        index + 1 === results.length - 3
      ) {
        concatStyles += ` ${styles.unsetBorder}`
      }
    }

    return concatStyles
  }

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

  const variables = new Variables({ resultsPerPage: 20 })
  const { results = [] } = useSearch({ pipeline, variables })

  return (
    <div
      style={{ width: `${widthListProduct}%` }}
      className={styles.listProduct}
    >
      {results &&
        results.map((item, index) => {
          return (
            <div key={index}>
              <div className={handleStyle(index, results)}>
                <div className={styles.elementProduct}>
                  <Image
                    alt
                    src="https://images.prismic.io/slicemachine-blank/6b2bf485-aa12-44ef-8f06-dce6b91b9309_dancing.png?auto=compress,format"
                    height={172}
                    width={172}
                  ></Image>
                  <div className={styles.sessionInfo}>
                    <div className={styles.nameProduct}>
                      <p>{item.values.name}</p>
                    </div>
                    <div className={styles.priceProduct}>
                      <p>{item.values.price ? `$${item.values.price}` : ""}</p>
                    </div>
                    {renderStart(4, "16px", "16px")}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

      <SearchProvider
        search={{
          pipeline,
          variables,
        }}
        searchOnLoad
      >
        <PaginationComponent />
      </SearchProvider>
    </div>
  )
}

export default ResultComponent
