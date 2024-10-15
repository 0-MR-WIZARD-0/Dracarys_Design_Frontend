import styles from "@/Components/Header/header.module.scss";
// import Image from "next/image";
// import logo from "@/app/assets/logo.svg"
import Aside from "../Aside";

const Header = () => {
  return (
    <header>
      <div className={styles.wrapper}>
        {/* <Image src={logo} alt="logo"/> */}
        <nav>
          <ul>
            <li>История возникновения</li>
            <li>Прокты DD</li>
            <li>Доставка</li>
            <li>FAQ</li>
            <li>Контакты</li>
          </ul>
        </nav>
        <div className={styles.content_header}>
          <div className={styles.title}>
            <h1>Dracarys Design</h1>
            <h2>FOR YOU</h2>
          </div>
          <div className={styles.plug_text}>
            <hr/>
            <p>Место, где каждая идея превращается в нечто грандиозное!</p>
          </div>
        </div>
        <Aside/>
      </div>
    </header>
  )
}

export default Header