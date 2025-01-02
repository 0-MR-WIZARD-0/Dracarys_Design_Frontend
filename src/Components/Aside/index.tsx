"use client"

import styles from '@/Components/Aside/aside.module.scss';
import Image from 'next/image';
import tg from '@/app/assets/tg.svg';
import comment from '@/app/assets/comment.svg';
import Modal from '@/Components/Modal';
import { useState } from 'react';

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
      {/* <div> */}
      <a className={styles.telegram} href="https://t.me/dracarys_design">
        <Image src={tg} alt="TG" />
      </a>

      {/* </div> */}
      <div className={styles.comment} onClick={handleOpenModal}>
        <Image src={comment} alt="comment" />
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </aside>
  );
};

export default Aside;
