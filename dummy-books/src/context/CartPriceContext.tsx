import { createContext } from "react";

export type CartPriceContextType = {
    totalCount: number;
    totalStandardPrice: number;
    setTotalStandardPrice: (value: number) => void;
    totalResultPrice: number;
    setTotalResultPrice: (value: number) => void;
}

export const CartPriceContext = createContext<CartPriceContextType>( {
    totalCount: 0,
    totalStandardPrice: 0,
    setTotalStandardPrice: (value: number) => {},
    totalResultPrice: 0,
    setTotalResultPrice: (value: number) => {},
});