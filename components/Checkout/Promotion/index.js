import { useState } from "react"
import { Container, InputGroup, Row, Col, Form, Button } from "react-bootstrap"
import clsx from "clsx"
import { useMutation } from "@apollo/client"
import { useCart, useCheckout } from "@sdk/react"

import LoadingSpinner from "components/LoadingSpinner"
import { voucherifyValidate } from "lib/mutations"
import ErrorMessageWrapper from "../ErrorMessageWrapper"
import styles from "../Checkout.module.scss"

export default function PromotionComponent({
  values,
  handleChange,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
  setFieldError,
}) {
  const [loading, setLoading] = useState(false)
  const { items, subtotalPrice } = useCart()
  const { addPromoCode, removePromoCode, load } = useCheckout()
  const [validateVoucherify] = useMutation(voucherifyValidate)

  const handleApplyCode = async () => {
    setLoading(true)
    const { data } = await validateVoucherify({
      variables: {
        input: {
          amount: subtotalPrice.gross.amount,
          type: "DISCOUNT_VOUCHER",
          code: values.promotion.code,
          lines: items.map((item) => {
            return {
              quantity: item.quantity,
              variantId: item.variant.id,
            }
          }),
        },
      },
    })

    const { voucherify } = data.voucherifyValidate

    if (voucherify.valid === "true") {
      setFieldValue("promotion.valid", true)
      setFieldValue("promotion.discountAmount", {
        amount: voucherify.discountAmount,
        currency: "AUD",
      })
      setFieldValue("promotion.discountedPrice", {
        amount: voucherify.discountedPrice,
        currency: "AUD",
      })
      await addPromoCode(values.promotion.code)
    } else {
      setFieldTouched("promotion.code", true, false)
      setFieldError("promotion.code", "Invalid promotion code")
    }
    setLoading(false)
  }

  const handleDeletePromoCode = async () => {
    setLoading(true)
    await removePromoCode(values.promotion.code)
    const promotion = {
      valid: false,
      code: "",
      discountAmount: null,
      discountedPrice: null,
    }
    setFieldValue("promotion", promotion)
    setLoading(false)
  }

  const handleApplyGiftCard = async () => {
    setLoading(true)
    const { data } = await validateVoucherify({
      variables: {
        input: {
          amount: subtotalPrice.gross.amount,
          code: values.giftCard,
          type: "GIFT_VOUCHER",
          lines: items.map((item) => {
            return {
              quantity: item.quantity,
              variantId: item.variant.id,
            }
          }),
        },
      },
    })

    const { voucherify } = data.voucherifyValidate

    if (voucherify.valid === "true") {
      await addPromoCode(values.giftCard)
      await load()
      setFieldValue("giftCard", "")
    } else {
      setFieldTouched("giftCard", true, false)
      setFieldError("giftCard", "Invalid Gift Card Number")
    }
    setLoading(false)
  }

  return (
    <Row className={clsx(styles.promotionSection, "secondary-bg")}>
      <Container>
        <Row>
          <LoadingSpinner show={loading} />
        </Row>
        <Row>
          <Col md="12">
            <Form.Row>
              <Form.Group controlId="promotionCode" as={Col} xs="12">
                <Form.Label className={styles.formLabel}>Promo Code</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Enter promo code"
                    name="promotion.code"
                    value={values.promotion.code}
                    onChange={handleChange}
                    disabled={values.promotion.valid}
                  />
                  <InputGroup.Append>
                    <Button
                      variant="primary"
                      className={styles.btn}
                      type="button"
                      onClick={
                        values.promotion.valid
                          ? handleDeletePromoCode
                          : handleApplyCode
                      }
                    >
                      {values.promotion.valid ? "Delete" : "Apply"}
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
                <ErrorMessageWrapper
                  errors={errors}
                  touched={touched}
                  fieldName="promotion.code"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="giftCardNumber" as={Col} xs="12">
                <Form.Label className={styles.formLabel}>
                  Gift card Number
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter gift card number"
                  name="giftCard"
                  value={values.giftCard}
                  onChange={handleChange}
                />
                <ErrorMessageWrapper
                  errors={errors}
                  touched={touched}
                  fieldName="giftCard"
                />
              </Form.Group>

              <Form.Group controlId="giftCardNumber" as={Col} xs="12">
                <Button
                  variant="primary"
                  className={clsx(styles.btn, "w-100")}
                  onClick={handleApplyGiftCard}
                >
                  Apply gift card
                </Button>
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
      </Container>
    </Row>
  )
}
