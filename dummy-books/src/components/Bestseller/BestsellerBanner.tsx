'use client';

import styles from "@/components/Bestseller/BestsellerBanner.module.css"
import { BookData } from "@/types/BookData";
import Link from "next/link";
import { useRef } from "react";

type BestsellerBannerProps = {
  title: string;
  books: BookData[];
};

export default function BestsellerBanner({ title, books }: BestsellerBannerProps) {
    const slideRef = useRef<HTMLDivElement>(null);
    
    const handlePrev = () => {
        if (!slideRef.current) return;

        const width = slideRef.current.clientWidth;
        slideRef.current.scrollBy({
            left: -width,
            behavior: "smooth",
        });
    };

    const handleNext = () => {
        if (!slideRef.current) return;

        const width = slideRef.current.clientWidth;
        slideRef.current.scrollBy({
            left: width,
            behavior: "smooth",
        });
    };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.btn_prev} onClick={handlePrev}>이전</div>

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

        <div className={styles.btn_next} onClick={handleNext}>다음</div>
      </div>
    </div>
  );
}
