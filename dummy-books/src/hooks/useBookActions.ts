'use client';

import { HeaderContext } from "@/context/HeaderContext";
import { BookData } from "@/types/BookData";
import { LoginData } from "@/types/UserData";
import { addCart, getCartTotalCount } from "@/utils/services/cartUtils";
import { useRouter } from "next/navigation";
import { useCallback, useContext } from "react";

type UseBookActionsParams = {
    isLogined?: boolean;
    login?: LoginData | null;

    book: BookData;
    getCount: () => number;
    onComplete: () => void;
}

export function useBookActions({ isLogined, login, book, getCount, onComplete }: UseBookActionsParams) {
    const { setCartTotalCount } = useContext(HeaderContext);
    const router = useRouter();

    // 장바구니
    const handleCartOpen = useCallback(() => {
        addCart({ book: book, count: getCount() });
        setCartTotalCount(getCartTotalCount());
        onComplete();
    }, [book]);
    
    // 바로구매
    const handleOrder = useCallback(() => {
        addCart({ book: book, count: getCount() });
        setCartTotalCount(getCartTotalCount());

        if (isLogined)
            router.push(`/mypage/${(login as LoginData).id}/cart`);
        else
            onComplete();
    }, [book, isLogined]);

    return { handleCartOpen, handleOrder };
}