import styles from "@/Components/Header/header.module.scss";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import background from "@/app/assets/background_main.png";
import Aside from "../Aside";

const Header = () => {
  return (
    <header className={styles.header}>
      <Image src={background} alt="background" className={styles.back}/>
      <Image src={background} alt="background" className={styles.back_rotate}/>
      <div className={styles.wrapper_header}>
      <div className={styles.circle}></div>
      <div className={styles.circle_large}></div>
        <div className={styles.logo}>
          <Image src={logo} alt="logo"/>
        </div>
        <nav>
          <ul>
            <li>История возникновения</li>
            <hr/>
            <li>Прокты DD</li>
            <hr/>
            <li>Доставка</li>
            <hr/>
            <li>FAQ</li>
            <hr/>
            <li>Контакты</li>
            <hr/>
          </ul>
        </nav>
        <div className={styles.content_header}>
          <div className={styles.title}>
            <h1>DRACARYS DESIGN</h1>
            <h2>FOR YOU</h2>
          </div>
        </div>
        <div className={styles.plug_text}>
          <hr/>
          <p>Место, где каждая идея превращается в нечто грандиозное!</p>
        </div>
        <Aside/>
      </div>
    </header>
  )
}

export default Header