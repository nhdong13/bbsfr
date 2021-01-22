import { Container } from "react-bootstrap";
import styles from ".././BuyNowPayLater/BuyNowPayLater.module.scss";
import Image from "next/image";
import { LOGO_PRODUCT_MODULE } from "../../../constant";
import dynamic from "next/dynamic";
import KlarnaCheckoutComponent from "./Components/KlarnaCheckoutComponent";
import AddToCart from "../AddToCart";
const KlarnaCostDynamic = dynamic(() =>
  import("./Components/KlarnaCostComponent")
);
const KlarnaTextDynamic = dynamic(() =>
  import("./Components/KlarnaTextComponent")
);
const KlarnaTextBottomDynamic = dynamic(() =>
  import("./Components/KlarnaTextBottomComponent")
);

const BuyNowPayLaterModal = ({ handleClose, price }) => {
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
        "When you choose Klarna at checkout, you’ll get the option to shop now and pay later for your purchase. It is easy, safe to use, and you’re always covered by <u>Klarna’s Buyer Protection.</u>",
      type: "danger",
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
  ];

  const sectionBottom = [
    {
      title: "Is there a fee to use 4 interest-free instalments?",
      context:
        "There are no upfront fees when you follow the payment schedule. Please review product terms for applicable fees.",
    },
    {
      title: "Will Klarna perform a credit check?",
      context:
        "When you choose 4 interest-free instalments, Klarna may order a credit report from a 3rd party. Please review product terms for more information on this.",
    },
    {
      title: "How can I reach Klarna?",
      context:
        "You can reach Klarna anytime at https://www.klarna.com/au/customer-service/ or by downloading the Klarna App for 24/7 chat.",
    },
  ];

  return (
    <>
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
        <Container fluid className={styles.sectionCost}>
          <KlarnaCostDynamic
            contextLeft={"Total cost with Klarna"}
            cost={399}
            calculate={false}
          />
          <div style={{ border: "0.5px solid #222222" }}></div>
          <KlarnaCostDynamic
            contextLeft={"Split cost with Klarna"}
            cost={99}
            calculate={true}
          />
        </Container>
        {/* End cost */}
      </div>
      <div className={styles.containerBodyModal}>
        {sectionBody &&
          sectionBody.map((item, index) => {
            if (item?.type === "normal" || item?.type === "danger") {
              return (
                <KlarnaTextDynamic
                  key={index}
                  title={item.title}
                  context={item.context}
                  type={item.type}
                />
              );
            } else {
              return <KlarnaCheckoutComponent key={index} title={item.title} />;
            }
          })}
      </div>
      <div className={styles.containerBottomModal}>
        {sectionBottom &&
          sectionBottom.map((item, index) => {
            return (
              <KlarnaTextBottomDynamic
                key={index}
                title={item.title}
                context={item.context}
              />
            );
          })}
      </div>

      <div className={styles.containerAddToCard}>
        <AddToCart />
      </div>
    </>
  );
};
export default BuyNowPayLaterModal;
