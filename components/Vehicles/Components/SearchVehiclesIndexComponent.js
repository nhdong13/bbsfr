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
          <label
            className={styles.searchVehiclesIndexTitle}
            htmlFor="searchVehicles"
          >
            Enter your bikes details
          </label>
          <input
            onChange={handleClick}
            className={styles.searchVehiclesIndexInput}
            type="text"
            name="search"
            placeholder="Type here"
            id="searchVehicles"
          />
        </Container>
      </div>
    </div>
  )
}
export default SearchVehiclesIndexComponent
