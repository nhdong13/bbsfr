import styles from "../Collections.module.scss"
import Image from "next/image"
import Link from "next/link"
import { renderStart } from "../../../services/renderStart"
import React, { useEffect, useState } from "react"

const ProductComponent = ({ products, item, index }) => {
  const [countUnsetBorder, setCountUnsetBorder] = useState(2)
  const [windowWidth, setWindowWidths] = useState()

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window
    setWindowWidths(width)
    window.addEventListener("resize", { width, height })
    return () => window.removeEventListener("resize", { width, height })
  }, [])

  useEffect(() => {
    return handleResponsive()
  })

  //Handle check to responsive product
  const handleResponsive = () => {
    if (windowWidth <= 425) {
      setCountUnsetBorder(2)
    } else if (windowWidth <= 768 && windowWidth > 425) {
      setCountUnsetBorder(4)
    } else if (windowWidth === 1024 && windowWidth > 768) {
      setCountUnsetBorder(4)
    } else if (windowWidth === 1440 && windowWidth > 1024) {
      setCountUnsetBorder(4)
    } else {
      setCountUnsetBorder(4)
    }
  }

  //Map styles to render border
  const handleStyle = (index, results) => {
    let concatStyles
    if ((index + 1) % countUnsetBorder === 0) {
      concatStyles = styles.containerProductMode
    } else {
      concatStyles = styles.containerProduct
    }
    //Un set border bottom
    if (windowWidth <= 425) {
      //Check result per page have even number or odd number
      if (results.length % 2 === 0 && index + 1 === results.length - 1) {
        concatStyles += ` ${styles.unsetBorder}`
      }
      if (index + 1 === results.length) {
        concatStyles += ` ${styles.unsetBorder}`
      }
    } else if (windowWidth >= 768) {
      //Check result per page have even number or odd number
      if (results.length % 2 === 0 && index + 1 === results.length - 3) {
        concatStyles += ` ${styles.unsetBorder}`
      }
      if (
        index + 1 === results.length ||
        index + 1 === results.length - 1 ||
        index + 1 === results.length - 2
      ) {
        concatStyles += ` ${styles.unsetBorder}`
      }
    }
    return concatStyles
  }
  return (
    <div key={index}>
      <div className={handleStyle(index, products)}>
        <div className={styles.elementProduct}>
          <Link href="/">
            <a>
              <div>
                <Image
                  alt={item.values.name}
                  src="https://images.prismic.io/slicemachine-blank/6b2bf485-aa12-44ef-8f06-dce6b91b9309_dancing.png?auto=compress,format"
                  height={128}
                  width={172}
                ></Image>
              </div>
            </a>
          </Link>
          <div className={styles.sessionInfo}>
            <div className={styles.nameProduct}>
              <p>{item.values.name}</p>
            </div>
            <div className={styles.priceProduct}>
              <p>{item.values.price ? `$${item.values.price}` : ""}</p>
            </div>
            {renderStart(4.5, "16px", "16px", 5)}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductComponent
