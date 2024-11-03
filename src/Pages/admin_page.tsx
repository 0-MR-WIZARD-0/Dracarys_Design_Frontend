"use client"

import "@/app/globals.css"
import styles from "@/app/global_styles/admin_page/adminPage.module.scss";
import { useState } from "react";

const AdminPage = () => {
  
  const [selectedCategory, setSelectedCategory] = useState<'custom' | 'design' | 'web-dev' | 'feedback'>('custom')

  const handleCategory = (tab: 'custom' | 'design' | 'web-dev' | 'feedback') => {
    setSelectedCategory(tab)
  }

  return (
    <div className={styles.admin_page}>
      <h1>DRACARYS DESIGN</h1>
      <ul>
        <li onClick={()=>handleCategory('custom')} className={selectedCategory === 'custom' ? styles.active_tab : ''}>Кастомизация</li>
        <li onClick={()=>handleCategory('design')} className={selectedCategory === 'design' ? styles.active_tab : ''}>Дизайн</li>
        <li onClick={()=>handleCategory('web-dev')} className={selectedCategory === 'web-dev' ? styles.active_tab : ''}>Web-разработка</li>
        <li onClick={()=>handleCategory('feedback')} className={selectedCategory === 'feedback' ? styles.active_tab : ''}>Отзывы</li>
      </ul>
      {selectedCategory === "feedback" ? (
        <div className={styles.wrapper_feedbacks}>
          <div className={styles.feedback}>
            <h3>Борис Зуннунов</h3>
            <p>
              Обратился для кастомизации своего любимого комбинезона, и результат оказался потрясающим. На спине были выполнены надписи в египетском стиле, а на левой штанине — большая и детализированная Медуза Горгона. Эти элементы кастомизации идеально сочетаются друг с другом, придавая вещи уникальный и стильный вид, но не отвлекая от общей концепции.
              Каждая деталь кастомизации продумана до мелочей, а сама работа выполнена с высоким уровнем мастерства.
            </p>
            <p>02.11.2024</p>
            <div className={styles.buttons}>
              <button>Отклонить</button>
              <button>Одобрить</button>
            </div>
          </div>
        </div>
      ) : (
        <form>
          <label className={styles.label_title}>Название проекта</label>
          <input placeholder="Название проекта"></input>
          <label className={styles.label_title}>Описание</label>
          <textarea placeholder="Описание"></textarea>
          <label className={styles.label_title}>Превью</label>
          <label className={styles.input_file}>
            <span className={styles.input_file_text}></span>
            <input type="file" name="file"/>        
            <span className={styles.input_file_btn}>Выберите файл</span>
          </label>
          <label className={styles.label_title}>Фотографии</label>
          <label className={styles.input_file}>
            <span className={styles.input_file_text}></span>
            <input type="file" name="file"/>        
            <span className={styles.input_file_btn}>Выберите файл</span>
          </label>
        </form>
      )}
    </div>
  )
}

export default AdminPage