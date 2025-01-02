import React from 'react'
import styles from "@/Components/PreviewAndReview/PreviewAndReview.module.scss"
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PreviewAndReview = ({ project }: { project: any }) => {
  if (!project) return <p>Выберите проект для просмотра.</p>;

  return (
    <div className={styles.wrapper_PreviewAndReview}>
      <div>
        {project.description}
      </div>

      {project.review && (
        <div className={styles.wrapper_Review}>
          <div className={styles.rectangle}></div>
          <div className={styles.Review}>
            <p>{project.review}</p>
            <h3>{project.reviewerName}</h3>
            <p>{project.reviewDate}</p>
          </div>
        </div>
      )}

      <div className={styles.preview_1_2}>
        {project.images.slice(0, 2).map((img: string, index: number) => (
          <div key={index} className={styles[`preview_${index + 1}` as keyof typeof styles]}>
            <Image src={img} alt='photo' 
            width={500}  
            height={300} />
          </div>
        ))}
      </div>
      <div className={styles.preview_3}>
        <Image width={500}
            height={300} 
            src={project.images[2]} alt='photo' />
      </div>
    </div>
  )
}

export default PreviewAndReview
