import React, { useState } from "react"
import { Container } from "react-bootstrap"
import styles from "../HomePage.module.scss"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { pad } from "../../../services/brand.js"

export default function Brand(props) {
  const [activeSlide, setSlide] = useState(1)
  let b = []
  b.push(props.brands)
  b.push(props.brands)
  b.push(props.brands)
  b.push(props.brands)
  b = b.flat()
  //use b array clone for test
  let num_pages = Math.floor(b.length / 6) + 1
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    beforeChange: (current, next) => {
      console.log(next)
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
    <Container className={styles.brand}>
      <div className={styles.striped}></div>
      <div className={styles.group_heading}>
        <h2 className={styles.text_heading_line_40}>shop by brand</h2>
        <p className={styles.view_all_btn}>view all</p>
      </div>
      <Slider {...settings} className="slider">
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
      <div className={styles.num_pages}>
        <p>{pad(activeSlide)}</p>
        <p className={styles.total_num_pages}>{`/${pad(num_pages)}`}</p>
      </div>
      <div className={styles.card_holder}>
        <div className={`${styles.card} ${styles.bg_gold}`}></div>
      </div>
    </Container>
  )
}
