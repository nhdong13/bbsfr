import { Col, Collapse } from "react-bootstrap"
import styles from "../Vehicles.module.scss"
import { useState } from "react"
import Image from "next/image"
import YearGroupedComponent from "./YearGroupedComponent"

const MakeGroupedComponent = (props) => {
  const { title, vehicle, noBorder } = props
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        aria-controls="vehicle-collapse-text"
        aria-expanded={open}
        className={
          open
            ? styles.collapseHeaderWithBlackBorder
            : noBorder && noBorder == true
            ? styles.collapseHeader
            : styles.collapseHeaderWithGrayBorder
        }
      >
        <div className="d-flex">
          <Col xs={10} sm={10} md={10} lg={11} xl={11} className="pl-0">
            <div>{title}</div>
          </Col>
          <Col xs={2} sm={2} md={2} lg={1} xl={1} className="h-100">
            <div className={styles.collapseIcon}>
              <Image
                src={open ? "/icons/subtract.svg" : "/icons/plus.svg"}
                alt={open ? "Icon subtract" : "Icon plus"}
                loading="lazy"
                layout="fill"
              />
            </div>
          </Col>
        </div>
      </div>
      <Collapse in={open}>
        <div className={styles.yearGroupedContainer}>
          {vehicle.map((item, i) => (
            <YearGroupedComponent
              key={`motorcycle-year-${i}`}
              title={Object.keys(item)[0]}
              yearGrouped={Object.values(item)[0]}
            />
          ))}
        </div>
      </Collapse>
    </>
  )
}
export default MakeGroupedComponent
