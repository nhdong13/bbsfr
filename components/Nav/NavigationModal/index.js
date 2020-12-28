import { Button, Container, Modal } from "react-bootstrap"
import styles from "./nav.module.scss"
import Image from "next/image"
const NavModalComponent = ({ show, onHide }) => {
  return (
    <Modal
      dialogClassName={styles.dialogClassName}
      contentClassName={styles.contentClassName}
      animation
      show={show}
      onHide={onHide}
    >
      <Modal.Header bsPrefix={styles.modalHeader}>
        <Modal.Title>
          <div className={styles.elementDisplay}>
            <div className={styles.logo}>
              <Image
                loading="lazy"
                alt="logo-bbsfr-bikebiz"
                layout="fill"
                src="/icons/logo-dark-mobile.svg"
              />
            </div>
            <div className={styles.iconArticle} onClick={onHide}>
              <Image
                loading="lazy"
                alt="logo-bbsfr-bikebiz"
                layout="fill"
                src="/icons/icon-article.svg"
              />
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    </Modal>
  )
}
export default NavModalComponent
