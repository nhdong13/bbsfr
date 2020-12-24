import { useRouter } from "next/router"
import { Container } from "react-bootstrap"
import { capitalizeString } from "../../../services/collection"
import styles from "../Common.module.scss"

const BackToPageBeforeComponent = ({ page }) => {
  const router = useRouter()
  return (
    <Container fluid className={styles.pre_page_button}>
      <div onClick={() => router.back()}>&#8249; {capitalizeString(page)}</div>
    </Container>
  )
}
export default BackToPageBeforeComponent
