import { BookData } from "./BookData"
import { CartData } from "./CartData"

export type OrderData = {
    carts: CartData[];
    state: string;
    buyDate: number;
    totalPrice: number;
}