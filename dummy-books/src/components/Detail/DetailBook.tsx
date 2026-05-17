'use client';

import styles from "@/app/detail/[id]/detail.module.css"
import { BookData } from "@/types/BookData";
import { useCallback, useState } from "react";
import DetailCategory from "./DetailCategory";
import DetailBookBody from "./DetailBookBody";
import DetailBookBottom from "./DetailBookBottom";
import CartConfirm from "../Confirm/CartConfirm";

type DetailBookProps = {
    book: BookData;
}

export default function DeatilBook({ book }: DetailBookProps) {
    // 장바구니 확인창 상태
    const [isCartConfirm, setIsCartConfirm] = useState(false);
    const handleCartOpen = useCallback(() => {
        setIsCartConfirm(true);
    }, []);

    return (
        <div>
            <div className={styles.detail_upper}>
                <DetailCategory category={book.categoryName}/>
                <p className={styles.title}>{book.title}</p>
                {/* <p className={styles.info}>{book.author}, {book.publisher}, {book.pubDate}</p> */}
            </div>
            <DetailBookBody book={book} onCartOpen={handleCartOpen} />
            <DetailBookBottom book={book} />
            <div>
                <CartConfirm isOpen={isCartConfirm} onOpen={setIsCartConfirm}/>
            </div> 
        </div>
    );
}