import { Modal, Button } from "react-bootstrap"

export default function ConfirmDeleteModal({
  show,
  onHide,
  handleConfirm,
  title,
}) {
  const onClick = () => {
    handleConfirm()
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
      <Modal.Body className="py-4">{title}</Modal.Body>
      <Modal.Footer className="pb-4 border-top-0">
        <Button
          variant="primary"
          className="w-100"
          type="button"
          onClick={onClick}
        >
          Yes
        </Button>
        <Button
          variant="secondary"
          className="w-100"
          type="button"
          onClick={onHide}
        >
          No
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
