import { Container, Row, Col } from "react-bootstrap"
import styles from "../ProductDetails.module.scss"
import Image from "next/image"
import { LOGO_PRODUCT_MODULE } from "../../../constant"
import dynamic from "next/dynamic"
const KlarnaCostDynamic = dynamic(() =>
  import("./Components/KlarnaCostComponent")
)
const KlarnaTextDynamic = dynamic(() =>
  import("./Components/KlarnaTextComponent")
)

const BuyNowPayLaterModal = ({ handleClose }) => {
  const sectionBody = [
    {
      title: "Shop now, pay later with Klarna",
      context:
        "We’ve partnered with Klarna to give you more control over your purchases.",
      type: "normal",
    },
    {
      title: "It’s smoooth and simple",
      context:
        "When you choose Klarna at checkout, you’ll get the option to shop now and pay later for your purchase. It is easy, safe to use, and you’re always covered by Klarna’s Buyer Protection.",
      type: "normal",
    },
    {
      title: "4 interest-free instalments",
      context:
        "Split your purchase into 4 interest-free payments so you can spread the cost of your purchase over time. Enter the credit or debit card of your choice for automatic payments every two weeks. No interest or added fees when you pay on time!",
      type: "normal",
    },
    {
      title: "How to checkout with Klarna",
      context: "",
      type: "img",
    },
    {
      title: "Manage everything in your Klarna App",
      context:
        "Review your latest purchases and pay any open balances by logging into your Klarna account at https://app.klarna.com/login. You can also chat with Klarna Customer Service 24/7 in the Klarna App.",
      type: "normal",
    },
    {
      title: "Safe and secure",
      context:
        "Klarna uses the latest safeguards and security to protect your information and prevent unauthorized purchases. You have zero fraud liability with Klarna’s Buyer Protection policy.",
      type: "normal",
    },
    {
      title: "Frequently Asked Questions",
      context:
        "Don’t see your question here? Check out Klarna’s full FAQ page.",
      type: "normal",
    },
  ]
  return (
    <>
      <Container fluid className={styles.containerModal}>
        <div className={styles.containerContentModal}>
          <div className={styles.containerHeaderModal}>
            {/* Close */}
            <div className="position-relative">
              <div onClick={handleClose} className={styles.closeModal}>
                <p>close</p> &nbsp;
                <Image
                  src="/icons/icon-article.svg"
                  alt="icon-article"
                  width={15}
                  height={15}
                />
              </div>
            </div>
            {/* End close */}

            {/* Img */}
            <div className={styles.sectionImgTitle}>
              <Image
                src={LOGO_PRODUCT_MODULE.titleKlarna}
                alt="logo-article"
                width={135}
                height={33}
              />
            </div>
            {/* End Img */}

            {/* Cost */}
            <Container className={styles.sectionCost}>
              <KlarnaCostDynamic
                contextLeft={"Total cost with Klarna"}
                cost={"2"}
                calculate={false}
              />
              <div style={{ border: "0.5px solid #222222" }}></div>
              <KlarnaCostDynamic
                contextLeft={"Split cost with Klarna"}
                cost={"2"}
                calculate={true}
              />
            </Container>
            {/* End cost */}
          </div>
          <div className={styles.containerBodyModal}>
            {sectionBody &&
              sectionBody.map((item, index) => {
                if (item?.type === "normal") {
                  return (
                    <KlarnaTextDynamic
                      key={index}
                      title={item.title}
                      context={item.context}
                    />
                  )
                }
              })}
          </div>
        </div>
      </Container>
    </>
  )
}
export default BuyNowPayLaterModal
