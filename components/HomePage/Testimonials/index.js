import { Col, Container, Row } from "react-bootstrap"
import styles from "../HomePage.module.scss"
import { useState } from "react"
import Slider from "react-slick"
import { renderStart } from "../../../services/renderStart"
import { useRouter } from "next/router"
import { dataToRender } from "../../../services/testimonial"

const TestimonialsComponent = (props) => {
  const { testimonials, type } = props
  const [activeSlide, setSlide] = useState(1)

  let data = dataToRender(testimonials.results, useRouter().query, type)

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
    <Container
      style={{ maxWidth: "unset" }}
      className={styles.padding_testimonials}
    >
      <Col className={styles.testimonials}>
        <div className={styles.testimonialsTitle}>
          <div className={styles.testimonialsText}>
            <p>What our Customers Say</p>
          </div>
        </div>
        {/*  */}
        <div>
          <Slider {...settings}>
            {data &&
              data.map((item, index) => {
                return (
                  <Col className={styles.testimonialsSlider} key={index}>
                    <div className={styles.testimonialsSliderStart}>
                      {renderStart(item.rate, "24px", "24px", 5)}
                    </div>
                    <div className={styles.testimonialsSliderContext}>
                      {item.content}
                    </div>
                    <div className={styles.testimonialsSliderAuthor}>
                      {item.author}
                    </div>
                  </Col>
                )
              })}
          </Slider>
        </div>
      </Col>
    </Container>
  )
}

export default TestimonialsComponent
