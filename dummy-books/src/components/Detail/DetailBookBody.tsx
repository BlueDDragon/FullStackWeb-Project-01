'use client';

import styles from "@/app/detail/[id]/detail.module.css"
import { BookData } from "@/types/BookData";
import { AddCart } from "@/utils/cartUtils";
import { GetSaleData } from "@/utils/saleUtils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useContext } from "react";
import { useLoginState } from "@/utils/userUtils";
import { LoginData } from "@/types/UserData";
import { HeaderContext } from "@/context/HeaderContext";
import { useWishToggle } from "@/hooks/useWishToggle";
import { useCountInput } from "@/hooks/useCountInput";
import WishButton from "../WishButton";

type DetailBookBodyProps = {
    book: BookData;
    onCartOpen: () => void;
}

export default function DetailBookBody({ book, onCartOpen }: DetailBookBodyProps) {
    const { isLogined, isVerifyId, login } = useLoginState("0");
    const updateHeader = useContext(HeaderContext).updateHeader;
    
    // 세일 정보
    const { priceSales, priceStandard, isSale, percentSale } = GetSaleData(book);
    
    // 수량
    const { inputRef, handleCountIncrease, handleCountDecrease } = useCountInput(1);

    // 장바구니
    const handleCartOpen = useCallback(() => {
        AddCart({ book: book, count: (inputRef.current ? parseInt(inputRef.current.value) : 1) });
        updateHeader?.();
        onCartOpen();
    }, [book]);
    
    // 바로구매
    const router = useRouter();
    const handleOrder = useCallback(() => {
        AddCart({ book: book, count: (inputRef.current ? parseInt(inputRef.current.value) : 1) });
        updateHeader?.();

        if (isLogined)
            router.push(`/mypage/${(login as LoginData).id}/cart`);
        else
            onCartOpen();
    }, [book, isLogined]);
    
    // 찜하기
    const { isWishAlready, handleToggleWish } = useWishToggle(book, isLogined, onCartOpen);

    return (
        <div>
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
                        <div className={styles.btns_input}>
                            <button className={styles.btn_decrease} onClick={handleCountDecrease}>-</button>
                            <input className={styles.input} type="number" defaultValue={1} min={1} ref={inputRef}/>
                            <button className={styles.btn_increase} onClick={handleCountIncrease}>+</button>
                        </div>
                    </div>
                    <div className={styles.btns}>
                        <button className={styles.btn_cart} onClick={handleCartOpen}>장바구니</button>
                        <button className={styles.btn_order} onClick={handleOrder}>바로구매</button>
                        <WishButton isWished={isWishAlready} onClick={handleToggleWish}/>
                    </div>
                </div>
            </div>
        </div>
    );
}