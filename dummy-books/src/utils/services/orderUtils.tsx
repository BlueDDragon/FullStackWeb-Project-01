import { CartData } from "@/types/CartData";
import { LoadData, SaveData } from "@/utils/storage/saveload";
import { OrderData } from "@/types/OrderData";
import { GetLogin } from "./userUtils";

export function GetOrders() : OrderData[]{
    const login = GetLogin();
    if (!login || !login.isLogined) return [];
    
    return LoadData<OrderData[]>({ type: "Orders", id: login.id }, ("[]"));
}

export function IsOrdersEmpty(orders: OrderData[]) {
    return (!orders || !Array.isArray(orders) || orders.length === 0);
}

export function AddOrder(carts: CartData[], totalPrice: number, type: string) {
    const login = GetLogin();
    if (!login || !login.isLogined) return;

    const orders = GetOrders();
    const isOrdersEmpty = IsOrdersEmpty(orders);

    const nowDate: number = Date.now();
    const newOrder: OrderData = {
        carts: carts,
        type: type,
        state: "buy",
        buyDate: nowDate,
        totalPrice: totalPrice,
    }
    
    // 기존에 저장된 값이 없을 경우
    if (isOrdersEmpty) {
        SaveData<OrderData[]>({ type: "Orders", id: login.id }, [newOrder]);
        return;
    }
    
    SaveData<OrderData[]>({ type: "Orders", id: login.id }, [...orders, newOrder]);
}

export function GetOrderId(buyDate: Date): string {
    const buyMonth = (buyDate.getMonth() + 1).toString().padStart(2, '0');
    const buyDay = buyDate.getDate().toString().padStart(2, '0');
    const buyHour = buyDate.getHours().toString().padStart(2, '0');
    const buyMin = buyDate.getMinutes().toString().padStart(2, '0');
    const buySec = buyDate.getSeconds().toString().padStart(2, '0');

    return `${buyMonth}${buyDay}${buyHour}${buyMin}${buySec}`;
}