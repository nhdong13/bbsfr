import { Button } from "react-bootstrap";
import Money from "../../Money";
import styles from "./AddToCart.module.scss";

function AddToCart() {
  return (
    <>
      <div className={styles.addToCard}>
        <div className={styles.addToCardPrice}>
          $<Money money={{ amount: "399" }} supStyle={true} />
        </div>
        <div className={styles.addToCardButton}>
          <Button bsPrefix={styles.addToCardButtonCustom} size="lg">
            ADD TO CART
          </Button>
        </div>
      </div>
    </>
  );
}

export default AddToCart;