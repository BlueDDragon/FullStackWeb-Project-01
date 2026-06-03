import { createContext } from "react";

export type HeaderContextType = {
    loginId: string,
    setLoginId: (value: string) => void;
    
    cartTotalCount: number,
    setCartTotalCount: (value: number) => void;
}

export const HeaderContext = createContext<HeaderContextType>( {
    loginId: "0",
    setLoginId: (value) => {},

    cartTotalCount: 0,
    setCartTotalCount: (value) => {},
});