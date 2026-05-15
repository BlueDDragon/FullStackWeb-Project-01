import { BookData } from "./BookData"
import { CartData } from "./CartData"

export type OrderData = {
    carts: CartData[];
    type: string;
    state: string;
    buyDate: number;
    totalPrice: number;
}