'use client';

import styles from "@/components/Bestseller/BestsellerBanner.module.css"
import { BookData } from "@/types/BookData";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type BestsellerBannerProps = {
  title: string;
  books: BookData[];
};

export default function BestsellerBanner({ title, books }: BestsellerBannerProps) {
    const slideRef = useRef<HTMLDivElement>(null);
    
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const updateButtonState = () => {
      if (!slideRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = slideRef.current;

      setIsPrevDisabled(scrollLeft <= 0);
      setIsNextDisabled(scrollLeft + clientWidth >= scrollWidth - 1);
    };

    useEffect(() => {
      const slide = slideRef.current;
      if (!slide) return;

      updateButtonState();
      slide.addEventListener("scroll", updateButtonState);

      return () => {slide.removeEventListener("scroll", updateButtonState);};
    }, []);

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
