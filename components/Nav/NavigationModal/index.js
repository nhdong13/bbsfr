import { Modal } from "react-bootstrap"
import { useState } from "react"
import styles from "./nav.module.scss"
import Image from "next/image"
import { useRouter } from "next/router"
import LeftElementNavComponent from "../Components/LeftElementNav"
import RightElementNavComponent from "../Components/RightElementNav"

const NavModalComponent = ({ show, onHide }) => {
  const router = useRouter()

  if (router?.events) {
    router.events.on("routeChangeComplete", () => onHide())
  }

  const [element, setElement] = useState({
    name: "Road Gear",
    active: true,
    department_slug: "road-gear",
  })
  const [elementLeft, setElementLeft] = useState([
    { name: "New Motorcycles", active: false, department_slug: "new-bikes" },
    { name: "Used Motorcycles", active: false, department_slug: "used-bikes" },
    { name: "Road Gear", active: true, department_slug: "road-gear" },
    { name: "MX Gear", active: false, department_slug: "mx-gear" },
    {
      name: "Adventure Gear",
      active: false,
      department_slug: "adventure-gear",
    },
    {
      name: "Parts & Accessories",
      active: false,
      department_slug: "accessories",
    },
    { name: "Servicing", active: false, department_slug: "service" },
    { name: "Finance & Insurance", active: false, department_slug: "" },
  ])

  const handleActive = (i) => {
    setElement({ ...element, ...i })
    setElementLeft(
      elementLeft.map((item) => {
        if (item.name === i.name) {
          item.active = true
        } else {
          item.active = false
        }
        return item
      })
    )
  }

  return (
    <Modal
      dialogClassName={styles.dialogClassName}
      contentClassName={styles.contentClassName}
      animation={true}
      show={show}
      onHide={onHide}
      scrollable
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
      <Modal.Body bsPrefix={styles.modalBody}>
        <div className={styles.modalBodyLeft}>
          {elementLeft &&
            elementLeft.length > 0 &&
            elementLeft.map((i, index) => {
              return (
                <div key={index} onClick={() => handleActive(i)}>
                  <LeftElementNavComponent name={i.name} active={i.active} />
                </div>
              )
            })}
        </div>
        <div className={styles.modalBodyRight}>
          <RightElementNavComponent element={element} />
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default NavModalComponent
