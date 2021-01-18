import Slider from "react-slick";
import Image from "next/image";
import styles  from "./ProductImageCarousel.module.scss";

function ProductImageCarousel({images}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className={styles.productPageImageContainer}>
      <Slider {...settings}>
        {
          images.map((image, idx) => {
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
      {/* <div className={styles.rectangleGradient}></div> */}
    </div>
  )
}

export default ProductImageCarousel;