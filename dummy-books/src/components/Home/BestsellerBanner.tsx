'use client';

import styles from "@/components/Home/BestsellerBanner.module.css"
import { useScrollSlider } from "@/hooks/useScrollSlider";
import { BookData } from "@/types/BookData";
import Link from "next/link";

type BestsellerBannerProps = {
  title: string;
  books: BookData[];
};

export default function BestsellerBanner({ title, books }: BestsellerBannerProps) {
  const { slideRef, isPrevDisabled, isNextDisabled, handlePrev, handleNext } = useScrollSlider();

  return (
    <div>
      <div className={styles.container}>
        <button className={styles.btn_prev} onClick={handlePrev} disabled={isPrevDisabled}>이전</button>

        <div className={styles.slide_box} ref={slideRef}>
          {books.map((book, idx) => {
            return (
              <Link
                className={styles.slide_item}
                style={{ backgroundImage: `url('${book.cover}')` }}
                key={idx}
                href={(`/detail/${book.isbn13}`)}
              >
                <p className={styles.title}>{title}</p>
                <p className={styles.book_title}>{book.title}</p>
                <p className={styles.book_info}>{book.description}</p>
                <p className={styles.book_info}>{book.author}</p>
              </Link>
            );
          })}
        </div>

        <button className={styles.btn_next} onClick={handleNext} disabled={isNextDisabled}>다음</button>
      </div>
    </div>
  );
}
