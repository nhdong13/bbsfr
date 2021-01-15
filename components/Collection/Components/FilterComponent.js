import styles from "../Collections.module.scss"
import FilterRender from "../../Common/Filter"
import { Filter } from "@sajari/react-search-ui"

const FilterComponent = ({
  arrFilter,
  handleSetOpenCollapse,
  filterChanged,
  setFilterChanged,
}) => {
  return (
    <>
      <div className="">
        <div className={styles.filterTitle}>
          <p>REFINE BY</p>
        </div>
        {arrFilter.map((item, index) => (
          <FilterRender
            handleSetOpenCollapse={handleSetOpenCollapse}
            key={index}
            name={item.name}
            title={item.title}
            isOpen={item.open}
            filterChanged={filterChanged}
            setFilterChanged={setFilterChanged}
          />
        ))}
        <Filter type="rating" name="rating" title="Rating" />
      </div>
    </>
  )
}
export default FilterComponent
