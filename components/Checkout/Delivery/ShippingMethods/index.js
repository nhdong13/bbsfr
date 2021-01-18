import { useState } from "react"
import { Row, Col, Button } from "react-bootstrap"
import Image from "next/image"
import clsx from "clsx"
import { useCheckout } from "@sdk/react"

import LoadingSpinner from "components/LoadingSpinner"
import Money from "../../../Money"
import { SHIPPING_METHODS_ICON } from "../../constants"
import ErrorMessageWrapper from "../../ErrorMessageWrapper"
import styles from "../Delivery.module.scss"

export default function ShippingMethods({
  values,
  availableShippingMethods,
  handleSubmitError,
  setFieldValue,
  errors,
  touched,
}) {
  const { setShippingMethod } = useCheckout()
  const [loading, setLoading] = useState(false)

  const selectMethod = async (id) => {
    setLoading(true)
    // Set Shipping method
    const { dataError } = await setShippingMethod(id)
    setLoading(false)
    if (dataError) {
      handleSubmitError()
      return
    }
    setFieldValue("shippingMethod", id)
  }

  return (
    <Row className={styles.shippingMethods}>
      <LoadingSpinner show={loading} />

      <Col md="12">
        {availableShippingMethods?.length > 0 &&
          availableShippingMethods.map((method) => (
            <Button
              key={method.id}
              variant="white"
              className={clsx(
                styles.btn,
                "w-100",
                method.id === values.shippingMethod ? styles.active : ""
              )}
              onClick={() => selectMethod(method.id)}
              type="button"
            >
              <span className={styles.btnIcon}>
                <Image
                  src={SHIPPING_METHODS_ICON[method.deliveryType]}
                  alt={method.name || ""}
                  width={16}
                  height={16}
                />
              </span>

              {method.name}

              <Money
                money={method.price?.amount ? method.price : null}
                defaultValue="FREE"
                className={styles.methodPrice}
              />
            </Button>
          ))}
      </Col>
      <Col md="12">
        <ErrorMessageWrapper
          errors={errors}
          touched={touched}
          fieldName="shippingMethod"
        />
      </Col>
    </Row>
  )
}
