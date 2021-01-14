import { useState } from "react"
import { Row, Col, Button } from "react-bootstrap"
import clxs from "clsx"
import _ from "lodash"
import Image from "next/image"
import { useCheckout } from "@sdk/react"
import { LocalRepository } from "@sdk/repository"

import LoadingSpinner from "components/LoadingSpinner"
import Money from "../../Money"
import styles from "../Checkout.module.scss"

export default function OrderTotalCost({
  totalPrice,
  subtotalPrice,
  shippingPrice,
  discount,
  voucherifies,
}) {
  const { removePromoCode, load } = useCheckout()
  const [loading, setLoading] = useState(false)
  const listGiftCards = _.uniqBy(
    voucherifies.filter((card) => card.type === "GIFT_VOUCHER"),
    "code"
  )
  const repository = new LocalRepository()

  const handleDeleteGiftCard = async (code) => {
    setLoading(true)

    const checkout = repository.getCheckout()
    if (checkout?.id) {
      await removePromoCode(code)
    } else {
      const voucherifies = checkout?.voucherifies?.filter(
        (card) => card.code !== code
      )
      repository.setCheckout({ ...checkout, voucherifies })
      await load()
    }

    setLoading(false)
  }
  return (
    <Row className={clxs("my-4", styles.orderTotalCost)}>
      <LoadingSpinner show={loading} />
      <Col xs="6">
        <p>Sub Total</p>
        {discount?.amount > 0 && <p>Discount amount</p>}
        <p>Delivery</p>
        {listGiftCards.map((card) => (
          <p key={card.code}>
            {card.code}{" "}
            {
              <Button
                variant="link"
                type="button"
                className="p-0 align-text-top"
                onClick={() => handleDeleteGiftCard(card.code)}
              >
                <Image
                  src={"/icons/x-icon.svg"}
                  alt="delete"
                  width={16}
                  height={16}
                />
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
        {discount?.amount > 0 && (
          <p>
            <Money money={{ ...discount, amount: -discount.amount }} />
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
              money={{ amount: -card.currentBalanceAmount, currency: "AUD" }}
            />
          </p>
        ))}
        <p className={styles.totalCost}>
          <Money money={totalPrice?.gross} />
        </p>
      </Col>
    </Row>
  )
}
