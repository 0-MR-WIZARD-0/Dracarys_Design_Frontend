"use client";

import { useState } from 'react';
import styles from "@/Components/Slider/slider.module.scss";
import Image from 'next/image';

interface Project {
  id: number;
  previewImage: string;
}

const Slider = ({ projects, onProjectSelect }: { projects: Project[], onProjectSelect: (id: number) => void }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleImages = 3;

  const nextSlide = () => {
    if (projects.length > visibleImages) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length);
    }
  };

  const prevSlide = () => {
    if (projects.length > visibleImages) {
      setActiveIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    }
  };

  const selectSlide = (index: number) => {
    setActiveIndex(index);
    onProjectSelect(projects[index].id);
  };

  const getVisibleSlides = () => {
    const slides = [];
    const totalProjects = projects.length;

    for (let i = -1; i < visibleImages - 1; i++) {
      const projectIndex = (activeIndex + i + totalProjects) % totalProjects;
      slides.push(projects[projectIndex]);
    }
    return slides;
  };

  if (!projects || projects.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.sliderContainer}>
      <button className={styles.prevButton} onClick={prevSlide}>←</button>

      <div className={styles.slides}>
        {getVisibleSlides().map((project, index) => (
          <div
            key={index}
            className={index === 1 ? styles.active : ""}
            onClick={() => selectSlide((activeIndex + index - 1) % projects.length)}
          >
            {project.previewImage ? (
              <Image
                src={project.previewImage}
                alt={`Slide ${index + 1}`}
                width={500}  
                height={300} 
              />
            ) : (
              <div>Image not available</div>
            )}
          </div>
        ))}
      </div>

      <button className={styles.nextButton} onClick={nextSlide}>→</button>
    </div>
  );
};

export default Slider;
