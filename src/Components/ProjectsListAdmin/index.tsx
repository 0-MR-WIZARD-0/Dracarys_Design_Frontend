import React, { useState } from 'react';
import styles from '@/app/global_styles/admin_page/adminPage.module.scss';
import { Project } from '@/types/project';
import Pagination from '@/Components/Pagination'; // Импортируем компонент пагинации

interface ProjectListProps {
  projects: Project[];
  onDelete: (id: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEdit: (type: "project", data: any) => void;
}

const ProjectListAdmin: React.FC<ProjectListProps> = ({ projects, onDelete, onEdit }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const currentPageData = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.view_projects}>
      {currentPageData.length > 0 ? (
        currentPageData.map((project) => (
          <div key={project.id} className={styles.element}>
            <div className={styles.info}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <p>Превью</p>
              <img
                src={`http://localhost:3001/uploads/${project.previewImage}`}
                alt={project.name}
              />
              <p>Фотографии</p>
              <div>
                {project.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={`http://localhost:3001/uploads/${image}`}
                    alt={`Фото ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className={styles.buttons}>
              <button onClick={() => onEdit("project", project)}>Редактировать</button>
              <button onClick={() => onDelete(project.id)}>Удалить</button>
            </div>
          </div>
        ))
      ) : (
        <p>Проекты не найдены.</p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProjectListAdmin;
