import { CartData } from "@/types/CartData";
import { loadData, saveData } from "@/utils/storage/saveload";
import { OrderData } from "@/types/OrderData";
import { getLogin } from "./userUtils";

export function getOrders() : OrderData[]{
    const login = getLogin();
    if (!login || !login.isLogined) return [];
    
    return loadData<OrderData[]>({ type: "Orders", id: login.id }, ("[]"));
}

export function isOrderEmpty(orders: OrderData[]) {
    return (!orders || !Array.isArray(orders) || orders.length === 0);
}

export function addOrder(carts: CartData[], totalPrice: number, type: string) {
    const login = getLogin();
    if (!login || !login.isLogined) return;

    const orders = getOrders();
    const isEmpty = isOrderEmpty(orders);

    const nowDate: number = Date.now();
    const newOrder: OrderData = {
        carts: carts,
        type: type,
        state: "buy",
        buyDate: nowDate,
        totalPrice: totalPrice,
    }
    
    // 기존에 저장된 값이 없을 경우
    if (isEmpty) {
        saveData<OrderData[]>({ type: "Orders", id: login.id }, [newOrder]);
        return;
    }
    
    saveData<OrderData[]>({ type: "Orders", id: login.id }, [...orders, newOrder]);
}

export function getOrderId(buyDate: Date): string {
    const buyMonth = (buyDate.getMonth() + 1).toString().padStart(2, '0');
    const buyDay = buyDate.getDate().toString().padStart(2, '0');
    const buyHour = buyDate.getHours().toString().padStart(2, '0');
    const buyMin = buyDate.getMinutes().toString().padStart(2, '0');
    const buySec = buyDate.getSeconds().toString().padStart(2, '0');

    return `${buyMonth}${buyDay}${buyHour}${buyMin}${buySec}`;
}

export function getIsOrderBuy(isbn13: string) {
    const login = getLogin();
    if (!login || !login.isLogined) return false;

    const orders = getOrders();
    const isEmpty = isOrderEmpty(orders);
    if (isEmpty) return false;

    return orders.filter((order) => order.carts.filter((cart) => cart.book.isbn13 === isbn13)).length > 0;
}