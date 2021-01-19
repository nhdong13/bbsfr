import React, { useState } from 'react';
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link"
import { Row, Col } from "react-bootstrap";
import styles  from "./ProductImageCarousel.module.scss";

function ProductImageCarousel({images, category}) {
  const [activeSlide, setActiveSlide] = useState(1);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: current => setActiveSlide(current + 1) // current start from 0
  };

  const placeholderImage = {
    alt: 'placeholder-image',
    url: "/images/placeholder.jpg"
  }

  let imagesList = [placeholderImage];
  
  if (images.length) {
    imagesList = images;
  }

  return (
    <div className={styles.productPageImageContainer}>
      <Slider {...settings}>
        {
          imagesList.map((image, idx) => {
            return <div className="position-relative w-100" key={idx}>
              <div className={styles.productPageImage}>
                <Image
                  layout="fill"
                  loading="lazy"
                  alt={`img-${idx}`}
                  className={""}
                  src={image.url}
                ></Image>
              </div>
            </div>
          })
        }
      </Slider>
      <Row className={styles.categoryNameSliderIndex}>
        <Col className={styles.categoryName} xs={6}>
          <Link href={`/${category.name}`}>
            { category.name }
          </Link>
        </Col>
        <Col className={styles.sliderIndex} xs={6}>
          <div className={styles.sliderIndexContent}>{activeSlide} / {imagesList.length}</div>
        </Col>
      </Row>
    </div>
  )
}

export default ProductImageCarousel;