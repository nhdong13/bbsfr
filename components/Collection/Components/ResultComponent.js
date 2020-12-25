import {
  SearchProvider,
  FieldDictionary,
  FilterBuilder,
} from "@sajari/react-search-ui"
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
  useVariables,
  useResultsPerPage,
} from "@sajari/react-hooks"
import dynamic from "next/dynamic"
import { constants } from "../../../constant"

const HeaderDynamic = dynamic(() => import("../../Header"))
const PaginationDynamic = dynamic(() =>
  import("../../Common/PaginationComponent")
)
const ListProductsDynamic = dynamic(() => import("./ListProductsComponent"))
const SortFilterDynamic = dynamic(() => import("./SortFilterComponent"))

const productTypeFilter = new FilterBuilder({
  name: "type",
  field: "brand",
  count: true,
  multi: true,
})

const ResultComponent = (props) => {
  const { pipeline, initialResponse } = props

  const [show, setShow] = useState(false)
  const [sortFilterChanged, setChanged] = useState(false)
  const [countBol, setCountBol] = useState(0)
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

  const { setResultsPerPage } = useResultsPerPage()
  if (!isSetResultPerPage) {
    setIsResultPerPage(true)
    setResultsPerPage(constants.RESULT_PER_PAGE)
  }

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
          <HeaderDynamic />
          {/*Sorting Feature*/}
          <SortFilterDynamic
            list={listSorting}
            setOpen={setOpenSortingCollapse}
            type={"sort"}
            setChanged={setChanged}
          />
          {/* Filter feature */}
          <SortFilterDynamic
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
                  sortFilterChanged ||
                  countBol != countBooleanSortFilter(listFilter)
                    ? "secondary"
                    : "primary"
                }
              >
                {sortFilterChanged ||
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
