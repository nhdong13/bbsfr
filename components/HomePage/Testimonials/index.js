import { Col, Container, Row } from "react-bootstrap"
import styles from "../HomePage.module.scss"
import { useState } from "react"
import Slider from "react-slick"
import { renderStart } from "../../../services/renderStart"

const TestimonialsComponent = (props) => {
  const [activeSlide, setSlide] = useState(1)
  const data = [
    {
      rate: 4,
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      author: "Rob, Green Medows",
    },
    {
      rate: 4.5,
      content:
        "Overall Bikebiz had outstanding customer service, delivery was on time with no surprises. ",
      author: "Nick",
    },
    {
      rate: 5,
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      author: "RoBinSon",
    },
  ]

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
