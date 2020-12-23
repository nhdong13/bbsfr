import { Row, Col } from "react-bootstrap"
import Money from "../../Money"

export default function OrderTotalCost({
  totalPrice,
  subtotalPrice,
  shippingPrice,
  promotion,
  discount,
}) {
  console.log("discount", discount)
  return (
    <Row className="mt-4">
      <Col xs="6">
        <p>Sub Total</p>
        {promotion?.valid && <p>Discount amount</p>}
        <p>Delivery</p>
        <p className="font-weight-bold">TOTAL</p>
      </Col>

      <Col xs="6" className="text-right">
        <p>
          <Money money={subtotalPrice?.gross} />
        </p>
        {promotion?.valid && (
          <p>
            <Money money={promotion?.discountAmount} />
          </p>
        )}
        <p>
          <Money
            money={shippingPrice?.amount ? shippingPrice : null}
            defaultValue="FREE"
          />
        </p>
        <p className="font-weight-bold">
          <Money
            money={
              promotion?.valid ? promotion?.discountedPrice : totalPrice?.gross
            }
          />
        </p>
      </Col>
    </Row>
  )
}
