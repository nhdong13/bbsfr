import { useState } from "react"
import { Container, Form, Row } from "react-bootstrap"
import { Formik } from "formik"
import { useRouter } from "next/router"
// import { useAuth } from "@saleor/sdk"
import { useSignIn } from "@sdk/react"
import { useLazyQuery, useMutation } from "@apollo/client"
import { useToasts } from "react-toast-notifications"

import OrderSumaryComponent from "../OrderSumary"
import CheckOutEmail from "./Email"
import CheckoutPassword from "./Password"
import LoadingSpinner from "../../LoadingSpinner"
import { EmailPasswordSchema } from "./validate"
import { checkEmailExistedQuery } from "lib/queries"
import { accountRegisterMutation } from "lib/mutations"
import styles from "./CheckoutEmailPassword.module.scss"

export default function CheckoutEmailPasswordComponent() {
  const [activeStep, setActiveStep] = useState(1)
  const initialValues = {
    email: "",
    password: "",
  }
  const router = useRouter()
  const [checkEmailExisted, { loading, data }] = useLazyQuery(
    checkEmailExistedQuery
  )
  const [registerAccount] = useMutation(accountRegisterMutation)
  const { addToast } = useToasts()
  // const { signIn } = useAuth()
  // Will remove when upgrade Saleor v11
  const [signIn] = useSignIn()

  const handleSubmit = async (values, bag) => {
    if (activeStep === 1) {
      checkEmailExisted({
        variables: { email: values.email },
      })
      setActiveStep(activeStep + 1)
      bag.setTouched({ password: false })
      bag.setSubmitting(false)
      return
    }

    if (!data?.existedEmailChecking) {
      const { data: registerAccountRes } = await registerAccount({
        variables: {
          email: values.email,
          password: values.password,
          redirectUrl: window.location.href,
        },
      })
      const { errors } = registerAccountRes?.accountRegister || {}
      if (errors && errors.length) {
        addToast("An error has been occurred. Please try again later", {
          appearance: "error",
          autoDismiss: true,
          className: "mt-4 mr-2 w-auto",
        })
        return
      }
    }

    const success = await signIn({
      email: values.email,
      password: values.password,
    })

    if (!success) {
      bag.setErrors({ password: "Password does not match" })
    } else {
      router.push("/checkout/delivery")
    }
  }

  const ActiveStep = activeStep === 1 ? CheckOutEmail : CheckoutPassword

  return (
    <Container fluid className={styles.checkoutEmailContainer}>
      <OrderSumaryComponent />

      <Formik
        validationSchema={EmailPasswordSchema(activeStep)}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {loading && (
              <Row>
                <LoadingSpinner show={loading} />
              </Row>
            )}
            {!loading && (
              <ActiveStep
                handleChange={handleChange}
                values={values}
                existedEmailChecking={data?.existedEmailChecking}
                errors={errors}
                touched={touched}
              />
            )}
          </Form>
        )}
      </Formik>
    </Container>
  )
}
