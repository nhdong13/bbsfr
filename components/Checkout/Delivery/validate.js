import * as Yup from "yup"
import _ from "lodash"

export const ShippingSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("This field is required"),
  lastName: Yup.string().trim().required("This field is required"),
  phone: Yup.string().trim().required("This field is required"),
  country: Yup.object().shape({
    country: Yup.string().required("This field is required"),
    code: Yup.string(),
  }),
  city: Yup.string()
    .trim()
    .required("This field is required")
    .min(2, "Invalid name")
    .max(54, "Invalid name"),
  countryArea: Yup.string().trim().required("This field is required"),
  streetAddress1: Yup.string().trim().required("This field is required"),
  streetAddress2: Yup.string(),
  postalCode: Yup.string()
    .trim()
    .required("This field is required")
    .max(20, "Invalid code"),
  address: Yup.string().when("useFullForm", (useFullForm, schema) =>
    useFullForm ? schema : schema.trim().required("This field is required")
  ),
  bussinessName: Yup.string(),
  useFullForm: Yup.boolean(),
})

export const DeliverySchema = Yup.object().shape({
  shippingMethod: Yup.string().required("Please select a shipping method"),
  billingDifferentAddress: Yup.boolean(),
  billingAddress: Yup.object().shape({
    firstName: Yup.string().test(
      "require",
      "This field is required",
      function (fieldValue) {
        if (!this.from[1].value.billingDifferentAddress) {
          return true
        }
        return fieldValue && fieldValue.trim()
      }
    ),
    lastName: Yup.string().test(
      "require",
      "This field is required",
      function (fieldValue) {
        if (!this.from[1].value.billingDifferentAddress) {
          return true
        }
        return fieldValue && fieldValue.trim()
      }
    ),
    phone: Yup.string().test(
      "require",
      "This field is required",
      function (fieldValue) {
        if (!this.from[1].value.billingDifferentAddress) {
          return true
        }
        return fieldValue && fieldValue.trim()
      }
    ),
    country: Yup.object().shape({
      country: Yup.string().test(
        "require",
        "This field is required",
        function (fieldValue) {
          if (!this.from[1].value.billingDifferentAddress) {
            return true
          }
          return fieldValue && fieldValue.trim()
        }
      ),
    }),
    city: Yup.string()
      .test("require", "This field is required", function (fieldValue) {
        if (!this.from[1].value.billingDifferentAddress) {
          return true
        }
        return fieldValue && fieldValue.trim()
      })
      .min(2, "Invalid name")
      .max(54, "Invalid name"),
    countryArea: Yup.string().test(
      "require",
      "This field is required",
      function (fieldValue) {
        if (!this.from[1].value.billingDifferentAddress) {
          return true
        }
        return fieldValue && fieldValue.trim()
      }
    ),
    streetAddress1: Yup.string().test(
      "require",
      "This field is required",
      function (fieldValue) {
        if (!this.from[1].value.billingDifferentAddress) {
          return true
        }
        return fieldValue && fieldValue.trim()
      }
    ),
    streetAddress2: Yup.string(),
    postalCode: Yup.string()
      .test("require", "This field is required", function (fieldValue) {
        if (!this.from[1].value.billingDifferentAddress) {
          return true
        }
        return fieldValue && fieldValue.trim()
      })
      .max(20, "Invalid code"),
    address: Yup.string(),
    bussinessName: Yup.string(),
  }),
  paymentMethod: Yup.object()
    .required("Please select a payment method to proceed")
    .nullable(),
  promotion: Yup.object(),
  creditCard: Yup.object(),
  giftCard: Yup.string(),
})
