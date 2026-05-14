'use client';

import styles from "@/components/Bestseller/BestsellerList.module.css"
import mock_books from "@/mocks/mock_books.json"
import { BookData } from "@/types/BookData";
import BestsellerItem from "@/components/Bestseller/BestsellerItem";
import { useEffect, useRef, useState } from "react";

type BestsellerListProps = {
    title: string;
    books: BookData[];
}

export default function BestsellerList({ title, books }: BestsellerListProps) {
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
        <div className={styles.container}>
            <h4 className={styles.title}>{title}</h4>
            <button className={styles.btn_prev} onClick={handlePrev} disabled={isPrevDisabled}>{"<"}</button>
            <div className={styles.list} ref={slideRef}>
                {books.map((book) => <BestsellerItem key={book.itemId} book={book}/>)}
            </div>
            <button className={styles.btn_next} onClick={handleNext} disabled={isNextDisabled}>{">"}</button>
        </div>
    );
}