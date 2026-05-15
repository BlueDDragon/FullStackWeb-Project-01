import { CartData } from "@/types/CartData";
import { OrderData } from "@/types/OrderData";
import { createContext } from "react";

type MyContextType = {
    user: {
        id: string;
        password: string;
        nickname: string;
    }

    carts: CartData[];
    orders: OrderData[];
};

export const MyContext = createContext<MyContextType>( {
    user: {
        id: "0",
        password: "0",
        nickname: "",
    },

    carts: [],
    orders: [],
});