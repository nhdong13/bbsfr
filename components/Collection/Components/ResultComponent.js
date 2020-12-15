import {
  SearchProvider,
  Variables,
  FieldDictionary,
} from "@sajari/react-search-ui"
import React, { useEffect, useState } from "react"
import { Container, Modal, Collapse, Button } from "react-bootstrap"
import { useSorting } from "@sajari/react-hooks"
import { Radio, RadioGroup } from "@sajari/react-components"
import { constants } from "../../../constant"
import PaginationComponent from "../../Common/PaginationComponent"
import FilterComponent from "../../Common/FilterComponent"
import Image from "next/image"
import { renderStart } from "../../../services/renderStart"
import styles from "../Collections.module.scss"
import Link from "next/link"
import { useSearchContext } from "@sajari/react-hooks"
import Header from "../../Header"

const ResultComponent = (props) => {
  const { pipeline, initialResponse } = props
  const [windowWidth, setWindowWidths] = useState()
  const [countUnsetBorder, setCountUnsetBorder] = useState(2)
  const [show, setShow] = useState(false)
  const [params, setParams] = useState({
    sort: "",
  })
  const [listSortFilter, setSortFilter] = useState([
    { name: "Featured", open: false },
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

  const SortingComponent = React.memo(() => {
    const { sorting, setSorting } = useSorting()

    return (
      <div className="">
        <div>
          <RadioGroup
            className={styles.radio_sajari}
            value={sorting}
            onChange={(e) => {
              setSorting(e.target.value)
              setParams({ ...params, sort: e.target.value })
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
  })

  const setOpen = (id, bol) => {
    let listUpdate = listSortFilter.map((item, index) =>
      index == id ? { name: item.name, open: bol } : item
    )
    setSortFilter(listUpdate)
  }

  const handleClose = () => setShow(false)
  const variables = new Variables({
    resultsPerPage: constants.RESULT_PER_PAGE,
    ...params,
  })
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
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
      >
        <Modal show={show} onHide={handleClose} className="short_filter_modal">
          <Header />
          <div className={styles.sort_filter_by}>
            {listSortFilter.map((item, id) => (
              <div
                className={`${styles.group_heading} ${
                  item.open ? styles.active : ""
                }`}
                key={id}
              >
                <div
                  onClick={() => setOpen(id, !item.open)}
                  aria-controls="example2-collapse-text"
                  aria-expanded={item.open}
                >
                  {id == 0 && <div className={styles.sub_heading}>soft by</div>}
                  {id == 1 && (
                    <div className={styles.sub_heading}>refined by</div>
                  )}
                  <div className={styles.text_heading}>{item.name}</div>
                </div>
                <div className={styles.sort_filter_collapse}>
                  <Collapse in={item.open}>
                    <div id="example2-collapse-text">
                      {id == 1 && (
                        <FilterComponent
                          initialResponse={initialResponse}
                          pipeline={pipeline}
                          variables={variables}
                        />
                      )}
                      {id == 0 && <SortingComponent />}
                      {id > 1 && <div>UI for Sort/Filter</div>}
                    </div>
                  </Collapse>
                </div>
              </div>
            ))}
          </div>
        </Modal>

        <PaginationComponent
          initialResponse={initialResponse}
          pipeline={pipeline}
          variables={variables}
        />
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
      </SearchProvider>
    </>
  )
}

export default ResultComponent
