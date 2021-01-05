import { useState } from "react"
import { Container } from "react-bootstrap"
import styles from "../Brand.module.scss"
import Link from "next/link"

const sortCharacter = (a, b) =>
  a?.node?.brand_name.localeCompare(b?.node?.brand_name, "en", {
    numeric: true,
  })

const handleSortAlpha = (brands, alpha) => {
  let arr
  if (brands && brands.length > 0) {
    arr = brands.filter((brand) => {
      if (
        brand?.node?.brand_name &&
        brand.node.brand_name.substr(0, 1).toUpperCase() === alpha
      ) {
        return brand.node.brand_name
      }
    })
  }
  return arr.sort(sortCharacter)
}

const BrandListComponent = ({ brands }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const [alpha, setAlpha] = useState("A")
  const [listBrand, setListBrand] = useState(handleSortAlpha(brands, alpha))
  const [alphanumeric, setAlphanumeric] = useState(
    letters.split("").map((i, index) => {
      if (index === 0) {
        return {
          letter: i,
          active: true,
        }
      } else {
        return {
          letter: i,
          active: false,
        }
      }
    })
  )

  const handleActive = (indexEl) => {
    setAlphanumeric(
      alphanumeric.map((i, index) => {
        if (indexEl === index) {
          setListBrand(handleSortAlpha(brands, i.letter))
          setAlpha(i.letter)
          return { ...i, active: true }
        } else {
          return { ...i, active: false }
        }
      })
    )
  }

  return (
    <>
      <Container fluid className={styles.containerBrandList}>
        <div className={styles.containerLHS}>
          {alphanumeric &&
            alphanumeric.length > 0 &&
            alphanumeric.map((i, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleActive(index)}
                  className={styles.containerLHSItem}
                >
                  <div
                    className={
                      i.active
                        ? styles.containerLHSItemTextActive
                        : styles.containerLHSItemText
                    }
                  >
                    <p>{i.letter}</p>
                  </div>
                  <div
                    className={
                      i.active
                        ? styles.containerLHSItemBorderActive
                        : styles.containerLHSItemBorder
                    }
                  ></div>
                </div>
              )
            })}
        </div>
        <div className={styles.containerRHS}>
          <div className={styles.containerRHSContent}>
            {listBrand &&
              listBrand.length > 0 &&
              listBrand.map((brand, index) => {
                return (
                  <Link key={index} href={`/brands/${brand.node._meta.uid}`}>
                    <a>
                      <p>{brand.node.brand_name}</p>
                    </a>
                  </Link>
                )
              })}
          </div>
        </div>
      </Container>
    </>
  )
}
export default BrandListComponent
