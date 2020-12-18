import { Row, Col } from "react-bootstrap"
import Money from "../../Money"

export default function OrderTotalCost({
  totalPrice,
  subtotalPrice,
  shippingPrice,
}) {
  return (
    <Row>
      <Col xs="6">
        <p>Sub Total</p>
        <p>Delivery</p>
        <p className="font-weight-bold">TOTAL</p>
      </Col>

      <Col xs="6" className="text-right">
        <p>
          <Money money={subtotalPrice?.gross} />
        </p>
        <p>
          <Money
            money={shippingPrice?.amount ? shippingPrice : null}
            defaultValue="FREE"
          />
        </p>
        <p className="font-weight-bold">
          <Money money={totalPrice?.gross} />
        </p>
      </Col>
    </Row>
  )
}
