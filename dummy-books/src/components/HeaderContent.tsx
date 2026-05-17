'use client';

import { HeaderContext } from "@/context/HeaderContext";
import { GetCarts } from "@/utils/cartUtils";
import { GetLogin } from "@/utils/userUtils";
import { useEffect, useState } from "react";

type HeaderContentProps = {
    children: React.ReactNode;
}

export default function HeaderContent({ children }: HeaderContentProps) {
    const [updateHeader, setUpdateHeader] = useState<(() => void) | null>(null);
    const addUpdateHeader = (func: () => void) => {
        setUpdateHeader((prev) => {
            if (!prev) return func;
            return () => {
                prev();
                func();
            };
        });
    };
    const resetUpdateHeader = () => {
        setUpdateHeader(null);
    };

    const [updateLogin, setUpdateLogin] = useState<(() => void) | null>(null);
    const addUpdateLogin = (func: () => void) => {
        setUpdateLogin((prev) => {
            if (!prev) return func;
            return () => {
                prev();
                func();
            };
        });
    };
    const resetUpdateLogin = () => {
        setUpdateLogin(null);
    };

    const [loginId, setLoginId] = useState("0");
    const [cartTotalCount, setCartTotalCount] = useState(0);
    useEffect(() => {
        setLoginId(GetLogin()?.id);
        setCartTotalCount(GetCarts()?.reduce((sum, cur) => sum + (cur.count ? cur.count : 0), 0)); 
    }, []);

    return (
        <HeaderContext.Provider value={{ addUpdateHeader, resetUpdateHeader, updateHeader, 
                                            addUpdateLogin, resetUpdateLogin, updateLogin,
                                            loginId, setLoginId,
                                            cartTotalCount, setCartTotalCount, }}>
            {children}
        </HeaderContext.Provider>
    );
}