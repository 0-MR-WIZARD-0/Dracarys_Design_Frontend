import styles from "@/Components/Aside/aside.module.scss"

const Aside = () => {
  return (
    <aside>
      <div className={styles.telegram}></div>
      <div className={styles.comment}></div>
    </aside>
  )
}

export default Aside