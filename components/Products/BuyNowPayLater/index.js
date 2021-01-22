import styles from "./BuyNowPayLater.module.scss";
import Image from "next/image";
import { LOGO_PRODUCT_MODULE } from "../../../constant";
import dynamic from "next/dynamic";
import { useState } from "react";
import ModalBottomBorderTopComponent from "../../Common/ModalOpenBottomStypeBorderTop";
const BuyNowPayLaterModalDynamic = dynamic(() =>
  import("../BuyNowPayLaterModal")
);

const BuyNowPayLaterComponent = ({ dataProduct }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const price = dataProduct?.pricing || {};
  return (
    <>
      <div className={styles.containerBuyNowPayLater}>
        <p className={styles.containerBuyNowPayLaterTitle}>By now, pay later</p>
        <div className={styles.containerBuyNowPayLaterImg}>
          <div onClick={handleShow} className={styles.itemImg}>
            <Image
              layout="fill"
              loading="eager"
              src={LOGO_PRODUCT_MODULE.logoKlarna}
              alt="Logo Klarna"
            />
          </div>
          <div onClick={handleShow} className={styles.itemImg}>
            <Image
              layout="fill"
              loading="eager"
              src={LOGO_PRODUCT_MODULE.logoZip}
              alt="Logo Zip"
            />
          </div>
          <div onClick={handleShow} className={styles.itemImg}>
            <Image
              layout="fill"
              loading="eager"
              src={LOGO_PRODUCT_MODULE.logoAfterpay}
              alt="Logo Afterpay"
            />
          </div>
        </div>
      </div>
      <ModalBottomBorderTopComponent show={show} onHide={handleClose}>
        <BuyNowPayLaterModalDynamic price={price} handleClose={handleClose} />
      </ModalBottomBorderTopComponent>
    </>
  );
};
export default BuyNowPayLaterComponent;
