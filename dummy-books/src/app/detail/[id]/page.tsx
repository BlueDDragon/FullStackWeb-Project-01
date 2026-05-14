'use client';

import styles from "@/app/detail/[id]/detail.module.css"
import CartConfirm from "@/components/Confirm/CartConfirm";
import { BookData } from "@/types/BookData";
import { fetchItemLookUpByISBN13 } from "@/utils/fetchClient";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import { AddCart } from "@/utils/cartUtils";

export default function Page() {
    const { id } = useParams();
    const [books, setBooks] = useState<BookData[]>([]);
    fetchItemLookUpByISBN13(setBooks, parseInt(id as string));

    const [isConfirm, setIsConfirm] = useState(false);
    const handleOpen = () => {
        AddCart({ book: book, count: count });
        setIsConfirm(true);
    };

    const [count, setCount] = useState(1);
    const handleCountIncrease = () => {
        setCount((prev) => prev + 1);
    };
    const handleCountDecrease = () => {
        if (count <= 1) return;
        setCount((prev) => prev - 1);
    };

    if (!books || books.length === 0) {
        return <div></div>;
    }

    const book = books[0] as BookData;

    return (
        <div>
            <div className={styles.detail_upper}>
                <p className={styles.title}>{book.title}</p>
                <p className={styles.info}>{book.author}, {book.publisher}, {book.pubDate}</p>
            </div>
            <div className={styles.detail_body}>
                <Image src={book.cover} width={100} height={180} alt=""/>
                <div className={styles.container}>
                    <p className={styles.key}>정가<span className={styles.value}>{book.priceStandard}</span></p>
                    <p className={styles.key}>판매가<span className={styles.value}>{book.priceSales}</span></p>
                </div>
                <div className={styles.buy_count}>
                    <p className={styles.key}>수량</p>
                    <input className={styles.input} type="number" value={count} readOnly={true}/>
                    <button className={styles.btn_increase} onClick={handleCountIncrease}>+</button>
                    <button className={styles.btn_decrease} onClick={handleCountDecrease}>-</button>
                </div>
                <div>
                    <button className={styles.btn_cart} onClick={handleOpen}>장바구니</button>
                    <button className={styles.btn_cart}>바로구매</button>
                    <button className={styles.btn_cart}>선물하기</button>
                    <button className={styles.btn_cart}>보관함+</button>
                </div>
            </div>
            <div>
                <CartConfirm book={book} isOpen={isConfirm} onOpen={setIsConfirm}/>
            </div>
        </div>
    );
}