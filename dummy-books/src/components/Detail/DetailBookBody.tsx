'use client';

import styles from "@/app/detail/[id]/detail.module.css"
import { BookData } from "@/types/BookData";
import Image from "next/image";
import DetailBookInfo from "./DetailBookInfo";
import DetailBookPurchase from "./DetailBookPurchase";

type DetailBookBodyProps = {
    book: BookData;
    onCartOpen: () => void;
}

export default function DetailBookBody({ book, onCartOpen }: DetailBookBodyProps) {
    return (
        <div>
            <div className={styles.detail_body}>
                <Image src={book.cover} width={100} height={180} alt=""/>
                <div className={styles.aside_container}>
                    <DetailBookInfo book={book} />
                    <DetailBookPurchase book={book} onCartOpen={onCartOpen} />
                </div>
            </div>
        </div>
    );
}