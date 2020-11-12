import React, { useState } from "react"
import { Container, Form } from "react-bootstrap"
import { Formik } from "formik"
import { useAuth } from "@saleor/sdk"

import OrderSumaryComponent from "../OrderSumary"
import CheckOutEmail from "./Email"
import CheckoutPassword from "./Password"
import { EmailPasswordSchema } from "./validate"
import styles from "./CheckoutEmailPassword.module.scss"

export default function CheckoutEmailPasswordComponent({
  carts,
  nextStep,
  userForm,
  setUserForm,
}) {
  const [activeStep, setActiveStep] = useState(1)
  const { signIn } = useAuth()

  const handleNextStep = () => {
    if (activeStep === 1) {
      setActiveStep(2)
    } else {
      nextStep()
    }
  }

  const handleSubmit = async (values) => {
    const { dataError } = await signIn(values.email, values.password)
    if (dataError?.error) {
      console.log(dataError.error)
    } else {
      setUserForm(values)
      handleNextStep()
    }
  }

  const ActiveStep = activeStep === 1 ? CheckOutEmail : CheckoutPassword

  return (
    <Container fluid className={styles.checkoutEmailContainer}>
      <OrderSumaryComponent carts={carts} />

      <Formik
        validationSchema={EmailPasswordSchema}
        onSubmit={handleSubmit}
        initialValues={userForm}
      >
        {({ handleSubmit, handleChange, values }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <ActiveStep
              handleNextStep={handleNextStep}
              handleChange={handleChange}
              values={values}
            />
          </Form>
        )}
      </Formik>
    </Container>
  )
}
