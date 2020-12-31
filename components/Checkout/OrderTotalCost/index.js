import { Row, Col } from "react-bootstrap"
import Money from "../../Money"

export default function OrderTotalCost({
  totalPrice,
  subtotalPrice,
  shippingPrice,
  promotion,
  discount,
}) {
  const discountAmount =
    discount?.amount > 0 ? discount : promotion?.discountAmount
  return (
    <Row className="mt-4">
      <Col xs="6">
        <p>Sub Total</p>
        {discountAmount?.amount > 0 && <p>Discount amount</p>}
        <p>Delivery</p>
        <p className="font-weight-bold">TOTAL</p>
      </Col>

      <Col xs="6" className="text-right">
        <p>
          <Money money={subtotalPrice?.gross} />
        </p>
        {discountAmount?.amount > 0 && (
          <p>
            <Money money={discountAmount} />
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
              promotion?.discountedPrice?.amount > 0 && !discount?.amount
                ? promotion?.discountedPrice
                : totalPrice?.gross
            }
          />
        </p>
      </Col>
    </Row>
  )
}
