'use client';

import { BookData } from "@/types/BookData";
import { isWishAlready, toggleWish } from "@/utils/services/wishUtils";
import { useCallback, useEffect, useState } from "react";

export function useWishToggle(book: BookData, isLogined: boolean, onNotLogined: () => void) {
    const [isAlready, setIsWishAlready] = useState(false);
    
    useEffect(() => {
        setIsWishAlready(isWishAlready(book.isbn13));
    }, [book, isLogined]);
    
    const handleToggleWish = useCallback(() => {
        if (isLogined)
            setIsWishAlready(toggleWish(book));
        else
            onNotLogined();
    }, [book, isLogined]);

    return { isAlready, handleToggleWish };
}