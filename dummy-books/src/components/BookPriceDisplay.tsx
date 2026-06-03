import styles from "./BookPriceDisplay.module.css"
import { GetSaleData } from "@/utils/saleUtils";
import { BookData } from "@/types/BookData"

type BookPriceDisplayProps = {
    book: BookData;
    isSimple: boolean;
}

export default function BookPriceDisplay({ book, isSimple }: BookPriceDisplayProps) {
    const { priceSales, priceStandard, isSale, percentSale } = GetSaleData(book);

    return (
        <div>
        {isSimple ? 
            <p className={styles.price_simple}>
                {isSale && <span className={styles.sale_simple}>{`${percentSale}%`}</span>}
                {(isSale ? priceSales : priceStandard).toLocaleString()}원
            </p> :
            <p className={styles.price}>
                {isSale && <span className={styles.sale}>{`${percentSale}%`}</span>}
                {(isSale ? priceSales : priceStandard).toLocaleString()}원
            </p>
        }
        </div>
    );
}