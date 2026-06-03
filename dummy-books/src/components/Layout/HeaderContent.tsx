'use client';

import { HeaderContext } from "@/context/HeaderContext";
import { GetCarts } from "@/utils/services/cartUtils";
import { GetLogin } from "@/utils/services/userUtils";
import { useEffect, useState } from "react";

type HeaderContentProps = {
    children: React.ReactNode;
}

export default function HeaderContent({ children }: HeaderContentProps) {

    const [loginId, setLoginId] = useState("0");
    const [cartTotalCount, setCartTotalCount] = useState(0);
    useEffect(() => {
        setLoginId(GetLogin()?.id);
        setCartTotalCount(GetCarts()?.reduce((sum, cur) => sum + (cur.count ? cur.count : 0), 0)); 
    }, []);

    return (
        <HeaderContext.Provider value={{ loginId, setLoginId, cartTotalCount, setCartTotalCount, }}>
            {children}
        </HeaderContext.Provider>
    );
}