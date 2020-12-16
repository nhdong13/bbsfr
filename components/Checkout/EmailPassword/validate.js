import * as Yup from "yup"

export const EmailPasswordSchema = (activeStep) => {
  return Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("This field is required"),
    password: Yup.string()
      .min(8, "Password must have at least 6 characters")
      .test("required", "This field is required", function (fieldValue) {
        if (activeStep === 1) {
          return true
        }
        return fieldValue && fieldValue.trim()
      }),
  })
}
