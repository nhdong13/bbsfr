import React, { useState } from "react"
import { Container, Modal, Button } from "react-bootstrap"
import Image from "next/image"
import {
  countBooleanSortFilter,
  listUpdate,
} from "../../../services/collection"
import styles from "../Collections.module.scss"
import {
  useSearchContext,
  useResultsPerPage,
  SearchProvider,
} from "@sajari/react-hooks"
import dynamic from "next/dynamic"
import SortComponent from "./SortComponent"
import FilterComponent from "./FilterComponent"

const HeaderDynamic = dynamic(() => import("../../Header"))
const PaginationDynamic = dynamic(() =>
  import("../../Common/PaginationComponent")
)
const ListProductsDynamic = dynamic(() => import("./ListProductsComponent"))

const ResultComponent = ({ pipeline, initialResponse, variables, filter }) => {
  const [show, setShow] = useState(false)
  const [sortFilterChanged, setChanged] = useState(false)
  const [countBol, setCountBol] = useState(0)

  // const [listSorting, setListSorting] = useState([
  //   {
  //     name: "Featured",
  //     open: false,
  //   },
  // ])

  // const [listFilter, setListFilter] = useState([
  //   { name: "Brand", open: false },
  //   // { name: "Jacket Features", open: false },
  //   // { name: "Jacket Material", open: false },
  //   // { name: "Season", open: false },
  //   // { name: "Ride Style", open: false },
  //   // { name: "Price", open: false },
  // ])

  const sortFilter = () => {
    setShow(!show)
  }

  const setOpenFilterCollapse = (id, bol) => {
    setListFilter(listUpdate(listFilter, id, bol))
  }

  //Handle Close Modal
  const handleClose = () => {
    // let count = countBooleanSortFilter(listFilter)
    setShow(false)
    setChanged(false)
    // setCountBol(count)
  }

  const { results } = useSearchContext()

  //Button show sort and filter
  const SortFilterButton = () => (
    <Container fluid className={styles.filter_sort_sajari}>
      <div className={styles.short_filter}>
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
        <div className={styles.horizontal_line}></div>
      </div>
    </Container>
  )
  // ----------- //

  return (
    <>
      <SortFilterButton />
      <ListProductsDynamic products={results} />
      <PaginationDynamic
        initialResponse={initialResponse}
        pipeline={pipeline}
        filter={filter}
        variables={variables}
      />

      {/* ------------Modal sort filter------------- */}
      <Modal show={show} onHide={handleClose} className="short_filter_modal">
        <HeaderDynamic />

        {/*Sorting Feature*/}
        <SortComponent
          pipeline={pipeline}
          setChanged={setChanged}
          filter={filter}
          initialResponse={initialResponse}
          variables={variables}
        />

        {/* Filter feature */}
        <FilterComponent
          setChanged={setChanged}
          variables={variables}
          pipeline={pipeline}
          filter={filter}
          initialResponse={initialResponse}
        />

        <div onClick={handleClose} className={styles.button_sajari}>
          <div className={styles.modal_button}>
            <Button
              fixed="bottom"
              variant={sortFilterChanged ? "secondary" : "primary"}
            >
              {sortFilterChanged
                ? //  ||
                  // countBol != countBooleanSortFilter(listFilter)
                  "Apply"
                : "Cancel"}
            </Button>
          </div>
        </div>
      </Modal>
      {/* ------------------------------------------ */}
    </>
  )
}

export default ResultComponent
