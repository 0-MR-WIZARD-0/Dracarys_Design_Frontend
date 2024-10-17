import styles from "@/Components/Aside/aside.module.scss"
import Image from "next/image"
import tg from "@/app/assets/tg.svg"

const Aside = () => {
  return (
    <aside>
      <a className={styles.telegram} href="https://t.me/dracarys_design">
        <Image src={tg} alt="TG"/>
      </a>
      <div className={styles.comment}>
        <Image src="" alt="comment"/>
      </div>
    </aside>
  )
}

export default Aside