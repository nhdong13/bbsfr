import { Col, Collapse } from "react-bootstrap"
import styles from "../Vehicles.module.scss"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

const YearGroupedComponent = (props) => {
  const { title, yearGrouped } = props
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        aria-controls="year-collapse-text"
        aria-expanded={open}
        className={
          open ? styles.yearGroupedTitle : styles.yearGroupedTitleWithBorder
        }
      >
        <div className="d-flex">
          <Col xs={10} sm={10} md={10} lg={11} xl={11} className="p-0">
            <div>{title}</div>
          </Col>
          <Col xs={2} sm={2} md={2} lg={1} xl={1} className="h-100">
            <div className={styles.collapseIcon}>
              <Image
                src={open ? "/icons/subtract.svg" : "/icons/plus.svg"}
                alt={open ? "Icon subtract" : "Icon plus"}
                loading="lazy"
                layout="fill"
              ></Image>
            </div>
          </Col>
        </div>
      </div>
      <Collapse in={open}>
        <div>
          {yearGrouped.map((vehicle) => (
            <Link href={`/vehicles/${vehicle?._meta?.uid}`}>
              <p className={styles.vehicleLink}>{vehicle.motorcycle_model}</p>
            </Link>
          ))}
        </div>
      </Collapse>
    </>
  )
}
export default YearGroupedComponent
