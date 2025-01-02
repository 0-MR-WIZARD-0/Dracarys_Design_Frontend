import React from 'react';
import styles from '@/app/global_styles/admin_page/adminPage.module.scss';
import { Project } from '@/Pages/admin_page';

interface ProjectListProps {
  projects: Project[];
  onDelete: (id: number) => void;
}

const ProjectListAdmin: React.FC<ProjectListProps> = ({ projects, onDelete }) => {
  return (
    <div className={styles.view_projects}>
      {projects?.map((project) => (
        <div key={project.id} className={styles.element}>
          <div className={styles.info}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p>Превью</p>
            <img src={`http://localhost:3001/${project.previewImage}`} alt={project.name} />
            <p>Фотографии</p>
            <div>
              {project.images.map((image: string, index: number) => (
                <img key={index} src={`http://localhost:3001/${image}`} alt={`Фото ${index + 1}`} />
              ))}
            </div>
          </div>
          <div className={styles.buttons}>
            <button>Редактировать</button>
            <button onClick={() => onDelete(project.id)}>Удалить</button>
          </div>
        </div>
      ))}
    </div>
  );
};



export default ProjectListAdmin;
