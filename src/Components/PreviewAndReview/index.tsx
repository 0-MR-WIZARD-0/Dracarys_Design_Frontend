import React, { useEffect, useState } from 'react';
import styles from "@/Components/PreviewAndReview/PreviewAndReview.module.scss";
import Image from 'next/image';
import { fetchReviewByProjectId } from "@/services/api/api";
import { formatDate } from '@/services/utils/dateUtils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PreviewAndReview = ({ project }: { project: any }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [review, setReview] = useState<any>(null);

  useEffect(() => {
    if (!project) return;

    const getReview = async () => {
      try {
        const fetchedReview = await fetchReviewByProjectId(project.id);
        setReview(fetchedReview);
      } catch (error) {
        console.log(`Ошибка при загрузке отзыва: ${error}`);
      }
    };
    getReview();
  }, [project]);

  return (
    <div className={styles.wrapper_PreviewAndReview}>

      {project && (
        <div className={styles.wrapper_info_project}>
            <h3>{project?.name}</h3>
            <p>{project?.description}</p>
        </div>
      )}

      {review && review.content && (
        <div className={styles.wrapper_Review}>
          <div className={styles.rectangle}></div>
          <div className={styles.Review}>
            <p>{review.content}</p>
            <h3>{review.firstName} {review.lastName}</h3>
            <p>{formatDate(review.createdAt)}</p>
          </div>
        </div>
      )}

      {project && review && review.content && (
        <>
          <div className={styles.preview_1_2}>
            {project?.images.slice(0, 2).map((img: string, index: number) => (
              <div key={index} className={styles[`preview_${index + 1}` as keyof typeof styles]}>
                <Image src={img} alt='photo' width={500} height={300} />
              </div>
            ))}
          </div>
          <div className={styles.preview_3}>
            <img width={500} height={300} src={`http://localhost:3001${project?.images}`} alt='photo' />
          </div>
        </>
      )}

      {project && !review?.content && (
        <div className={styles.previews_not_review}>
          <div className={styles.preview_1}>
            <img width={500} height={300} src={`http://localhost:3001${project?.images}`} alt='photo' />
          </div>
          <div className={styles.preview_2}>
            <img width={500} height={300} src={`http://localhost:3001${project?.images}`} alt='photo' />
          </div>
          <div className={styles.preview_3}>
            <img width={500} height={300} src={`http://localhost:3001${project?.images}`} alt='photo' />
          </div>
        </div>
      )}

    </div>
  );
};

export default PreviewAndReview;
