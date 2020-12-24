import React, { useEffect } from "react"
// import { useCart } from "@saleor/sdk"
import { useCart, useProductDetails } from "@sdk/react"

import MyCartComponent from "./MyCart"
import { generateCart, buildCartItem } from "./helpers"

export default function CheckoutComponent() {
  const {
    items,
    removeItem,
    updateItem,
    totalPrice,
    subtotalPrice,
    shippingPrice,
  } = useCart()

  // For dump data, remove on future
  const { data: product1, loading: product1Loading } = useProductDetails({
    id: "UHJvZHVjdDoxMTg=",
  })
  const { data: product2, loading } = useProductDetails({
    id: "UHJvZHVjdDo4OA==",
  })

  useEffect(() => {
    if (product1Loading || loading) {
      return
    }
    const data = {
      lines: [product1, product2].map((data) => buildCartItem(data)),
    }

    window.localStorage.setItem("data_checkout", JSON.stringify(data))
  }, [product1Loading, loading])

  return (
    <MyCartComponent
      carts={items && generateCart(items, removeItem, updateItem)}
      subtotalPrice={subtotalPrice}
      totalPrice={totalPrice}
      itemsCount={items?.length}
      shippingPrice={shippingPrice}
    />
  )
}
