import React, { useState } from "react"
import styles from "./filter.module.scss"
import { Collapse } from "react-bootstrap"
import Image from "next/image"
import { useFilter } from "@sajari/react-hooks"
import { useRouter } from "next/router"
import {
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  Combobox,
} from "@sajari/react-components"

const FilterRender = ({
  name,
  title,
  isOpen,
  handleSetOpenCollapse,
  setChanged,
}) => {
  const router = useRouter()
  router.events.on("routeChangeComplete", () => reset())
  const { multi, options, selected, setSelected, reset } = useFilter(name)
  const Group = multi ? CheckboxGroup : RadioGroup
  const Control = multi ? Checkbox : Radio
  const [open, setOpen] = useState(isOpen)

  return (
    <>
      {options?.length > 0 && (
        <div className={styles.containerFilter}>
          <>
            <div
              onClick={() => {
                setOpen(!open)
                handleSetOpenCollapse(name)
              }}
              className={styles.titleFilter}
            >
              <div className={styles.heading}>
                <p>{title}</p>
              </div>
              <div className={styles.icon}>
                <Image
                  src={open ? "/icons/subtract.svg" : "/icons/plus.svg"}
                  alt={open ? "Icon subtract" : "Icon plus"}
                  loading="lazy"
                  layout="fill"
                ></Image>
              </div>
            </div>
            <div className={styles.contextCollapse}>
              <Collapse in={open}>
                <div>
                  {name && name === "brand" && (
                    <>
                      <Combobox
                        className={styles.sajari_combobox}
                        placeholder="Search"
                      />
                    </>
                  )}
                  <div className="flex items-center justify-between mb-2"></div>
                  <Group
                    name={name}
                    value={selected}
                    onChange={(values) => {
                      setSelected(Array.isArray(values) ? values : [values])
                      setChanged(true)
                    }}
                  >
                    {options.map(({ value, label, count }) => (
                      <div className={styles.itemFilter} key={label + count}>
                        <Control
                          className={styles.itemFilterLabel}
                          value={label}
                          checked={selected.includes(label)}
                        >
                          {label}
                        </Control>
                        <span className={styles.itemFilterCount}>
                          &nbsp;{`(${count})`}
                        </span>
                      </div>
                    ))}
                  </Group>
                </div>
              </Collapse>
            </div>
          </>
        </div>
      )}
    </>
  )
}
export default FilterRender
