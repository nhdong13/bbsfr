import { Container } from "react-bootstrap"
import styles from "../Brand.module.scss"
import Link from "next/link"
import { useState } from "react"

const SearchBrandIndexComponent = () => {
  const [brands, setBrands] = useState([])
  const handleClick = (e) => {
    e.preventDefault()
    //Search and find data - will update soon
    //This is code tmp will replace if have data
    if (e.target.value) {
      setBrands([1, 2])
    } else {
      setBrands([])
    }
  }

  return (
    <div className={styles.searchBrandIndexPosition}>
      <div className={styles.searchBrandIndex}>
        <Container fluid className={styles.searchBrandIndexContainer}>
          <p className={styles.searchBrandIndexTitle}>SHOP BY BRAND</p>
          <div
            className={
              brands && brands.length && brands.length > 0
                ? styles.searchBrandIndexDropdownContentOpen
                : styles.searchBrandIndexDropdownContent
            }
          >
            <input
              onChange={handleClick}
              className={styles.searchBrandIndexInput}
              type="text"
              name="search"
              placeholder="Search by brand name"
            />
            <div className={styles.searchBrandIndexOptions}>
              {brands &&
                brands.length > 0 &&
                brands.map((i, index) => {
                  return (
                    <div className={styles.searchBrandIndexOptionItem}>
                      <Link href="/">
                        <a>Brand</a>
                      </Link>
                    </div>
                  )
                })}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
export default SearchBrandIndexComponent
