'use client';

import styles from "@/app/detail/[id]/detail.module.css"
import { BookData } from "@/types/BookData";
import { GetSaleData } from "@/utils/saleUtils";

type DetailBookInfoProps = {
    book: BookData;
}

export default function DetailBookInfo({ book }: DetailBookInfoProps) {
    // 세일 정보
    const { priceSales, priceStandard, isSale, percentSale } = GetSaleData(book);
    
    return (
        <div>
            <div className={styles.price_container}>
                <p className={styles.key}>정가<span className={styles.value}>{priceStandard.toLocaleString()}원</span></p>
                {isSale && <p className={styles.key}>할인<span className={styles.sale}>{percentSale}%</span>
                <span className={styles.value}>-{(priceStandard - priceSales).toLocaleString()}원</span></p>}
                <p className={styles.result_key}>판매가<span className={styles.result_value}>{priceSales.toLocaleString()}원</span></p>
            </div>
        </div>
    );
}