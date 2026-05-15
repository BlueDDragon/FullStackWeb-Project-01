'use client';

import styles from "@/app/detail/[id]/detail.module.css"
import CartConfirm from "@/components/Confirm/CartConfirm";
import { BookData } from "@/types/BookData";
import { fetchItemLookUpByISBN13 } from "@/utils/fetchClient";
import Image from "next/image";
import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AddCart } from "@/utils/cartUtils";
import Empty from "@/components/Empty/Empty";
import { GetSaleData } from "@/utils/saleUtils";
import DetailCategory from "@/components/Detail/DetailCategory";

export default function Page() {
    const { id } = useParams();
    const [books, setBooks] = useState<BookData[]>([]);
    fetchItemLookUpByISBN13(setBooks, parseInt(id as string));

    const [isConfirm, setIsConfirm] = useState(false);
    const handleOpen = () => {
        AddCart({ book: book, count: (inputRef.current ? parseInt(inputRef.current.value) : 1) });
        setIsConfirm(true);
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const [count, setCount] = useState(1);
    const handleCountIncrease = () => {
        if (!inputRef.current) return;
        inputRef.current.value = (count + 1).toString();
        setCount((prev) => prev + 1);
    };
    const handleCountDecrease = () => {
        if (count <= 1) return;
        if (!inputRef.current) return;
        inputRef.current.value = (count - 1).toString();
        setCount((prev) => prev - 1);
    };
    
    const router = useRouter();
    const handleOrder = () => {
        AddCart({ book: book, count: (inputRef.current ? parseInt(inputRef.current.value) : 1) });
        router.push(`/mypage/0/cart`);
    };

    if (!books || books.length === 0) {
        return <Empty info="상품을 불러오고 있습니다."/>;
    }

    const book = books[0] as BookData;
    const { priceSales, priceStandard, isSale, percentSale } = GetSaleData(book);

    return (
        <div>
            <div className={styles.detail_upper}>
                <DetailCategory category={book.categoryName}/>
                <p className={styles.title}>{book.title}</p>
                {/* <p className={styles.info}>{book.author}, {book.publisher}, {book.pubDate}</p> */}
            </div>
            <div className={styles.detail_body}>
                <Image src={book.cover} width={100} height={180} alt=""/>
                <div className={styles.aside_container}>
                    <div className={styles.price_container}>
                        <p className={styles.key}>정가<span className={styles.value}>{priceStandard.toLocaleString()}원</span></p>
                        {isSale && <p className={styles.key}>할인<span className={styles.sale}>{percentSale}%</span>
                        <span className={styles.value}>-{(priceStandard - priceSales).toLocaleString()}원</span></p>}
                        <p className={styles.result_key}>판매가<span className={styles.result_value}>{priceSales.toLocaleString()}원</span></p>
                    </div>
                    <div className={styles.buy_count}>
                        <p className={styles.key_count}>수량</p>
                        <input className={styles.input} type="number" defaultValue={1} min={1} ref={inputRef}/>
                        <button className={styles.btn_increase} onClick={handleCountIncrease}>+</button>
                        <button className={styles.btn_decrease} onClick={handleCountDecrease}>-</button>
                    </div>
                    <div className={styles.btns}>
                        <button className={styles.btn_cart} onClick={handleOpen}>장바구니</button>
                        <button className={styles.btn_cart} onClick={handleOrder}>바로구매</button>
                    </div>
                </div>
            </div>
            <div className={styles.detail_book}>
                <div className={styles.book_container}>
                    <p className={styles.book_subtitle}>작가</p>
                    <p className={styles.book_info}>{book.author}</p>
                </div>
                <div className={styles.book_container}>
                    <p className={styles.book_subtitle}>출판사</p>
                    <p className={styles.book_info}>{book.publisher}</p>
                </div>
                <div className={styles.book_container}>
                    <p className={styles.book_subtitle}>출판일</p>
                    <p className={styles.book_info}>{book.pubDate}</p>
                </div>
                <div className={styles.book_container}>
                    <p className={styles.book_subtitle}>책 소개</p>
                    <p className={styles.book_info}>{book.description}</p>
                </div>
                <div className={styles.book_container}>
                    <p className={styles.book_subtitle}>카테고리</p>
                    <p className={styles.book_info}>{book.categoryName}</p>
                </div>
                <div className={styles.book_container}>
                    <p className={styles.book_subtitle}>ISBN</p>
                    <p className={styles.book_info}>{book.isbn13}</p>
                </div>
                <div className={styles.book_container}>
                    <p className={styles.book_subtitle}>평점/리뷰</p>
                    <p className={styles.book_info}>
                        {book.subInfo.ratingInfo.ratingScore}점
                        ({`${book.subInfo.ratingInfo.ratingCount}`})
                    </p>
                </div>
                <div className={styles.book_container}>
                    <p className={styles.book_subtitle}>바로가기</p>
                    <div className={styles.hyperlink_container}>
                        {/* <a className={styles.hyperlink_naver}>
                            <Image className={styles.hyperlink_image} src={"/images/naver.png"} width={50} height={50} alt=""/>네이버 도서 바로가기</a>
                        <a className={styles.hyperlink_google}>
                            <Image className={styles.hyperlink_image} src={"/images/google.png"} width={50} height={50} alt=""/>구글 도서 바로가기</a> */}
                        <a className={styles.hyperlink_aladin} href={`${book.link}`}>
                            <Image className={styles.hyperlink_image} src={"/images/aladin.png"} width={50} height={50} alt=""/>알라딘 서점 바로가기</a>
                        {/* <a className={styles.hyperlink_kyobo}>
                            <Image className={styles.hyperlink_image} src={"/images/kyobo.png"} width={50} height={50} alt=""/>교보문고 바로가기</a> */}
                    </div>
                </div>
            </div>
            <div>
                <CartConfirm isOpen={isConfirm} onOpen={setIsConfirm}/>
            </div>
        </div>
    );
}