"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper/modules";
import { useState } from 'react';
import styles from "@/Components/Slider/slider.module.scss"
import back from "@/app/assets/background_main.png"

const Slider = () => {

    const images = [
        "https://cs5.livemaster.ru/storage/83/ae/8b8099ef6cd9aede99c28aecb2sy--odezhda-dzhinsovaya-kurtka-s-printom-kastom-ruchnaya-rospis.jpg",
        "https://sun9-50.userapi.com/c855036/v855036645/3b0a0/DJ6UsnYRY2w.jpg",
        "https://i.pinimg.com/736x/6f/ce/d8/6fced87451ce74cb9e656e90452c698c.jpg",
        "src/app/assets/background_main.png",
        // back
      ];

      const [activeIndex, setActiveIndex] = useState(1); // Центральный индекс для начала

      const visibleImages = 3;
    
      // Функция для перехода к следующему набору слайдов
      const nextSlide = () => {
        if (images.length > visibleImages) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
      };
    
      // Функция для перехода к предыдущему набору слайдов
      const prevSlide = () => {
        if (images.length > visibleImages) {
          setActiveIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
          );
        }
      };
    
      // Функция для выбора конкретного слайда
      const selectSlide = (index: number) => {
        setActiveIndex(index);
      };
    
      // Определяем, заблокированы ли стрелки
      const isPrevDisabled = images.length <= visibleImages;
      const isNextDisabled = images.length <= visibleImages;
    
      // Логика для отображения текущих 3-х изображений с центральным активным слайдом
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