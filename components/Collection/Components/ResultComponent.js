import {
  SearchProvider,
  Variables,
  FieldDictionary,
  FilterBuilder,
} from "@sajari/react-search-ui"
import React, { useState } from "react"
import { Container, Modal, Button } from "react-bootstrap"
import { constants } from "../../../constant"
import Image from "next/image"
import {
  countBooleanSortFilter,
  listUpdate,
} from "../../../services/collection"
import styles from "../Collections.module.scss"
import { useSearchContext } from "@sajari/react-hooks"
import Header from "../../Header"
import dynamic from "next/dynamic"

const PaginationDynamic = dynamic(() =>
  import("../../Common/PaginationComponent")
) 
const ListProductsDynamic = dynamic(() => import("./ListProductsComponent"))
const SortFilterDynamic = dynamic(() => import('./SortFilterComponent'))

const ResultComponent = (props) => {
  const { pipeline, initialResponse } = props
  
  const [show, setShow] = useState(false)
  const [params, setParams] = useState({
    sort: "",
  })
  const [sortFitlerChanged, setChanged] = useState(false)
  const [countBol, setCountBol] = useState(0)
  
  // TOTO: wating for data from PrisCmic or Sajari
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


  const sortFilter = () => {
    setShow(!show)
  }

  const setOpenFilterCollapse = (id, bol) => {
    setListFilter(listUpdate(listFilter, id, bol))
  }

  const setOpenSortingCollapse = (id, bol) => {
    setListSorting(listUpdate(listSorting, id, bol))
  }

  //Handle Close Modal
  const handleClose = () => {
    let count = countBooleanSortFilter(listFilter)
    setShow(false)
    setChanged(false)
    setCountBol(count)
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

  const productTypeFilter = new FilterBuilder({
    name: "type",
    field: "price",
  })

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
          filters: [productTypeFilter],
        }}
        initialResponse={initialResponse}
        // searchOnLoad={!initialResponse}
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
        <Modal show={show} onHide={handleClose} className="short_filter_modal">
          <Header />
          {/*Sorting Feature*/}
          <SortFilterDynamic
            list={listSorting}
            setOpen={setOpenSortingCollapse}
            type={"sort"}
            setParams={setParams}
            params={params}
            setChanged={setChanged}
          />
          {/* Filter feature */}
          <SortFilterDynamic
            list={listFilter}
            setOpen={setOpenFilterCollapse}
            type={"filter"}
          />
          <div
            onClick={handleClose}
            className={styles.button_sajari}
            fixed="bottom"
          >
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
        <ListProductsDynamic products={results} />
        <PaginationDynamic
          initialResponse={initialResponse}
          pipeline={pipeline}
          variables={variables}
        />
      </SearchProvider>
    </>
  )
}

export default ResultComponent
