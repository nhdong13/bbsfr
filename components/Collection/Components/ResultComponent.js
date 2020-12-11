import {
  SearchProvider,
  Variables,
  Filter,
  FieldDictionary,
  Pagination} from "@sajari/react-search-ui"
import React, { useEffect, useState } from "react"
import { Container, Modal, Select } from "react-bootstrap"
import { useSearch, FilterBuilder, useSorting } from "@sajari/react-hooks"
import { Radio, RadioGroup } from "@sajari/react-components"
import { constants } from "../../../constant"
import PaginationComponent from "../../Common/PaginationComponent"
import Image from "next/image"
import { renderStart } from "../../../services/renderStart"
import styles from "../Collections.module.scss"
import Link from "next/link"
import { useSearchContext } from "@sajari/react-hooks"

const ResultComponent = (props) => {
  const { pipeline, initialResponse } = props
  const [windowWidth, setWindowWidths] = useState()
  const [countUnsetBorder, setCountUnsetBorder] = useState(2)
  const [show, setShow] = useState(false)

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

  // const SearchPlayground = React.memo(() => (
  //   <div className="flex flex-col space-y-6">
  //     <div className="flex -mx-3">
  //       <div className="w-1/4 px-3 border-gray-100 border-r space-y-6">
  //         {/* <Filter
  //           type="list"
  //           name="category"
  //           title="Category"
  //           searchable
  //           sort="alpha"
  //         /> */}
  //         <Sorting
  //           options={[
  //             { name: "Most relevant", value: "" },
  //             { name: "Name: A to Z", value: "name" },
  //             { name: "Name: Z to A", value: "-name" },
  //           ]}
  //           size="sm"
  //         />
  //         <Filter type="list" name="weight" title="Range ($)" />
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

  const FilterRender = React.memo(({ name, title }) => {
    const { multi, options, selected, setSelected, reset } = useFilter(name)

    if (options.length === 0) {
      return null
    }

    const Group = multi ? CheckboxGroup : RadioGroup
    const Control = multi ? Checkbox : Radio

    return (
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <Heading
            as="h6"
            className="font-medium tracking-wide text-gray-400 uppercase"
          >
            {title}
          </Heading>
          {selected.length > 0 && multi ? (
            <button
              className="text-xs text-blue-500 hover:underline uppercase p-0 bg-transparent focus:outline-none"
              onClick={reset}
            >
              Reset
            </button>
          ) : null}
        </div>
        <Group
          name={name}
          value={selected}
          onChange={multi ? setSelected : (e) => setSelected([e.target.value])}
        >
          {options.map(({ value, label, count }) => (
            <div
              className="flex justify-between items-center"
              key={label + count}
            >
              <Control
                value={label}
                checked={selected.includes(label)}
                onChange={() => {}}
                fontSize="sm"
              >
                {label}
              </Control>
              <span className="ml-2 text-xs text-gray-400">{count}</span>
            </div>
          ))}
        </Group>
      </div>
    )
  })

  const SortFilterButton = () => (
    <Container fluid className={styles.filter_sort_sajari}>
      <div className={styles.short_filter}>
        <div className={styles.title} onClick={() => setShow(true)}>
          <Image src="/sortby.svg" width={7} height={11} />
          <div>Sort by</div>
        </div>
        <div className={styles.title} onClick={() => setShow(true)}>
          <Image src="/filter.svg" width={11} height={11} />
          <div>Filter</div>
        </div>
        <div className={styles.horizontal_line}></div>
      </div>
    </Container>
  )

  const categoryFilter = new FilterBuilder({
    name: "category",
    field: "weight",
  })

  const SortingComponent = React.memo(() => {
    const { sorting, setSorting } = useSorting()

    return (
      <div className="">
        <div>
          <RadioGroup
            value={sorting}
            onChange={(e) => setSorting(e.target.value)}
          >
            <Radio value="">Most relevant</Radio>
            <Radio value="name">Name: A to Z</Radio>
            <Radio value="-name">Name: Z to A</Radio>
            <Radio value="price">Price: Low to High</Radio>
            <Radio value="-price">Price: High to Low</Radio>
          </RadioGroup>
        </div>
        <div>akwjehkweh</div>
        <Filter
          type="list"
          name="category"
          title="Category"
          searchable
          sort="alpha"
        />
      </div>
    )
  })
  const handleClose = () => setShow(false)
  const variables = new Variables({ resultsPerPage: constants.resultPerPage })
  const { results } = useSearchContext()
  console.log(results)
  return (
    <>
      <SortFilterButton />
      <SearchProvider
        search={{
          pipeline,
          fields: new FieldDictionary({
            title: "name",
          }),
          filters: [categoryFilter],
        }}
      >
        <Modal show={show} onHide={handleClose} className="short_filter_modal">
          <div className={styles.sort_by}>
            <div>SORT by</div>
            <SortingComponent />
          </div>
        </Modal>
      </SearchProvider>
      <div className={styles.listProduct}>
        {results &&
          results.map((item, index) => {
            return (
              <Link href="/" key={index.toString()}>
                <div key={index}>
                  <div className={handleStyle(index, results)}>
                    <div className={styles.elementProduct}>
                      <Image
                        alt={item.values.name}
                        src="https://images.prismic.io/slicemachine-blank/6b2bf485-aa12-44ef-8f06-dce6b91b9309_dancing.png?auto=compress,format"
                        height={172}
                        width={172}
                      ></Image>
                      <div className={styles.sessionInfo}>
                        <div className={styles.nameProduct}>
                          <p>{item.values.name}</p>
                        </div>
                        <div className={styles.priceProduct}>
                          <p>
                            {item.values.price ? `$${item.values.price}` : ""}
                          </p>
                        </div>
                        {renderStart(4, "16px", "16px")}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}

        <PaginationComponent
        initialResponse={initialResponse}
        pipeline={pipeline}
        variables={variables}
      />
    </div>
    </>
  )
}

export default ResultComponent
