import React, { useState } from "react"
import { Container, Modal, Button } from "react-bootstrap"
import Image from "next/image"
import styles from "../Collections.module.scss"
import { useSearchContext } from "@sajari/react-hooks"
import dynamic from "next/dynamic"
import SortComponent from "./SortComponent"
import FilterComponent from "./FilterComponent"

const HeaderDynamic = dynamic(() => import("../../Header"))
const PaginationDynamic = dynamic(() =>
  import("../../Common/PaginationComponent")
)
const ListProductsDynamic = dynamic(() => import("./ListProductsComponent"))

const ResultComponent = () => {
  const [show, setShow] = useState(false)
  const [filterChanged, setFilterChanged] = useState(false)
  const [sortChanged, setSortChanged] = useState(false)
  const [openCollapseSort, setOpenCollapseSort] = useState(false)
  const [arrFilter, setArrFilter] = useState([
    {
      name: "brand",
      open: false,
      title: "Brand",
    },
    {
      name: "priceRange",
      open: false,
      title: "Range ($)",
    },
    // {
    //   name: "category",
    //   open: false,
    //   title: "Category",
    // },
    {
      name: "rating",
      open: false,
      title: "Rating",
    },
    {
      name: "color",
      open: false,
      title: "Color",
    },
  ])

  const sortFilter = () => {
    setShow(!show)
  }

  //Handle Close Modal
  const handleClose = () => {
    setShow(false)
    setFilterChanged(false)
    setSortChanged(false)
  }

  const handleSetOpenCollapse = (name) => {
    const mapArrFilter = arrFilter.map((i) => {
      if (i.name === name) {
        return {
          ...i,
          open: !i.open,
        }
      } else {
        return { ...i }
      }
    })
    setArrFilter(mapArrFilter)
  }

  const { results } = useSearchContext()

  //Button show sort and filter
  const SortFilterButton = () => (
    <Container fluid className={styles.filterSortContainer}>
      <div className={styles.shortFilter}>
        <div className={styles.title} onClick={sortFilter}>
          <div
            style={{
              position: "relative",
              width: "15px",
              height: "11px",
            }}
          >
            <Image
              loading="lazy"
              layout="fill"
              src="/sortby.svg"
              alt="sort icon"
            />
          </div>
          <div>Sort by</div>
        </div>
        <div className={styles.title} onClick={sortFilter}>
          <div
            style={{
              position: "relative",
              width: "18px",
              height: "11px",
            }}
          >
            <Image
              loading="lazy"
              layout="fill"
              src="/filter.svg"
              alt="filter icon"
            />
          </div>
          <div>Filter</div>
        </div>
        <div className={styles.horizontalLine}></div>
      </div>
    </Container>
  )
  // ----------- //

  return (
    <>
      <SortFilterButton />
      <ListProductsDynamic products={results} />
      <PaginationDynamic />

      {/* ------------Modal sort filter------------- */}
      <Modal show={show} onHide={handleClose} className="short_filter_modal">
        <HeaderDynamic />

        {/*Sorting Feature*/}
        <SortComponent
          sortChanged={sortChanged}
          setSortChanged={setSortChanged}
          openCollapseSort={openCollapseSort}
          setOpenCollapseSort={setOpenCollapseSort}
        />

        {/* Filter feature */}
        <FilterComponent
          handleSetOpenCollapse={handleSetOpenCollapse}
          arrFilter={arrFilter}
          filterChanged={filterChanged}
          setFilterChanged={setFilterChanged}
        />

        <div onClick={handleClose} className={styles.button_sajari}>
          <div className={styles.modal_button}>
            <Button
              fixed="bottom"
              variant={sortChanged || filterChanged ? "secondary" : "primary"}
            >
              {sortChanged || filterChanged ? "Apply" : "Cancel"}
            </Button>
          </div>
        </div>
      </Modal>
      {/* ------------------------------------------ */}
    </>
  )
}

export default ResultComponent
