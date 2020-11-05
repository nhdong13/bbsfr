import React, { useState } from "react"
import MyCartComponent from "./MyCart"
import CheckoutEmailComponent from "./Email"
import CheckoutPasswordComponent from "./Password"

export default function CheckoutComponent({ items }) {
  const [activeStep, setActiveStep] = useState(1)
  const ActivePage = [
    MyCartComponent,
    CheckoutEmailComponent,
    CheckoutPasswordComponent,
  ][activeStep - 1]

  function nextStep(number) {
    if (!number) {
      setActiveStep(activeStep + 1)
    } else {
      setActiveStep(number)
    }
  }

  return <ActivePage nextStep={nextStep} />
}
