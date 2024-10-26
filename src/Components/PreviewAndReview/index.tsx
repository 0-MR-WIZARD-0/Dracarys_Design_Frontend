import React from 'react'
import styles from "@/Components/PreviewAndReview/PreviewAndReview.module.scss"
import Image from 'next/image'

const PreviewAndReview = () => {
  return (
    <div className={styles.wrapper_PreviewAndReview}>
        <div className={styles.wrapper_Review}>
            <div className={styles.rectangle}></div>
            <div className={styles.Review}>
                <p>
                Обратился для кастомизации своего любимого комбинезона, и результат оказался потрясающим. На спине были выполнены надписи в египетском стиле, а на левой штанине — большая и детализированная Медуза Горгона. Эти элементы кастомизации идеально сочетаются друг с другом, придавая вещи уникальный и стильный вид, но не отвлекая от общей концепции.
                Каждая деталь кастомизации продумана до мелочей, а сама работа выполнена с высоким уровнем мастерства. Читать далее...
                </p>
                <h3>Boris Zunnunov</h3>
                <p>9/7/2024</p>
            </div>
        </div>
        <div className={styles.preview_1_2}>
            <div className={styles.preview_1}>
                <Image src="" alt='photo'/>
            </div>
            <div className={styles.preview_2}>
                <Image src="" alt='photo'/>
            </div>

        </div>
        <div className={styles.preview_3}>
            <Image src="" alt='photo'/>
        </div>
    </div>
  )
}

export default PreviewAndReview