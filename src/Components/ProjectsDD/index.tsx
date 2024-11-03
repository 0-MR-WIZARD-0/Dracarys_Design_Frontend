"use client"

import styles from "@/Components/ProjectsDD/projects.module.scss"
import Slider from "../Slider"
import PreviewAndReview from "../PreviewAndReview"
import { useState } from "react"
import Image from "next/image"
import dragon_red from "@/app/assets/dragon_red.svg"
import combez from "@/app/assets/combez.png"

const ProjectsDD = () => {

  const [selectedArea, setSelectedArea] = useState<'сustomization' | 'design' | 'web-dev'>('сustomization')

  const handleInfoArea = (tab: 'сustomization' | 'design' | 'web-dev') => {
    setSelectedArea(tab)
  }

  return (
    <section className={styles.section3}>
      <div>
        <Image className={styles.dragon_left} src={dragon_red} alt="dragon_red"/>
        <Image className={styles.dragon_right} src={dragon_red} alt="dragon_red"/>
      </div>
      <div className={styles.wrapper_projects}>
          <Image src={combez} className={styles.combez} alt="combez"/>
        <div className={styles.title}>
          <h2>Проекты DD</h2>
          <hr/>
        </div>
        <Slider/>
        <PreviewAndReview/>
        <div className={styles.pagination_projects}>
          <a onClick={()=>handleInfoArea('сustomization')} className={selectedArea === 'сustomization' ? styles.active_tab : ''}>Кастомизация</a>
          <a onClick={()=>handleInfoArea('design')} className={selectedArea === 'design' ? styles.active_tab : ''}>Дизайн</a>
          <a onClick={()=>handleInfoArea('web-dev')} className={selectedArea === 'web-dev' ? styles.active_tab : ''}>Web-разработка</a>
        </div>
      </div>
    </section>
  )
}

export default ProjectsDD