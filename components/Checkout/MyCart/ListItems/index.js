import { Row } from "react-bootstrap"

import ItemComponent from "../../Item"

import styles from "../MyCart.module.scss"

export default function MyCartComponent({ items }) {
  return (
    <Row className={styles.listItemSection}>
      <ItemComponent />
      <ItemComponent />
    </Row>
  )
}
