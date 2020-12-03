import { Modal, Spinner } from "react-bootstrap"
import styles from "./LoadingSpinner.module.scss"

export default function LoadingSpinner({ show }) {
  return (
    <Modal
      show={show}
      contentClassName={styles.modalContent}
      dialogClassName={styles.modal}
    >
      <Modal.Body className={styles.modalBody}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Modal.Body>
    </Modal>
  )
}
