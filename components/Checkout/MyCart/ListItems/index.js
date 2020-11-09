import { Row } from "react-bootstrap"

import styles from "../MyCart.module.scss"

export default function MyCartComponent({ carts }) {
  return <Row className={styles.listItemSection}>{carts}</Row>
}
