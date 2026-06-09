import styles from "@/app/detail/[id]/detail.module.css"
import { BookData } from "@/types/BookData";
import Image from "next/image";

type DetailBookBottomProps = {
    book: BookData;
}

export default function DetailBookBottom({ book }: DetailBookBottomProps) {
    return (
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
                <p className={styles.book_subtitle}>알라딘 평점</p>
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
    );
}