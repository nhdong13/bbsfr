import { useState } from "react"
import { Modal, Form } from "react-bootstrap"
import { mappingDataAddress } from "../index"
export default function SelectAddressModal({
  show,
  onHide,
  defaultShippingAddress,
  addresses,
  onSelectAddress,
}) {
  const [selectedAddressId, setSelectedAddressId] = useState(
    defaultShippingAddress?.id
  )
  const getAddressText = (address) => {
    const { firstName, lastName, phone, country } = address
    const mappingAddress = mappingDataAddress(address)
    return `${firstName} ${lastName}${phone ? `, ${phone}` : ""}, ${
      mappingAddress.address
    }, ${country.country}`
  }

  const onCheck = (event) => {
    const value = event.currentTarget.value
    onSelectAddress(value)
    setSelectedAddressId(value)
    onHide()
  }

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Body className="py-4">
        {addresses &&
          addresses.map((address) => (
            <Form.Check
              type="radio"
              label={getAddressText(address)}
              name="accountAddress"
              checked={selectedAddressId === address.id}
              value={address.id}
              key={address.id}
              onChange={onCheck}
              id={address.id}
              className="pb-2"
            />
          ))}
      </Modal.Body>
    </Modal>
  )
}
