"use client"

import { useState } from 'react';
import styles from "@/Components/Slider/slider.module.scss"

const Slider = () => {

    const images = [
        "https://cs5.livemaster.ru/storage/83/ae/8b8099ef6cd9aede99c28aecb2sy--odezhda-dzhinsovaya-kurtka-s-printom-kastom-ruchnaya-rospis.jpg",
        "https://sun9-50.userapi.com/c855036/v855036645/3b0a0/DJ6UsnYRY2w.jpg",
        "https://i.pinimg.com/736x/6f/ce/d8/6fced87451ce74cb9e656e90452c698c.jpg"
      ];

      const [activeIndex, setActiveIndex] = useState(1);

      const visibleImages = 3;
    
      const nextSlide = () => {
        if (images.length > visibleImages) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
      };
    
      const prevSlide = () => {
        if (images.length > visibleImages) {
          setActiveIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
          );
        }
      };
    
      const selectSlide = (index: number) => {
        setActiveIndex(index);
      };
    
      const isPrevDisabled = images.length <= visibleImages;
      const isNextDisabled = images.length <= visibleImages;
    
      const getVisibleSlides = () => {
        const slides = [];
        for (let i = -1; i < visibleImages - 1; i++) {
          slides.push(images[(activeIndex + i + images.length) % images.length]);
        }
        return slides;
      };
    
      return (
        <div className={styles.sliderContainer}>
          <button
            className={styles.prevButton}
            onClick={prevSlide}
            disabled={isPrevDisabled}
          >
            ←
          </button>
    
          <div className={styles.slides}>
            {getVisibleSlides().map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className={index === 1 ? styles.active : ""}
                onClick={() => selectSlide((activeIndex + index - 1) % images.length)}
              />
            ))}
          </div>
    
          <button
            className={styles.nextButton}
            onClick={nextSlide}
            disabled={isNextDisabled}
          >
            →
          </button>
        </div>
      );
}

export default Slider