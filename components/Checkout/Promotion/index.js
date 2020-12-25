import { useState } from "react"
import { Container, InputGroup, Row, Col, Form, Button } from "react-bootstrap"
import clsx from "clsx"
import { useMutation } from "@apollo/client"
import { useCart } from "@sdk/react"

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
  const [validateVoucherify] = useMutation(voucherifyValidate)

  const handleClickApply = async () => {
    setLoading(true)
    const { data } = await validateVoucherify({
      variables: {
        input: {
          amount: subtotalPrice.gross.amount,
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
    } else {
      setFieldTouched("promotion.code", true, false)
      setFieldError("promotion.code", "Invalid promotion code")
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
                    placeholder="Enter promo code number"
                    name="promotion.code"
                    value={values.promotion.code}
                    onChange={handleChange}
                  />
                  <InputGroup.Append>
                    <Button
                      variant="primary"
                      className={styles.btn}
                      type="button"
                      onClick={handleClickApply}
                    >
                      Apply
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
                  name="giftCard.code"
                  value={values.giftCard.code}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="giftCardNumber" as={Col} xs="12">
                <Button variant="primary" className={clsx(styles.btn, "w-100")}>
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
