import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import styles from "../HomePage.module.scss"
import Slider from "react-slick"
import { pad, chunks, checkID } from "../../../services/brand.js"
import Image from "next/image"
import Link from "next/link"

export default function Brand(props) {
  const [activeSlide, setSlide] = useState(1)
  const [image_width, setImageWidth] = useState(100)
  const [width, setWidth] = useState(100)

  useEffect(() => {
    // Update the document title using the browser API
    let width = window.innerWidth
    setImageWidth(width / 4.5)
    setWidth(width - 30)
  })

  let brands = chunks(props.brands, 6)
  let num_pages = Math.floor(props.brands.length / 6) + 1
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => {
      setSlide(next + 1)
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false /* set centerMode to false to show complete slide instead of 3 */,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <Container fluid className={styles.brand} id="home_page_brand">
      <div className={styles.striped}></div>
      <div className={styles.group_heading}>
        <h2 className={styles.text_heading_line_40}>shop by brand</h2>
        <Link href="/brands">
          <a>
            <p className={styles.view_all_btn}>view all</p>
          </a>
        </Link>
      </div>
      <Slider {...settings} className={styles.slider_custom}>
        {brands.map((brand, index) => (
          <div key={index}>
            <Row className="auto-clear">
              {brand.map((b, id) =>
                (id + 1) / 4 != 1 ? (
                  <Col
                    key={id}
                    className={`${styles.logo_custom} ${
                      styles.point_line_brand
                    } ${checkID(id, styles, brand.length)}`}
                  >
                    <Link href={`brands${b.brand_link}`} key={id}>
                      <a>
                        <div
                          style={{
                            position: "relative",
                            width: `${image_width * 1.33}px`,
                            height: `${image_width}px`,
                          }}
                        >
                          <Image
                            src={b.brand_logo.url}
                            alt={b.brand_logo.alt || ""}
                            loading="lazy"
                            layout="fill"
                          ></Image>
                        </div>
                      </a>
                    </Link>
                  </Col>
                ) : (
                  [
                    <div className="w-100" key={-id.toString()}></div>,
                    <Col
                      key={id}
                      className={`${styles.logo_custom} ${
                        styles.point_line_brand
                      } ${checkID(id, styles)}`}
                    >
                      <Link href={`brands${b.brand_link}`} key={id}>
                        <a>
                          <div
                            style={{
                              position: "relative",
                              width: `${image_width * 1.33}px`,
                              height: `${image_width}px`,
                            }}
                          >
                            <Image
                              src={b.brand_logo.url}
                              alt={b.brand_logo.alt || ""}
                              loading="lazy"
                              layout="fill"
                            ></Image>
                          </div>
                        </a>
                      </Link>
                    </Col>,
                  ]
                )
              )}
            </Row>
            <h3 className="d-none"></h3>
          </div>
        ))}
      </Slider>
      <div className={styles.num_pages}>
        <p>{pad(activeSlide)}</p>
        <p className={styles.total_num_pages}>{`/${pad(num_pages)}`}</p>
      </div>
      <div className={styles.card_holder}>
        {brands.map((brand, id) => (
          <div
            key={id}
            className={`${styles.card} ${styles.bg_gold} ${
              activeSlide == id + 1 ? styles.card_active : styles.card_inactive
            }`}
            style={{ width: `${width / brands.length}px` }}
          ></div>
        ))}
      </div>
    </Container>
  )
}
