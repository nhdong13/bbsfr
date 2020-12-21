import {
  SearchProvider,
  FieldDictionary,
  FilterBuilder,
} from "@sajari/react-search-ui"
import React, { useEffect, useState, useMemo } from "react"
import { Container, Modal, Collapse, Button } from "react-bootstrap"
import { constants } from "../../../constant"
import PaginationComponent from "../../Common/PaginationComponent"
import Image from "next/image"
import { renderStart } from "../../../services/renderStart"
import {
  countBooleanSortFilter,
  listUpdate,
} from "../../../services/collection"
import styles from "../Collections.module.scss"
import Link from "next/link"
import {
  useSearchContext,
  useVariables,
  useResultsPerPage,
} from "@sajari/react-hooks"
import Header from "../../Header"
import SortFilterComponent from "./SortFilterComponent"

const productTypeFilter = new FilterBuilder({
  name: "type",
  field: "price",
  count: true,
  multi: true,
})

const ResultComponent = (props) => {
  const { pipeline, initialResponse } = props
  const [windowWidth, setWindowWidths] = useState()
  const [countUnsetBorder, setCountUnsetBorder] = useState(2)
  const [show, setShow] = useState(false)
  const [sortFitlerChanged, setChanged] = useState(false)
  const [countBol, setcountBol] = useState(0)
  const [isSetResultPerPage, setIsResultPerPage] = useState(false)
  // TOTO: wating for data from Prismic or Sajari
  const [listSorting, setListSorting] = useState([
    {
      name: "Featured",
      open: false,
    },
  ])
  const [listFilter, setListFilter] = useState([
    { name: "Brand", open: false },
    { name: "Jacket Features", open: false },
    { name: "Jacket Material", open: false },
    { name: "Season", open: false },
    { name: "Ride Style", open: false },
    { name: "Price", open: false },
  ])

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window
    setWindowWidths(width)
    window.addEventListener("resize", { width, height })
    return () => window.removeEventListener("resize", { width, height })
  }, [])

  useEffect(() => {
    return handleResponsive()
  })

  useEffect(() => {
    console.log("=============ResultComponent")
  })

  //Handle check to responsive product
  const handleResponsive = () => {
    if (windowWidth <= 425) {
      setCountUnsetBorder(2)
    } else if (windowWidth <= 768 && windowWidth > 425) {
      setCountUnsetBorder(4)
    } else if (windowWidth === 1024 && windowWidth > 768) {
      setCountUnsetBorder(4)
    } else if (windowWidth === 1440 && windowWidth > 1024) {
      setCountUnsetBorder(4)
    } else {
      setCountUnsetBorder(4)
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
      //Check result per page have even number or odd number
      if (results.length % 2 === 0 && index + 1 === results.length - 1) {
        concatStyles += ` ${styles.unsetBorder}`
      }
      if (index + 1 === results.length) {
        concatStyles += ` ${styles.unsetBorder}`
      }
    } else if (windowWidth >= 768) {
      //Check result per page have even number or odd number
      if (results.length % 2 === 0 && index + 1 === results.length - 3) {
        concatStyles += ` ${styles.unsetBorder}`
      }
      if (
        index + 1 === results.length ||
        index + 1 === results.length - 1 ||
        index + 1 === results.length - 2
      ) {
        concatStyles += ` ${styles.unsetBorder}`
      }
    }
    return concatStyles
  }

  const sortFilter = () => {
    setShow(!show)
  }

  const setOpenFilterCollapse = (id, bol) => {
    setListFilter(listUpdate(listFilter, id, bol))
  }

  const setOpenSortingCollapse = (id, bol) => {
    setListSorting(listUpdate(listSorting, id, bol))
  }

  //Handcle Close Modal
  const handleClose = () => {
    let count = countBooleanSortFilter(listFilter)
    setShow(false)
    setChanged(false)
    setcountBol(count)
  }

  const SortFilterButton = () => (
    <Container fluid className={styles.filter_sort_sajari}>
      <div className={styles.short_filter}>
        <div className={styles.title} onClick={sortFilter}>
          <Image src="/sortby.svg" alt="sort icon" width={7} height={11} />
          <div>Sort by</div>
        </div>
        <div className={styles.title} onClick={sortFilter}>
          <Image src="/filter.svg" alt="filter icon" width={11} height={11} />
          <div>Filter</div>
        </div>
        <div className={styles.horizontal_line}></div>
      </div>
    </Container>
  )
  const { resultsPerPage, setResultsPerPage } = useResultsPerPage()
  if (!isSetResultPerPage) {
    setIsResultPerPage(true)
    setResultsPerPage(20)
  }

  // !isSetResultPerPage && setResultsPerPage(20) && setIsResultPerPage(true)
  const { variables } = useVariables()
  const { results } = useSearchContext()

  return (
    <>
      <SortFilterButton />
      <SearchProvider
        search={{
          pipeline,
          variables,
          fields: new FieldDictionary({
            title: "name",
          }),
          filters: [productTypeFilter],
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
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
        <Modal show={show} onHide={handleClose} className="short_filter_modal">
          <Header />
          {/*Sorting Feature*/}
          <SortFilterComponent
            list={listSorting}
            setOpen={setOpenSortingCollapse}
            type={"sort"}
            setChanged={setChanged}
            variables={variables}
          />
          {/* Filter feature */}
          <SortFilterComponent
            variables={variables}
            list={listFilter}
            setOpen={setOpenFilterCollapse}
            type={"filter"}
            setChanged={setChanged}
          />
          <div onClick={handleClose} className={styles.button_sajari}>
            <div className={styles.modal_button}>
              <Button
                fixed="bottom"
                variant={
                  sortFitlerChanged ||
                  countBol != countBooleanSortFilter(listFilter)
                    ? "secondary"
                    : "primary"
                }
              >
                {sortFitlerChanged ||
                countBol != countBooleanSortFilter(listFilter)
                  ? "Apply"
                  : "Cancel"}
              </Button>
            </div>
          </div>
        </Modal>
        <div className={styles.listProduct}>
          {results &&
            results.map((item, index) => {
              return (
                <div key={index}>
                  <div className={handleStyle(index, results)}>
                    <div className={styles.elementProduct}>
                      <Link href="/">
                        <a>
                          <div>
                            <Image
                              alt={item.values.name}
                              src="https://images.prismic.io/slicemachine-blank/6b2bf485-aa12-44ef-8f06-dce6b91b9309_dancing.png?auto=compress,format"
                              height={172}
                              width={172}
                            ></Image>
                          </div>
                        </a>
                      </Link>
                      <div className={styles.sessionInfo}>
                        <div className={styles.nameProduct}>
                          <p>{item.values.name}</p>
                        </div>
                        <div className={styles.priceProduct}>
                          <p>
                            {item.values.price ? `$${item.values.price}` : ""}
                          </p>
                        </div>
                        {renderStart(4.5, "16px", "16px", 5)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
        <PaginationComponent
          initialResponse={initialResponse}
          pipeline={pipeline}
          variables={variables}
        />
      </SearchProvider>
    </>
  )
}

export default ResultComponent
