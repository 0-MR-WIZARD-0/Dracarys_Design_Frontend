import axios from "axios";

export const fetchProjects = async (category: string) => {
  try {
    const response = await axios.get(`http://localhost:3001/projects?category=${category}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке проектов:", error);
    return [];
  }
};

export const fetchProjectById = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:3001/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке проекта:", error);
    return null;
  }
};

export const fetchFAQ = async () => {
  try {
    const response = await axios.get('http://localhost:3001/faq');
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке FAQ:", error);
    return [];
  }
};

export const fetchFeedback = async () => {
  try {
    const response = await axios.get('http://localhost:3001/reviews');
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке отзывов:", error);
    return [];
  }
};

export const fetchReviewByProjectId = async (projectId: number) => {
  try {
    const response = await axios.get(`http://localhost:3001/reviews/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке отзыва для проекта:", error);
    return null;
  }
};

export const deleteProject = async (id: number, token: string) => {
  try {
    const response = await axios.delete(`http://localhost:3001/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error("Ошибка при удалении проекта:", error);
    return false;
  }
};

export const deleteFAQ = async (id: number, token: string) => {
  try {
    const response = await axios.delete(`http://localhost:3001/faq/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error("Ошибка при удалении FAQ:", error);
    return false;
  }
};

export const deleteFeedback = async (id: number, token: string) => {
  try {
    const response = await axios.delete(`http://localhost:3001/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error("Ошибка при удалении отзыва:", error);
    return false;
  }
};
