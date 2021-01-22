import { useState } from "react";
import { Container, InputGroup, Row, Col, Form, Button } from "react-bootstrap";
import clsx from "clsx";
import { useMutation } from "@apollo/client";
import { useCart, useCheckout } from "@sdk/react";
import { LocalRepository } from "@sdk/repository";

import LoadingSpinner from "components/LoadingSpinner";
import { voucherifyValidate } from "lib/mutations";
import ErrorMessageWrapper from "../ErrorMessageWrapper";
import styles from "../Checkout.module.scss";

export default function PromotionComponent({
  values,
  handleChange,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
  setFieldError,
}) {
  const [loading, setLoading] = useState(false);
  const { items, subtotalPrice } = useCart();
  const {
    addPromoCode,
    removePromoCode,
    promoCodeDiscount,
    load,
  } = useCheckout();
  const [validateVoucherify] = useMutation(voucherifyValidate);
  const valid = promoCodeDiscount?.voucherCode;
  const repository = new LocalRepository();

  const handleApplyCode = async () => {
    setLoading(true);
    const { data } = await validateVoucherify({
      variables: {
        input: {
          amount: subtotalPrice.gross.amount,
          type: "DISCOUNT_VOUCHER",
          code: values.promotion,
          lines: items.map((item) => {
            return {
              quantity: item.quantity,
              variantId: item.variant.id,
            };
          }),
        },
      },
    });

    const { voucherify } = data.voucherifyValidate;

    if (voucherify.valid === "true") {
      const checkout = repository.getCheckout();
      if (checkout?.id) {
        await addPromoCode(values.promotion);
      } else {
        const voucherifies = [
          ...(checkout.voucherifies || []),
          { ...voucherify, currentBalanceAmount: voucherify.discountAmount },
        ];
        repository.setCheckout({
          ...checkout,
          voucherifies,
          promoCodeDiscount: {
            discount: {
              amount: voucherify.discountAmount,
              currency: "AUD",
            },
            voucherCode: values.promotion,
          },
        });
        await load();
      }
    } else {
      setFieldTouched("promotion", true, false);
      setFieldError("promotion", "Invalid promotion code");
    }
    setLoading(false);
  };

  const handleDeletePromoCode = async () => {
    setLoading(true);

    const checkout = repository.getCheckout();
    if (checkout?.id) {
      await removePromoCode(promoCodeDiscount.voucherCode);
    } else {
      const voucherifies = checkout?.voucherifies?.filter(
        (card) => card.code !== promoCodeDiscount.voucherCode
      );
      repository.setCheckout({
        ...checkout,
        voucherifies,
        promoCodeDiscount: {},
      });
      await load();
    }

    setFieldValue("promotion", "");
    setLoading(false);
  };

  const handleApplyGiftCard = async () => {
    setLoading(true);
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
            };
          }),
        },
      },
    });

    const { voucherify } = data.voucherifyValidate;

    if (voucherify.valid === "true") {
      const checkout = repository.getCheckout();
      if (checkout?.id) {
        await addPromoCode(values.giftCard);
      } else {
        const voucherifies = [
          ...(checkout.voucherifies || []),
          { ...voucherify, currentBalanceAmount: voucherify.discountAmount },
        ];
        repository.setCheckout({ ...checkout, voucherifies });
        await load();
      }
      setFieldValue("giftCard", "");
    } else {
      setFieldTouched("giftCard", true, false);
      setFieldError("giftCard", "Invalid Gift Card Number");
    }
    setLoading(false);
  };

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
                    name="promotion"
                    value={promoCodeDiscount?.voucherCode || values.promotion}
                    onChange={handleChange}
                    disabled={promoCodeDiscount?.voucherCode}
                  />
                  <InputGroup.Append>
                    <Button
                      variant="green"
                      className={styles.btn}
                      type="button"
                      onClick={
                        promoCodeDiscount?.voucherCode
                          ? handleDeletePromoCode
                          : handleApplyCode
                      }
                      disabled={
                        !promoCodeDiscount.voucherCode && !values.promotion
                      }
                    >
                      {promoCodeDiscount?.voucherCode ? "Delete" : "Apply"}
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
                <ErrorMessageWrapper
                  errors={errors}
                  touched={touched}
                  fieldName="promotion"
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
                  variant="green"
                  className={clsx(styles.btn, "w-100")}
                  onClick={handleApplyGiftCard}
                  disabled={!values.giftCard.length}
                >
                  Apply gift card
                </Button>
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
      </Container>
    </Row>
  );
}
