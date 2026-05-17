import { createContext } from "react";

export type HeaderContextType = {
    addUpdateHeader: (func: () => void) => void;
    resetUpdateHeader: () => void;
    updateHeader: (() => void) | null;

    addUpdateLogin: (func: () => void) => void;
    resetUpdateLogin: () => void;
    updateLogin: (() => void) | null;

    loginId: string,
    setLoginId: (value: string) => void;

    cartTotalCount: number,
    setCartTotalCount: (value: number) => void;
}

export const HeaderContext = createContext<HeaderContextType>( {
    addUpdateHeader: (func) => {},
    resetUpdateHeader: () => {},
    updateHeader: () => {},
    
    addUpdateLogin: (func) => {},
    resetUpdateLogin: () => {},
    updateLogin: () => {},

    loginId: "0",
    setLoginId: (value) => {},

    cartTotalCount: 0,
    setCartTotalCount: (value) => {},
});