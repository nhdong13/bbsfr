import { Container } from "react-bootstrap"
import styles from "../Vehicles.module.scss"
import Link from "next/link"
import { useState } from "react"

const SearchVehiclesIndexComponent = () => {
  const handleClick = (e) => {
    e.preventDefault()
    //Search and find data - will update soon
    //This is code tmp will replace if have data
  }

  return (
    <div className={styles.searchVehiclesIndexPosition}>
      <div className={styles.searchVehiclesIndex}>
        <Container fluid className={styles.searchVehiclesIndexContainer}>
          <p className={styles.searchVehiclesIndexTitle}>
            Enter your bikes details
          </p>
          <input
            onChange={handleClick}
            className={styles.searchVehiclesIndexInput}
            type="text"
            name="search"
            placeholder="Type here"
          />
        </Container>
      </div>
    </div>
  )
}
export default SearchVehiclesIndexComponent
