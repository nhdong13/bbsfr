import React from "react"

const Money = ({ money, defaultValue, supStyle, ...props }) => {
  if (!money) {
    return <span {...props}>{defaultValue}</span>
  }
  let amount = money.amount
  let decimal
  let options = {}
  if (supStyle) {
    decimal = (amount % 1).toFixed(2) * 100 || "00"
    amount = parseInt(money.amount)
    options = { maximumFractionDigits: 0, minimumFractionDigits: 0 }
  }
  return (
    <span {...props}>
      {money.currency && money.currency !== ""
        ? amount.toLocaleString(undefined, {
            currency: money.currency,
            style: "currency",
            ...options,
          })
        : amount.toString()}
      {decimal && <sup>{decimal}</sup>}
    </span>
  )
}

export default Money
