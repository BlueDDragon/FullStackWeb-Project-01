'use client';

import styles from "@/components/Home/BestsellerList.module.css"
import { BookData } from "@/types/BookData";
import BestsellerItem from "@/components/Home/BestsellerItem";
import { useScrollSlider } from "@/hooks/useScrollSlider";

type BestsellerListProps = {
    title: string;
    books: BookData[];
}

export default function BestsellerList({ title, books }: BestsellerListProps) {
    const { slideRef, isPrevDisabled, isNextDisabled, handlePrev, handleNext } = useScrollSlider();
        
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