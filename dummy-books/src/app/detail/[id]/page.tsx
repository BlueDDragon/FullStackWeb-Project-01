import styles from "@/app/detail/[id]/detail.module.css"
import books from "@/mocks/mock_books.json"
import Image from "next/image";

export default async function Page({ params }: { params: Promise<{id: string}> }) {
    const { id } = await params;
    const book = books.item[0];

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
                    <input className={styles.input} type="number"/>
                    <button className={styles.btn_increase}>+</button>
                    <button className={styles.btn_decrease}>-</button>
                </div>
                <div>
                    <button className={styles.btn_cart}>장바구니</button>
                    <button className={styles.btn_cart}>바로구매</button>
                    <button className={styles.btn_cart}>선물하기</button>
                    <button className={styles.btn_cart}>보관함+</button>
                </div>
            </div>
        </div>
    );
}