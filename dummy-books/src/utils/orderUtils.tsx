import { CartData } from "@/types/CartData";
import { LoadData, SaveData } from "./saveload";
import { OrderData } from "@/types/OrderData";

export function GetOrders() : OrderData[]{
    return LoadData<OrderData[]>({ type: "Orders" }, ("[]"));
}

export function AddOrder(carts: CartData[], totalPrice: number) {
    const orders = GetOrders();
    const isOrdersEmpty = (!orders || !Array.isArray(orders) || orders.length === 0);

    const newOrder: OrderData = {
        carts: carts,
        state: "buy",
        buyDate: 0,
        totalPrice: totalPrice,
    }
    
    // 기존에 저장된 값이 없을 경우
    if (isOrdersEmpty) {
        SaveData<OrderData[]>({ type: "Orders" }, [newOrder]);
        return;
    }
    
    SaveData<OrderData[]>({ type: "Orders" }, [...orders, newOrder]);
}