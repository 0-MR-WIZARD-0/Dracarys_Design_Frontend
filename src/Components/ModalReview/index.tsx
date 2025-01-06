"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalReview: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [content, setContent] = useState("");
  const [categories] = useState<("customization" | "web-development" | "design")[]>([
    "customization",
    "web-development",
    "design",
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [existingReviews, setExistingReviews] = useState<any[]>([]);

  useEffect(() => {
    if (selectedCategory) {
      const fetchProjects = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/projects?category=${selectedCategory}`
          );
          setProjects(response.data);
        } catch (error) {
          console.error("Ошибка при загрузке проектов:", error);
        }
      };
      fetchProjects();
    }
  }, [selectedCategory]);

  useEffect(() => {
    const fetchExistingReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3001/reviews");
        setExistingReviews(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке отзывов:", error);
      }
    };
    fetchExistingReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedProjectId) {
      const existingReview = existingReviews.find(
        (review) => review.project.id === selectedProjectId
      );

      if (existingReview) {
        console.error("Отзыв для этого проекта уже существует.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:3001/reviews", {
          firstName,
          lastName,
          content,
          projectId: selectedProjectId,
        });
        console.log("Отзыв отправлен:", response.data);

        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== selectedProjectId)
        );

        onClose();
      } catch (error) {
        console.error("Ошибка при отправке отзыва:", error);
      }
    } else {
      console.error("Проект не выбран");
    }
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2>Оставить отзыв</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.label_block}>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Имя"
            />
          </div>
          <div className={styles.label_block}>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Фамилия"
            />
          </div>
          <div className={styles.label_block}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Ваш отзыв"
            />
          </div>
          <div className={styles.label_block}>
            <select onChange={(e) => setSelectedCategory(e.target.value)} required>
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.label_block}>
            <select
              value={selectedProjectId || ""}
              onChange={(e) => setSelectedProjectId(Number(e.target.value))}
              required
            >
              <option value="">Выберите проект</option>
              {projects
                .filter((project) => !existingReviews.some((review) => review.project.id === project.id))
                .map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
            </select>
          </div>
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default ModalReview;
