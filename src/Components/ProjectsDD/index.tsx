/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import styles from "@/Components/ProjectsDD/projects.module.scss"
import Slider from "../Slider"
import PreviewAndReview from "../PreviewAndReview"
import { useEffect, useState } from "react"
import Image from "next/image"
import dragon_red from "@/app/assets/dragon_red.svg"
import combez from "@/app/assets/combez.png"
import { fetchProjectById, fetchProjects } from "@/services/api"

interface Project {
  id: number;
  title: string;
  previewImage: string;
  review: string;
  reviewerName: string;
  reviewDate: string;
  images: string[];
}

const ProjectsDD = () => {

  const [selectedArea, setSelectedArea] = useState<'customization' | 'design' | 'web-development'>('customization')
  const [projects, setProjects] = useState<Project[]>([])  // Список проектов
  const [selectedProject, setSelectedProject] = useState<Project | null>(null) 

  const handleInfoArea = (tab: 'customization' | 'design' | 'web-development') => {
    setSelectedArea(tab)
  }

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects(selectedArea)
      setProjects(data)
    }

    loadProjects()
  }, [selectedArea])

  const handleProjectSelect = async (projectId: number) => {
    const project = await fetchProjectById(projectId)
    setSelectedProject(project)
  }

  return (
    <section id="projects" className={styles.section3}>
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
        <Slider
        projects={projects}
        onProjectSelect={handleProjectSelect}/>
        <PreviewAndReview project={selectedProject} />
        <div className={styles.pagination_projects}>
          <a onClick={() => handleInfoArea('customization')} className={selectedArea === 'customization' ? styles.active_tab : ''}>Кастомизация</a>
          <a onClick={() => handleInfoArea('design')} className={selectedArea === 'design' ? styles.active_tab : ''}>Дизайн</a>
          <a onClick={() => handleInfoArea('web-development')} className={selectedArea === 'web-development' ? styles.active_tab : ''}>Web-разработка</a>
        </div>
      </div>
    </section>
  )
}

export default ProjectsDD