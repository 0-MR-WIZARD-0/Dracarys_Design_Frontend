/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "@/app/globals.css";
import styles from "@/app/global_styles/admin_page/adminPage.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectListAdmin from "../Components/ProjectsListAdmin";
import axios from "axios";
import TokenChecker from "@/services/utils/tokenCheck";
import FAQListAdmin from "@/Components/FAQListAdmin";
import { Project } from "@/types/project";
import { FAQ } from "@/types/faq";
import { deleteFAQ, deleteFeedback, deleteProject, fetchFAQ, fetchFeedback, fetchProjects } from "@/services/api/api";
import ModalAdmin from "@/Components/ModalAdmin";
import Pagination from "@/Components/Pagination";

const AdminPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<"customization" | "design" | "web-development" | "FAQ" | "feedback">("customization");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [photos, setPhotos] = useState<FileList | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqList, setFaqList] = useState<FAQ[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [feedbackList, setFeedbackList] = useState<any[]>([]); 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modalData, setModalData] = useState<any>(null);
  const [modalType, setModalType] = useState<"project" | "faq" | "feedback">("project");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(feedbackList.length / itemsPerPage);

  const currentPageData = feedbackList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCategory === "customization" || selectedCategory === "design" || selectedCategory === "web-development") {
        const projects = await fetchProjects(selectedCategory);
        setProjects(projects);
      } else if (selectedCategory === "FAQ") {
        const faq = await fetchFAQ();
        setFaqList(faq);
      } else if (selectedCategory === "feedback") {
        const feedback = await fetchFeedback();
        setFeedbackList(feedback);
      }
    };
    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
  }, [projects]);

  const router = useRouter();

  const handleCategory = (tab: "customization" | "design" | "web-development" | "FAQ" | "feedback") => {
    setSelectedCategory(tab);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (category: string) => {
    const formData = new FormData();
    formData.append("name", projectName);
    formData.append("category", category);
    formData.append("description", description);
    if (previewFile) {
      formData.append("previewImage", previewFile);
    }
    if (photos && photos.length > 0){
      Array.from(photos).forEach((file) => {
        formData.append(`images`, file);
      });
    }
    try {
      const response = await sendData(formData, "http://localhost:3001/projects");
      if (response?.data) { 
        setProjects((prevProjects) => [
          ...prevProjects,
          response?.data,
        ]);
      } else {
        console.error("Ответ не получен.");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных проекта:", error);
    }
  };

  const sendData = async (data: FormData, url: string) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',  
        },
      })
      return response;
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  const handleEdit = (type: "project" | "faq" | "feedback", data: any) => {
    setModalType(type);
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Пожалуйста, авторизуйтесь');
        return;
      }
      const success = await deleteProject(id, token);
      if (success) {
        setProjects((prevProjects) => prevProjects.filter((project) => project.id !== Number(id)));
      } else {
        console.error("Ошибка при удалении проекта");
      }
    } catch (error) {
      console.error("Ошибка при удалении проекта:", error);
    }
  };
  
  const handleSubmitFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        'http://localhost:3001/faq',
        { question, answer },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setFaqList((prevFaqList) => [...prevFaqList, response.data]);
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.error("Ошибка при отправке данных FAQ:", error);
    }
  };

  const handleDeleteFAQ = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Пожалуйста, авторизуйтесь');
        return;
      }
      const success = await deleteFAQ(id, token);
      if (success) {
        setFaqList((prevFaqList) => prevFaqList.filter((faq) => faq.id !== id));
      } else {
        console.error("Ошибка при удалении FAQ");
      }
    } catch (error) {
      console.error("Ошибка при удалении FAQ:", error);
    }
  };

  const handleDeleteFeedback = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Пожалуйста, авторизуйтесь');
        return;
      }
      const success = await deleteFeedback(id, token);
      if (success) {
        setFeedbackList((prevFeedbackList) => prevFeedbackList.filter((feedback) => feedback.id !== id));
      }  else {
        console.error("Ошибка при удалении отзыва");
      }
    } catch (error) {
      console.error("Ошибка при удалении отзыва:", error);
    }
  };

  const handleSave = (updatedData: any) => {
    if (modalType === "project") {
      setProjects((prevProjects) => prevProjects.map((project) => project.id === updatedData.id ? updatedData : project));
    } else if (modalType === "faq") {
      setFaqList((prevFaqList) => prevFaqList.map((faq) => faq.id === updatedData.id ? updatedData : faq));
    } else if (modalType === "feedback") {
      setFeedbackList((prevFeedbackList) => prevFeedbackList.map((feedback) => feedback.id === updatedData.id ? updatedData : feedback));
    }
  };

  return (
    <div className={styles.admin_page}>
      <TokenChecker />
      <h1>DRACARYS DESIGN</h1>
      <ul>
        {["customization", "design", "web-development", "FAQ", "feedback"].map((category) => (
          <li
            key={category}
            onClick={() => handleCategory(category as "customization" | "design" | "web-development" | "FAQ" | "feedback")}
            className={selectedCategory === category ? styles.active_tab : ""}
          >
            {category}
          </li>
        ))}
      </ul>

      <ModalAdmin
        type={modalType}
        data={modalData}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {selectedCategory === "feedback" && (
        <div className={styles.wrapper_feedbacks}>
          {currentPageData.length > 0 ? (
            currentPageData.map((feedback) => (
              <div key={feedback.id} className={styles.feedback}>
                <h3>{feedback.firstName} {feedback.lastName}</h3>
                <p>{feedback.content}</p>
                <p>{new Date(feedback.createdAt).toLocaleDateString()}</p>
                <div className={styles.buttons}>
                  <button onClick={() => handleEdit("feedback", feedback)}>Одобрить</button>
                  <button onClick={() => handleDeleteFeedback(feedback.id)}>Отклонить</button>
                </div>
              </div>
            ))
          ) : (
            <p>Нет отзывов.</p>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {(selectedCategory === "customization" || selectedCategory === "design" || selectedCategory === "web-development") && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(selectedCategory);
            }}
          >
            <label className={styles.label_title}>Название проекта</label>
            <input
              placeholder="Название проекта"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <label className={styles.label_title}>Описание</label>
            <textarea
              placeholder="Описание"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className={styles.label_title}>Превью</label>
            <label className={styles.input_file}>
              <span className={styles.input_file_text}></span>
              <input
                type="file"
                onChange={(e) => e.target.files && setPreviewFile(e.target.files[0])}
              />
              <span className={styles.input_file_btn}>Выберите файл</span>
            </label>
            <label className={styles.label_title}>Фотографии</label>
            <label className={styles.input_file}>
              <span className={styles.input_file_text}></span>
              <input
                type="file"
                multiple
                onChange={(e) => e.target.files && setPhotos(e.target.files)}
              />
              <span className={styles.input_file_btn}>Выберите файл</span>
            </label>
            <button type="submit" className={styles.create_button}>Создать</button>
          </form>
          <ProjectListAdmin projects={projects} onDelete={handleDeleteProject} onEdit={handleEdit}  />
        </>
      )}

      {selectedCategory === "FAQ" && (
        <>
          <form onSubmit={handleSubmitFAQ}>
            <label className={styles.label_title}>Вопрос</label>
            <input
              placeholder="Вопрос"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <label className={styles.label_title}>Ответ</label>
            <input
              placeholder="Ответ"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button type="submit" className={styles.create_button}>Создать</button>
          </form>
          <FAQListAdmin faq={faqList} onDelete={handleDeleteFAQ} onEdit={handleEdit}  />
        </>
      )}
    </div>
  );
};

export default AdminPage;