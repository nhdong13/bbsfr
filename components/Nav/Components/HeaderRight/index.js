import styles from "../../NavigationModal/nav.module.scss"
const HeaderRightComponent = ({ title }) => {
  return (
    <>
      <div className={styles.headerRight}>
        <p className={styles.headerRightText}>{title}</p>
      </div>
    </>
  )
}
export default HeaderRightComponent
