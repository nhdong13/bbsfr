import React, { useEffect } from "react"
import { Container, Col, Row, Button } from "react-bootstrap"
import { useRouter } from "next/router"
import clsx from "clsx"

// import { useCart } from "@saleor/sdk"
import { useCart } from "@sdk/react"

import Item from "./Item"
import Money from "../Money"
import OrderTotalCost from "./OrderTotalCost"
import styles from "./Checkout.module.scss"

export default function CheckoutComponent() {
  const {
    items,
    removeItem,
    updateItem,
    totalPrice,
    subtotalPrice,
    shippingPrice,
  } = useCart()

  useEffect(() => {
    const data = {
      lines: [
        {
          id: "Q2hlY2tvdXRMaW5lOjIxMA==",
          quantity: 1,
          totalPrice: {
            gross: {
              amount: 30,
              currency: "AUD",
              __typename: "Money",
            },
            net: {
              amount: 30,
              currency: "AUD",
              __typename: "Money",
            },
            __typename: "TaxedMoney",
          },
          variant: {
            attributes: [
              {
                attribute: {
                  id: "QXR0cmlidXRlOjEz",
                  name: "Size",
                  __typename: "Attribute",
                },
                values: [
                  {
                    id: "QXR0cmlidXRlVmFsdWU6Mzg=",
                    name: "L",
                    value: "L",
                    __typename: "AttributeValue",
                  },
                ],
                __typename: "SelectedAttribute",
              },
            ],
            id: "UHJvZHVjdFZhcmlhbnQ6MzEz",
            isAvailable: true,
            name: "L",
            pricing: {
              onSale: false,
              priceUndiscounted: {
                gross: {
                  amount: 30,
                  currency: "AUD",
                  __typename: "Money",
                },
                net: {
                  amount: 30,
                  currency: "AUD",
                  __typename: "Money",
                },
                __typename: "TaxedMoney",
              },
              price: {
                gross: {
                  amount: 30,
                  currency: "AUD",
                  __typename: "Money",
                },
                net: {
                  amount: 30,
                  currency: "AUD",
                  __typename: "Money",
                },
                __typename: "TaxedMoney",
              },
              __typename: "VariantPricingInfo",
            },
            product: {
              id: "UHJvZHVjdDoxMTg=",
              name: "White Hoodie",
              thumbnail: {
                url:
                  "https://bbsfrapi.bikebiz.com.au/static/images/placeholder255x255.png",
                alt: "",
                __typename: "Image",
              },
              thumbnail2x: {
                url:
                  "https://bbsfrapi.bikebiz.com.au/static/images/placeholder540x540.png",
                __typename: "Image",
              },
              productType: {
                isShippingRequired: true,
                __typename: "ProductType",
              },
              __typename: "Product",
            },
            quantityAvailable: 50,
            sku: "35994675",
          },
        },
        {
          id: "Q2hlY2tvdXRMaW5lOjIxMQ==",
          quantity: 1,
          totalPrice: {
            gross: {
              amount: 49,
              currency: "AUD",
              __typename: "Money",
            },
            net: {
              amount: 49,
              currency: "AUD",
              __typename: "Money",
            },
            __typename: "TaxedMoney",
          },
          variant: {
            attributes: [
              {
                attribute: {
                  id: "QXR0cmlidXRlOjI0",
                  name: "Shoe size",
                  __typename: "Attribute",
                },
                values: [
                  {
                    id: "QXR0cmlidXRlVmFsdWU6Nzc=",
                    name: "41",
                    value: "41",
                    __typename: "AttributeValue",
                  },
                ],
                __typename: "SelectedAttribute",
              },
            ],
            id: "UHJvZHVjdFZhcmlhbnQ6MjQ4",
            isAvailable: true,
            name: "41",
            pricing: {
              onSale: false,
              priceUndiscounted: {
                gross: {
                  amount: 49,
                  currency: "AUD",
                  __typename: "Money",
                },
                net: {
                  amount: 49,
                  currency: "AUD",
                  __typename: "Money",
                },
                __typename: "TaxedMoney",
              },
              price: {
                gross: {
                  amount: 49,
                  currency: "AUD",
                  __typename: "Money",
                },
                net: {
                  amount: 49,
                  currency: "AUD",
                  __typename: "Money",
                },
                __typename: "TaxedMoney",
              },
              __typename: "VariantPricingInfo",
            },
            product: {
              id: "UHJvZHVjdDo4OA==",
              name: "White Plimsolls",
              thumbnail: {
                url:
                  "https://bbsfrapi.bikebiz.com.au/static/images/placeholder255x255.png",
                alt: "",
                __typename: "Image",
              },
              thumbnail2x: {
                url:
                  "https://bbsfrapi.bikebiz.com.au/static/images/placeholder540x540.png",
                __typename: "Image",
              },
              productType: {
                isShippingRequired: true,
                __typename: "ProductType",
              },
              __typename: "Product",
            },
            quantityAvailable: 50,
            sku: "978223582",
          },
        },
      ],
    }

    window.localStorage.setItem("data_checkout", JSON.stringify(data))
  }, [])

  const router = useRouter()
  const handleClick = (e) => {
    e.preventDefault()
    router.push("/checkout/signup")
  }

  return (
    <Container fluid className={styles.myCartContainer}>
      <Row className={clsx(styles.headerSection, "secondary-bg")}>
        <Container>
          <Row>
            <Col md="12" className="text-center">
              <h2 className="font-weight-bold">YOUR CART</h2>
              <span className="font-weight-bold">
                <span className="secondary mr-1">{items?.length} Items</span>{" "}
                <Money money={totalPrice?.gross} />
              </span>
            </Col>
          </Row>
        </Container>
      </Row>

      <Row className={styles.listItemSection}>
        {generateCart(items, removeItem, updateItem, false)}
      </Row>

      <Row className={styles.footerSection}>
        <Container>
          <OrderTotalCost
            totalPrice={totalPrice}
            subtotalPrice={subtotalPrice}
            shippingPrice={shippingPrice}
          />
          <Row>
            <Col xs="12" className={styles.fixedButton}>
              <Button
                variant="secondary"
                className={clsx(styles.btn, "w-100")}
                fixed="bottom"
                onClick={handleClick}
              >
                CONTINUE TO CHECKOUT
              </Button>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  )
}

export const generateCart = (items, removeItem, updateItem, viewOnly) => {
  return items?.map(({ id, variant, quantity, totalPrice }, index) => (
    <Item
      key={id ? `id-${id}` : `idx-${index}`}
      index={index}
      id={variant?.product?.id || ""}
      name={variant?.product?.name || ""}
      maxQuantity={variant.quantityAvailable || quantity}
      quantity={quantity}
      thumbnail={variant?.product?.thumbnail}
      totalPrice={<Money money={totalPrice?.gross} supStyle={true} />}
      unitPrice={
        <Money money={variant?.pricing?.price?.gross} supStyle={true} />
      }
      onRemove={() => removeItem(variant.id)}
      onQuantityChange={(quantity) => updateItem(variant.id, quantity)}
      sku={variant.sku}
      viewOnly={viewOnly}
      quantityAvailable={variant.quantityAvailable}
      attributes={variant.attributes?.map((attribute) => {
        return {
          attribute: {
            id: attribute.attribute.id,
            name: attribute.attribute.name || "",
          },
          values: attribute.values.map((value) => {
            return {
              id: value?.id,
              name: value?.name || "",
              value: value?.value,
            }
          }),
        }
      })}
    />
  ))
}
