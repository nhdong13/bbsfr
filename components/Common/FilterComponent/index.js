import {
  Filter,
  SearchProvider,
  FieldDictionary,
  FilterBuilder,
} from "@sajari/react-search-ui"
import React from "react"
import { useFilter, useSearchContext } from "@sajari/react-hooks"
import { Container } from "react-bootstrap"
import {
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  Heading,
} from "@sajari/react-components"
const PaginationComponent = ({ variables, pipeline, initialResponse }) => {
  const priceFilter = new FilterBuilder({
    name: "price",
    options: {
      High: "price >= 200",
      Mid: "price >= 50",
      Low: "price < 50",
    },
    multi: false,
    initial: ["High"],
  })

  const FilterRender = React.memo(({ name, title }) => {
    const { multi, options, selected, setSelected, reset } = useFilter(name)
    console.log(multi, options, selected)
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

  const productTypeFilter = new FilterBuilder({
    name: "type",
    field: "price",
  })

  const PriceFilter = () => <FilterRender name="type" title="Price (bucket)" />
  // const { results } = useSearchContext()

  return (
    <Container>
      <SearchProvider
        search={{
          pipeline,
          variables,
          filters: [productTypeFilter],
        }}
        initialResponse={initialResponse}
        searchOnLoad
      >
        <Filter
          name="type"
          title="Category"
          searchable
          sort="count"
          sortAscending={true}
        />
        {/* {results && <PriceFilter />} */}
      </SearchProvider>
    </Container>
  )
}

export default PaginationComponent
