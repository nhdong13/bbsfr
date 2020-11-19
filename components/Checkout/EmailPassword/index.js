import { useState } from "react"
import { useDispatch } from "react-redux"
import { Container, Form } from "react-bootstrap"
import { Formik } from "formik"
import { useRouter } from "next/router"
// import { useAuth } from "@saleor/sdk"
import { useSignIn } from "@sdk/react"

import { setCurrentUser } from "../../../redux/reducers/auth"
import OrderSumaryComponent from "../OrderSumary"
import CheckOutEmail from "./Email"
import CheckoutPassword from "./Password"
import { EmailPasswordSchema } from "./validate"
import styles from "./CheckoutEmailPassword.module.scss"

export default function CheckoutEmailPasswordComponent() {
  const dispatch = useDispatch()
  const [activeStep, setActiveStep] = useState(1)
  const initialValues = {
    email: "admin@example.com",
    password: "admin",
  }
  const router = useRouter()

  // const { signIn } = useAuth()
  // Will remove when upgrade Saleor v11
  const [signIn] = useSignIn()

  const handleNextStep = () => {
    setActiveStep(activeStep + 1)
  }

  const handleSubmit = async (values) => {
    const { data, dataError } = await signIn({
      email: values.email,
      password: values.password,
    })

    dispatch(setCurrentUser(data?.user))

    if (dataError?.error) {
      console.log(dataError.error)
    } else {
      router.push("/checkout/delivery")
    }
  }

  const ActiveStep = activeStep === 1 ? CheckOutEmail : CheckoutPassword

  return (
    <Container fluid className={styles.checkoutEmailContainer}>
      <OrderSumaryComponent />

      <Formik
        validationSchema={EmailPasswordSchema}
        onSubmit={handleSubmit}
        initialValues={initialValues}
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
