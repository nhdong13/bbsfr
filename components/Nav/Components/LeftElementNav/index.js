import styles from "../../NavigationModal/nav.module.scss"
const LeftElementNavComponent = ({ name, active }) => {
  return (
    <>
      <div className={styles.elementLeft}>
        <div className={styles.containerLeft}>
          <p className={active ? styles.elementLeftText : ""}>{name}</p>
        </div>
        {active && <div className={styles.elementLeftActive}></div>}
      </div>
    </>
  )
}
export default LeftElementNavComponent
