import styles from "../filter.module.scss"
import {
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  Rating,
} from "@sajari/react-components"

const FilterRatingOption = ({
  name,
  setSelected,
  setFilterChanged,
  selected,
  multi,
  options,
}) => {
  const Group = multi ? CheckboxGroup : RadioGroup
  const Control = multi ? Checkbox : Radio
  return (
    <>
      <Group
        name={name}
        value={selected}
        onChange={(values) => {
          setSelected(Array.isArray(values) ? values : [values])
          setFilterChanged(true)
        }}
      >
        {options.map(({ value, label, count }) => (
          <div className={styles.itemFilter} key={label + count}>
            <Control
              className={styles.itemFilterLabel}
              value={label}
              checked={selected.includes(label)}
            >
              <Rating value={label} />
            </Control>
            <span className={styles.itemFilterCount}>&nbsp;{`(${count})`}</span>
          </div>
        ))}
      </Group>
    </>
  )
}
export default FilterRatingOption
