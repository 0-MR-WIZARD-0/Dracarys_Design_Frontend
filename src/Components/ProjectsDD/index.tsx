import styles from "@/Components/ProjectsDD/projects.module.scss"
import Slider from "../Slider"
import PreviewAndReview from "../PreviewAndReview"
import Image from "next/image"
import dragon_red from "@/app/assets/dragon_red.svg"

const ProjectsDD = () => {
  return (
    <section className={styles.section3}>
      <Image className={styles.dragon_left} src={dragon_red} alt="dragon_red"/>
      <Image className={styles.dragon_right} src={dragon_red} alt="dragon_red"/>
      <div className={styles.wrapper_projects}>
        <div className={styles.title}>
          <h2>Проекты DD</h2>
          <hr/>
        </div>
        <Slider/>
        <PreviewAndReview/>
        <div className={styles.pagination_projects}>
          <a>Кастомизация</a>
          <a>Дизайн</a>
          <a>Web-разработка</a>
        </div>
      </div>
    </section>
  )
}

export default ProjectsDD