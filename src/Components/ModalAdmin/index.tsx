/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../ModalReview/modal.module.scss";

interface EditModalProps {
  type: "project" | "faq" | "feedback";
  data: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: any) => void;
}

const ModalAdmin = ({ type, data, isOpen, onClose, onSave }: EditModalProps) => {
  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    content: "",
    isApproved: true,
    ...data,
  });

  useEffect(() => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      ...data,
    }));
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Пожалуйста, авторизуйтесь");
        return;
      }

      const updatedData = {
        ...formData,
        isApproved: true,
      };

      const response = await axios.patch(
        `http://localhost:3001/reviews/${data.id}`, // используем ID из data
        updatedData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Отзыв обновлен успешно");
        onSave(response.data);
        onClose(); 
      } else {
        console.error("Ошибка при обновлении отзыва");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
        <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={onClose}>
                X
            </button>
            <h2>{type === "project" ? "Редактировать проект" : type === "faq" ? "Редактировать FAQ" : "Одобрить отзыв"}</h2>
            {type === "project" && (
            <form>
            <div className={styles.label_block}>
                <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                />
            </div>
            <div className={styles.label_block}>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            </div>
            <div className={styles.label_block}>
                <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                />
            </div>
            <button onClick={handleSave}>Сохранить</button>
          </form>
        )}
        {type === "faq" && (
          <form>
            <div className={styles.label_block}>
                <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleChange}
                />
            </div>
            <div className={styles.label_block}>
                <textarea
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                />
            </div>
            <button onClick={handleSave}>Сохранить</button>
          </form>
        )}
        {type === "feedback" && (
          <form>
            <div className={styles.label_block}>
                <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                />
            </div>
            <div className={styles.label_block}>
                <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                />
            </div>
            <div className={styles.label_block}>
                <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                />
            </div>
            <button onClick={handleSave}>Сохранить</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ModalAdmin;
