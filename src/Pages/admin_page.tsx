"use client";

import "@/app/globals.css";
import styles from "@/app/global_styles/admin_page/adminPage.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProjectListAdmin from "../Components/ProjectsListAdmin";
import axios from "axios";
import TokenChecker from "@/functions/tokenCheck";
import FAQListAdmin from "@/Components/FAQListAdmin";

export interface Project {
  id: number;
  name: string;
  category: 'customization' | 'design' | 'web-development';
  description: string;
  previewImage: string;
  images: string[];
}

export interface FAQ {
  id: number;
  question: string;
  answer: string
}

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

  const fetchProjects = async (category: string) => {
    try {
      setProjects([])
      const response = await axios.get(`http://localhost:3001/projects?category=${category}`);
      const result = await response.data;
      if (result && result.length > 0) {
        setProjects(result);
      } else {
        setProjects([]);
      }
    } catch (error) {
      setProjects([]);
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  const fetchFAQ = async () => {
    try {
      const response = await axios.get('http://localhost:3001/faq');
      setFaqList(response.data)
    } catch (error) {
      console.error("Ошибка при загрузке FAQ:", error);
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await axios.get('http://localhost:3001/reviews');
      console.log('Feedbacks:', response.data);
      setFeedbackList(response.data);  
    } catch (error) {
      console.error("Ошибка при загрузке feedback:", error);
    }
  };

  useEffect(() => {
    if (selectedCategory === "customization" || selectedCategory === "design" || selectedCategory === "web-development") {
      fetchProjects(selectedCategory);
    } else if (selectedCategory === "FAQ") {
      fetchFAQ();
    } else if (selectedCategory === "feedback") {
      fetchFeedback();
    }
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

  const handleDeleteProject = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3001/projects/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
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
      const response = await axios.delete(`http://localhost:3001/faq/${id}`);
      if (response.status === 200) {
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
  
      const response = await axios.delete(`http://localhost:3001/reviews/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        setFeedbackList((prevFeedbackList) =>
          prevFeedbackList.filter((feedback) => feedback.id !== id)
        );
      } else {
        console.error("Ошибка при удалении отзыва");
      }
    } catch (error) {
      console.error("Ошибка при удалении отзыва:", error);
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

      {selectedCategory === "feedback" && (
        <div className={styles.wrapper_feedbacks}>
          {feedbackList.length > 0 ? (
feedbackList.map((feedback) => (
        <div key={feedback.id} className={styles.feedback}>
          <h3>{feedback.firstName} {feedback.lastName}</h3>
          <p>{feedback.content}</p>
          <p>{new Date(feedback.createdAt).toLocaleDateString()}</p>
          <div className={styles.buttons}>
            <button>Одобрить</button>
            <button onClick={() => handleDeleteFeedback(feedback.id)}>Отклонить</button>
          </div>
        </div>
      ))
    ) : (
      <p>Нет отзывов.</p>
    )}
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
          <ProjectListAdmin projects={projects} onDelete={handleDeleteProject} />
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
          <FAQListAdmin faq={faqList} onDelete={handleDeleteFAQ} />
        </>
      )}
    </div>
  );
};

export default AdminPage;