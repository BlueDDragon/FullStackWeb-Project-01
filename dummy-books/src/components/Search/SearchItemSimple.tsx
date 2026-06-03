'use client';

import styles from "@/components/Search/SearchItem.module.css"
import { BookData } from "@/types/BookData";
import Link from "next/link";
import Image from "next/image";
import WishButton from "../WishButton";
import BookPriceDisplay from "../BookPriceDisplay";

type SearchItemSimpleProps = {
    book: BookData;
    isWishAlready: boolean;
    handleToggleWish: () => void;
};

export default function SearchItemSimple({ book, isWishAlready, handleToggleWish }: SearchItemSimpleProps) {
    return (
        <div className={styles.container_simple}>
            <Link href={`/detail/${book.isbn13}`}>
            <div className={styles.book_simple}>
                <Image className={styles.cover_simple} src={book.cover} width={180} height={261} alt="" />
                <div>
                <p className={styles.title_simple}>{book.title}</p>
                <p className={styles.description_simple}>{book.author}</p>
                <BookPriceDisplay book={book} isSimple={true}/>
                </div>
            </div>
            </Link>
            <div className={styles.btns_simple}>
            <WishButton isWished={isWishAlready} onClick={handleToggleWish}/>
            </div>
        </div>
        );
}