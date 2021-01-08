import { useRouter } from "next/router"
import { Container } from "react-bootstrap"
import { capitalizeString } from "../../../services/collection"
import styles from "../Common.module.scss"

const BackToPageBeforeComponent = ({ page }) => {
  const router = useRouter()

  const handleBack = (e) => {
    e.preventDefault()
    if (router.query && router.query.category) {
      router.push(`/${router.query.id}/${router.query.collection}`)
    }
    if (router.query && router.query.brandCollection) {
      router.push(
        `/brands/${router.query.brandHome}/${router.query.brandCollection}`
      )
    } else {
      router.push(`/${router.query.id}`)
    }
  }
  return (
    <Container fluid className={styles.pre_page_button}>
      <div onClick={handleBack}>&#8249; {capitalizeString(page)}</div>
    </Container>
  )
}
export default BackToPageBeforeComponent
