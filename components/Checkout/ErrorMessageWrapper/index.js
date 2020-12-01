import { get } from "lodash"
import clsx from "clsx"
import styles from "./ErrorMessage.module.scss"

export default function ErrorMessageWrapper({
  touched = {},
  errors = {},
  fieldName,
  className,
}) {
  return (
    <p className={clsx("pl-1", className, styles.errorMessage)}>
      {get(touched, fieldName) && get(errors, fieldName)
        ? get(errors, fieldName)
        : " "}
    </p>
  )
}
