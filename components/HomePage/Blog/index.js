import { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import styles from "../HomePage.module.scss"
import Link from "next/link"
import Slider from "react-slick"
import { pad } from "../../../services/brand.js"
import Image from "next/image"

const BlogComponent = (props) => {
  const [activeSlide, setSlide] = useState(1)
  const [width, setWidth] = useState(100)

  useEffect(() => {
    // Update the document title using the browser API
    let width = window.innerWidth
    // setImageWidth(width / 4.5)
    setWidth(width - 30)
  })
  //TODO: Clone Array to Testing UI, Temporary Data, Will be remove
  let a = [1, 2, 3]

  let num_pages = a.length

  var settings = {
    dots: false,
    infinite: false,
    accessibility: true,
    slidesToShow: 1.5,
    slidesToScroll: 1,
    // autoplay: true,
    // speed: 500,
    beforeChange: (current, next) => {
      Number.isInteger(next)
        ? setSlide(next + 1)
        : setSlide(Math.ceil(next) + 1)
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <Container fluid className={styles.blog}>
      <div className={styles.group_heading}>
        <h2 className={styles.text_heading_line_40}>off the press</h2>
        <Link href="/blogs">
          <a>
            <p className={styles.view_all_btn}>view all</p>
          </a>
        </Link>
      </div>
      <Slider {...settings} className={styles.slider_custom}>
        {a.map((x, id) => (
          <div key={id} className="pr-4">
            <div className="position-relative">
              <Image
                width={242}
                height="auto"
                alt={`img-${id}`}
                className={styles.border_none_image}
                // TODO: Clone Image to Testing UI, Temporary Data, Will be remove
                src="https://s3.amazonaws.com/s3-wp-product/wp-content/uploads/2019/03/25094806/Bikebiz2.jpg"
              ></Image>
              <div
                className={`${styles.line_bottom_image} ${
                  activeSlide == id + 1 ? styles.line_image_active : ""
                }`}
              ></div>
            </div>
            <div className={`${styles.heading2} ${styles.content_blog}`}>
              Beginners guide to riding a motorcycle
            </div>
            <div className={styles.read_more}>Read More</div>
          </div>
        ))}
      </Slider>
      <div className={styles.num_pages}>
        <p>{pad(activeSlide)}</p>
        <p className={styles.total_num_pages}>{`/${pad(num_pages)}`}</p>
      </div>
      <div className={styles.card_holder}>
        {a.map((brand, id) => (
          <div
            key={id}
            className={`${styles.card} ${styles.bg_gold} ${
              activeSlide == id + 1 ? styles.card_active : styles.card_inactive
            }`}
            style={{ width: `${width / a.length}px` }}
          ></div>
        ))}
      </div>
    </Container>
  )
}

export default BlogComponent
