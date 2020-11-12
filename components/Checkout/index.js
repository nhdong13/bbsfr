import React, { useState, useEffect } from "react"
import { useCart } from "@saleor/sdk"

import MyCartComponent from "./MyCart"
import EmailPasswordComponent from "./EmailPassword"
import DeliveryComponent from "./Delivery"
import Item from "./Item"
import Money from "../Money"

export default function CheckoutComponent() {
  const [activeStep, setActiveStep] = useState(1)
  const [userForm, setUserForm] = useState({
    email: "admin@example.com",
    password: "admin",
  })
  const {
    items,
    removeItem,
    updateItem,
    totalPrice,
    subtotalPrice,
    shippingPrice,
  } = useCart()

  const ActivePage = [
    MyCartComponent,
    EmailPasswordComponent,
    DeliveryComponent,
  ][activeStep - 1]

  useEffect(() => {
    const data = {
      lines: [
        {
          quantity: 1,
          totalPrice: {
            gross: { amount: 21, currency: "USD", __typename: "Money" },
            net: { amount: 21, currency: "USD", __typename: "Money" },
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
              onSale: true,
              priceUndiscounted: {
                gross: { amount: 30, currency: "USD", __typename: "Money" },
                net: { amount: 30, currency: "USD", __typename: "Money" },
                __typename: "TaxedMoney",
              },
              price: {
                gross: { amount: 21, currency: "USD", __typename: "Money" },
                net: { amount: 21, currency: "USD", __typename: "Money" },
                __typename: "TaxedMoney",
              },
              __typename: "VariantPricingInfo",
            },
            product: {
              id: "UHJvZHVjdDoxMTg=",
              name: "White Hoodie",
              thumbnail: {
                url:
                  "https://demo.saleor.io/media/__sized__/products/saleordemoproduct_cl_bogo04_1-thumbnail-255x255.png",
                alt: "",
                __typename: "Image",
              },
              thumbnail2x: {
                url:
                  "https://demo.saleor.io/media/__sized__/products/saleordemoproduct_cl_bogo04_1-thumbnail-510x510.png",
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
          quantity: 1,
          totalPrice: {
            gross: { amount: 44.1, currency: "USD", __typename: "Money" },
            net: { amount: 44.1, currency: "USD", __typename: "Money" },
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
              onSale: true,
              priceUndiscounted: {
                gross: { amount: 49, currency: "USD", __typename: "Money" },
                net: { amount: 49, currency: "USD", __typename: "Money" },
                __typename: "TaxedMoney",
              },
              price: {
                gross: { amount: 44.1, currency: "USD", __typename: "Money" },
                net: { amount: 44.1, currency: "USD", __typename: "Money" },
                __typename: "TaxedMoney",
              },
              __typename: "VariantPricingInfo",
            },
            product: {
              id: "UHJvZHVjdDo4OA==",
              name: "White Plimsolls",
              thumbnail: {
                url:
                  "https://demo.saleor.io/media/__sized__/products/saleordemoproduct_sneakers_02_1-thumbnail-255x255.png",
                alt: "",
                __typename: "Image",
              },
              thumbnail2x: {
                url:
                  "https://demo.saleor.io/media/__sized__/products/saleordemoproduct_sneakers_02_1-thumbnail-510x510.png",
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

  function nextStep(number) {
    if (!number) {
      setActiveStep(activeStep + 1)
    } else {
      setActiveStep(number)
    }
  }

  return (
    <ActivePage
      nextStep={nextStep}
      carts={items && generateCart(items, removeItem, updateItem, activeStep)}
      subtotalPrice={subtotalPrice}
      totalPrice={totalPrice}
      itemsCount={items?.length}
      shippingPrice={shippingPrice}
      userForm={userForm}
      setUserForm={setUserForm}
    />
  )
}

const generateCart = (items, removeItem, updateItem, activeStep) => {
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
      viewOnly={activeStep !== 1}
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
