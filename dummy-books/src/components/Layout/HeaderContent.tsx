'use client';

import { HeaderContext } from "@/context/HeaderContext";
import { getCarts } from "@/utils/services/cartUtils";
import { getLogin } from "@/utils/services/userUtils";
import { useEffect, useState } from "react";

type HeaderContentProps = {
    children: React.ReactNode;
}

export default function HeaderContent({ children }: HeaderContentProps) {

    const [loginId, setLoginId] = useState("0");
    const [cartTotalCount, setCartTotalCount] = useState(0);
    useEffect(() => {
        setLoginId(getLogin()?.id);
        setCartTotalCount(getCarts()?.reduce((sum, cur) => sum + (cur.count ? cur.count : 0), 0)); 
    }, []);

    return (
        <HeaderContext.Provider value={{ loginId, setLoginId, cartTotalCount, setCartTotalCount, }}>
            {children}
        </HeaderContext.Provider>
    );
}