import styles from "@/Components/About/about.module.scss";
import Image from "next/image";
import Link from "next/link";
import web_dev from "@/app/assets/web-dev.jpg";
import gr_dev from "@/app/assets/gr-dev.jpg";

const About = () => {
  return (
    <section>
      <div className={styles.wrapper_about}>
        <h2>История возникновения</h2>
        <div className={styles.about_company}>
            <p>
              Студия Dracarys Design. Место, где каждая идея превращается в нечто грандиозное. 
              Мы вдохновились силой и эстетикой драконов, чтобы создавать уникальные и эффектные 
              работы, которые не только будут привлекать внимание, но и запомнятся вам надолго! 
              Каждая работа — это симбиоз креатива, смелости и технологии, воплощенный в дизайне, 
              который выделяет нас среди других. В &quot;Dracarys Design&quot; мы не просто творим, 
              мы зажигаем наш бренд огнем креативности!
            </p>
        </div>
        <div className={styles.switches}>
          <div>
            <div className={styles.switch_img}>
              <Image src={web_dev} alt="boris"/>
            </div>
            <Link href={"https://t.me/boris_zunnunov"}>@boris_zunnunov</Link>
          </div>
          <div>
            <div className={styles.switch_img}>
              <Image src={gr_dev} alt="lilia"/>
            </div>
            <Link href={"https://t.me/liliasnef310103"}>@liliasnef310103</Link>
          </div>
        </div>
        <div className={styles.about_info}>
          <div className={styles.info}>
            <div className={styles.label}></div>
            <div>
              <h3>Лилия Нефёдова</h3>
              <p>Комплексная упаковка бренда (фирменный стиль, логотип, нейминг, 
                носители айдентики и их реализация). Создание визуальных решений 
                для брендов и их маштабирование. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About