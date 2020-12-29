import { Navbar } from "react-bootstrap"
import Image from "next/image"
import Link from "next/link"
import styles from "./Header.module.scss"
import { useState } from "react"
import dynamic from "next/dynamic"

const NavModalDynamic = dynamic(() => import("../Nav/NavigationModal"))

export default function Header() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Navbar
        className={styles.containerNavBar}
        bg="dark"
        expand="lg"
        variant="dark"
      >
        <Link href="/">
          <a>
            <div className={styles.logoApp}>
              <Image
                alt="logo-bbsfr-bikebiz"
                layout="fill"
                src="/icons/logo-light-mobile.svg"
              />
            </div>
          </a>
        </Link>
        <div className={styles.containerIcon}>
          <Link href="/checkout">
            <a>
              <div className={styles.iconCheckout}>
                <Image layout="fill" src="/cart.svg" alt="cart" />
              </div>
            </a>
          </Link>
          <div className={styles.iconHamburger} onClick={handleShow}>
            <Image
              alt="icon-hamburger"
              layout="fill"
              src="/icons/icon-hamburger.svg"
            />
          </div>
        </div>
      </Navbar>
      <NavModalDynamic show={show} onHide={handleClose} />
    </>
  )
}
