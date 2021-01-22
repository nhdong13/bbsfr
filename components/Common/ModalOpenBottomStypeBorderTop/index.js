import { Children } from "react";
import { Modal } from "react-bootstrap";
import styles from "../Common.module.scss";

const ModalBottomBorderTopComponent = ({ children, show, onHide }) => {
  return (
    <>
      <Modal
        size="lg"
        dialogClassName={styles.modalDialogClassNameBuyNow}
        contentClassName="animate-bottom"
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <div fluid className={styles.containerModal}>
          <div className={styles.containerContentModal}>{children}</div>
        </div>
      </Modal>
    </>
  );
};
export default ModalBottomBorderTopComponent;
