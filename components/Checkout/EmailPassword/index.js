import React, { useState } from "react"
import { Container, Row, Button, Collapse, Form } from "react-bootstrap"
import clsx from "clsx"
import { Formik } from "formik"
import { useAuth } from "@saleor/sdk"

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
  const [open, setOpen] = useState(false)
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
    console.log(values)
    const { data, dataError } = await signIn(values.email, values.password)

    if (dataError?.error) {
      console.log(dataError.error)
    } else if (data) {
      setUserForm(values)
      alert("Login Success")
    }
  }

  const ActiveStep = activeStep === 1 ? CheckOutEmail : CheckoutPassword

  return (
    <Container fluid className={styles.checkoutEmailContainer}>
      <Row className={styles.orderSumary}>
        <Container>
          <Button
            variant="gray"
            onClick={() => setOpen(!open)}
            aria-controls="order-list"
            aria-expanded={open}
            className={clsx(styles.toggleButton, "dropdown-toggle")}
          >
            Order Summary
          </Button>
          <Collapse in={open}>
            <div id="order-list" className={styles.orderList}>
              {carts}
            </div>
          </Collapse>
        </Container>
      </Row>

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
