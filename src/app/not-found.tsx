import LogoRed from "@/app/assets/logo_red.svg"
import styles from "@/app/global_styles/error_page/errorPage.module.scss"
import Image from "next/image"

const ErrorPage = () => {
  return (
  <div className={styles.error_page}>
    <div>
      <Image src={LogoRed} alt="Logo"/>
      <div className={styles.loader}></div>
    </div>
      <h1>PAGE IS NOT FOUND.. ERROR</h1>
  </div>
  )
}

export default ErrorPage