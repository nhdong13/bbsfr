import { useState } from "react"
import { Row, Col, Button } from "react-bootstrap"
import clxs from "clsx"
import _ from "lodash"
import Image from "next/image"
import { useCheckout } from "@sdk/react"
import LoadingSpinner from "components/LoadingSpinner"
import Money from "../../Money"
import styles from "../Checkout.module.scss"

export default function OrderTotalCost({
  totalPrice,
  subtotalPrice,
  shippingPrice,
  promotion,
  discount,
  giftCards,
  setGiftCards,
  voucherifies,
}) {
  const discountAmount =
    discount?.amount > 0 ? discount : promotion?.discountAmount
  const { removePromoCode } = useCheckout()
  const [loading, setLoading] = useState(false)
  const listGiftCards = _.uniqBy(
    [...giftCards, ...voucherifies].filter(
      (card) => card.type === "GIFT_VOUCHER"
    ),
    "code"
  )

  const handleDeleteGiftCard = async (code) => {
    setLoading(true)
    await removePromoCode(code)
    setGiftCards(giftCards.filter((card) => card.code !== code))
    setLoading(false)
  }
  return (
    <Row className={clxs("my-4", styles.orderTotalCost)}>
      <LoadingSpinner show={loading} />
      <Col xs="6">
        <p>Sub Total</p>
        {discountAmount?.amount > 0 && <p>Discount amount</p>}
        <p>Delivery</p>
        {listGiftCards.map((card) => (
          <p key={card.code}>
            {card.code}{" "}
            {
              <Button
                variant="link"
                type="button"
                className="p-0"
                onClick={() => handleDeleteGiftCard(card.code)}
              >
                Delete
                {/* <Image
                    src={"/open-eye.svg"}
                    alt="delete"
                    width={16}
                    height={16}
                  /> */}
              </Button>
            }
          </p>
        ))}
        <p className={styles.totalCost}>TOTAL</p>
      </Col>

      <Col xs="6" className="text-right">
        <p>
          <Money money={subtotalPrice?.gross} />
        </p>
        {discountAmount?.amount > 0 && (
          <p>
            <Money money={discountAmount} />
          </p>
        )}
        <p>
          <Money
            money={shippingPrice?.amount ? shippingPrice : null}
            defaultValue="FREE"
          />
        </p>
        {listGiftCards.map((card) => (
          <p key={card.code}>
            <Money
              money={{ amount: card.currentBalanceAmount, currency: "AUD" }}
            />
          </p>
        ))}
        <p className={styles.totalCost}>
          <Money
            money={
              promotion?.discountedPrice?.amount > 0 && !discount?.amount
                ? promotion?.discountedPrice
                : totalPrice?.gross
            }
          />
        </p>
      </Col>
    </Row>
  )
}
