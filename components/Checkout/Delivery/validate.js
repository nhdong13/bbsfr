import * as Yup from "yup"

export const AddressSchema = Yup.object().shape({
  shippingAddress: Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string(),
    streetAddress1: Yup.string().required("Required"),
    streetAddress2: Yup.string(),
    postalCode: Yup.string().required("Required"),
    address: Yup.string(),
    bussinessName: Yup.string(),
  }),
  billingAddress: Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string(),
    streetAddress1: Yup.string().required("Required"),
    streetAddress2: Yup.string(),
    postalCode: Yup.string().required("Required"),
    address: Yup.string(),
    bussinessName: Yup.string(),
  }),
})
