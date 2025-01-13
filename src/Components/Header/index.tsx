import styles from "@/Components/Header/header.module.scss";
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import background from "@/app/assets/background_main.png";
import Aside from "../Aside";
import Link from "next/link";
import down_head from "../../app/assets/down_head.png";
import main_head from "../../app/assets/main_head.png"
import right_head from "../../app/assets/right_head.png"

const Header = () => {
  return (
    <header className={styles.header}>
      <Image src={background} alt="background" className={styles.back}/>
      <Image src={background} alt="background" className={styles.back_rotate}/>
      <div className={styles.animation_wrapper}>
        <div className={`${styles.particle} ${styles.particle_1}`}></div>
        <div className={`${styles.particle} ${styles.particle_2}`}></div>
        <div className={`${styles.particle} ${styles.particle_3}`}></div>
        <div className={`${styles.particle} ${styles.particle_4}`}></div>
      </div>
      <div className={styles.wrapper_header}>
        <div className={styles.circle_large}></div>
        <div className={styles.circle}>
          <div className={styles.circle_background}></div>
          <div className={styles.head_down}><Image src={down_head} alt=""/></div>
          <div className={styles.head_main}><Image src={main_head} alt=""/></div>
          <div className={styles.head_right}><Image src={right_head} alt=""/></div>
        </div>
        <div className={styles.logo}>
          <Image src={logo} alt="logo"/>
        </div>
        <nav>
          <ul>
            <li><Link href="#about">История возникновения</Link></li>
            <li><Link href="#projects">Прокты DD</Link></li>
            <li><Link href="#delivery">Доставка</Link></li>
            <li><Link href="#faq">FAQ</Link></li>
            <li><Link href="#footer">Контакты</Link></li>
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