import { useRouter } from "next/router"
import { Container } from "react-bootstrap"
import { capitalizeString } from "../../../services/collection"
import styles from "../Common.module.scss"

const BackToPageBeforeComponent = ({ page, type }) => {
  const router = useRouter()
  const handleBack = (e) => {
    e.preventDefault()
    switch (type) {
      case "category":
        if (router?.query?.category) {
          router.push(`/${router.query.id}/${router.query.collection}`)
        }
        break

      case "collection":
        if (router?.query?.id) {
          router.push(`/${router.query.id}`)
        }
        break

      case "brandCollection":
        if (router?.query?.brandHome) {
          router.push(`/brands/${router.query.brandHome}`)
        }
        break

      case "brandRange":
        if (router?.query?.brandCollection) {
          router.push(
            `/brands/${router.query.brandHome}/${router.query.brandCollection}`
          )
        }
        break

      default:
        router.push("/")
        break
    }
  }

  return (
    <Container fluid className={styles.pre_page_button}>
      <div onClick={handleBack}>&#8249; {capitalizeString(page)}</div>
    </Container>
  )
}
export default BackToPageBeforeComponent
