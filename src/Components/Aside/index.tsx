"use client"

import styles from '@/Components/Aside/aside.module.scss';
import Image from 'next/image';
import tg from '@/app/assets/tg.svg';
import comment from '@/app/assets/comment.svg';
// import Modal from '@/Components/ModalReview';
import { useState } from 'react';
import ModalReview from '@/Components/ModalReview';

const Aside = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <aside>
      <a className={styles.telegram} href="https://t.me/dracarys_design">
        <Image src={tg} alt="TG" />
      </a>
      <div className={styles.comment} onClick={handleOpenModal}>
        <Image src={comment} alt="comment" />
      </div>
      <ModalReview isOpen={isModalOpen} onClose={handleCloseModal} />
    </aside>
  );
};

export default Aside;
