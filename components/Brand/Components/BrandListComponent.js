import { useState } from "react"
import { Container } from "react-bootstrap"
import styles from "../Brand.module.scss"

const BrandListComponent = ({ brands }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const [alpha, setAlpha] = useState("A")
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
          setAlpha(i.letter)
          return { ...i, active: true }
        } else {
          return { ...i, active: false }
        }
      })
    )
  }
  const sortAlphaNum = (a, b) => a.localeCompare(b, "en", { numeric: true })
  console.log(
    [
      "A1",
      "A10",
      "A11",
      "Akrapovic Exhaust",
      "A2",
      "A3",
      "A4",
      "Alps Mountaineering",
      "B2",
      "F1",
      "F12",
      "Abus Locks",
    ].sort(sortAlphaNum)
  )

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
            <p>A</p>
          </div>
        </div>
      </Container>
    </>
  )
}
export default BrandListComponent
