import "@/app/globals.css"
import styles from "@/app/global_styles/admin_page/adminPage.module.scss";

const AdminPage = () => {
  return (
    <div className={styles.admin_page}>
      <h1>DRACARYS DESIGN</h1>
      <ul>
        <li>Проекты</li>
        <li>Отзывы</li>
      </ul>
      <form>
        <label>Категория</label>
        <input placeholder="Описание" type="d"></input>
        <label>Название проекта</label>
        <input placeholder="Название проекта"></input>
        <label>Описание</label>
        <textarea placeholder="Описание"></textarea>
        <label>Превью</label>
        <input placeholder="Превью" type="file"></input>
        <label>Фотографии</label>
        <input placeholder="Фотографии" type="file"></input>
      </form>
    </div>
  )
}

export default AdminPage